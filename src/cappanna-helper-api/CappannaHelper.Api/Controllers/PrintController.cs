using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class PrintController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPrintService _printService;
    private readonly IHubContext<ChHub> _hub;

    public PrintController(ApplicationDbContext context, IPrintService printService, IHubContext<ChHub> hub)
    {
        _context = context;
        _printService = printService;
        _hub = hub;
    }

    [Route("order/{id}")]
    public async Task<IActionResult> GetPrint(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        var result = await _context.Orders
            .Include(o => o.CreatedBy)
            .Include(o => o.Stand)
            .Include(o => o.Details)
            .ThenInclude(d => d.Item)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (result == null)
        {
            await transaction.RollbackAsync();
            return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste", });
        }

        try
        {
            await _printService.PrintAsync(result);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw new Exception("Impossibile stampare l'ordine", e);
        }

        try
        {
            var printOperation = OperationTypes.Print;
            result.Operations.Add(new ChOrderOperation
            {
                OperationTimestamp = DateTime.Now,
                Type = printOperation,
                UserId = GetUserId(),
            });
            result.Status = printOperation;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw new Exception("Impossibile salvare l'operazione di stampa dell'ordine", e);
        }

        await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_PRINTED, result);

        return Ok(result);
    }

    [HttpGet("order/aggregate")]
    public async Task<IActionResult> GetOrdersDetailAggregates([FromQuery] List<int> ordersId)
    {
        if (ordersId == null)
        {
            return BadRequest(new { Message = "Lista ordini da stampare non specificata", });
        }

        var transaction = await _context.Database.BeginTransactionAsync();

        var firstDishItems = await GetOrderDetails(ordersId, MenuDetail.FIRST_DISH);
        var appetizerItems = await GetOrderDetails(ordersId, MenuDetail.APPETIZER);
        var secondDishItems = await GetOrderDetails(ordersId, MenuDetail.SECOND_DISH);
        var sideDishItems = await GetOrderDetails(ordersId, MenuDetail.SIDE_DISH);

        await transaction.CommitAsync();

        if (firstDishItems.Count == 0)
        {
            return NoContent();
        }

        try
        {
            await PrintAggregate("Primi", firstDishItems);
            await PrintAggregate("Antipasti", appetizerItems);
            await PrintAggregate("Secondi", secondDishItems);
            await PrintAggregate("Contorni", sideDishItems);
        }
        catch (Exception e)
        {
            throw new Exception("Impossibile stampare la lista dei piatti", e);
        }

        return NoContent();
    }

    private async Task<List<OrderDetailsAggregateItem>> GetOrderDetails(List<int> ordersId, string group)
    {
        var result = await _context.OrderDetails
            .Where(d => ordersId.Contains(d.OrderId) && d.Item.Group == group)
            .GroupBy(d => d.ItemId)
            .Select(g => new OrderDetailsAggregateItem
            {
                ItemId = g.Key,
                Name = g.First().Item.Name,
                Quantity = g.Sum(d => d.Quantity),
            })
            .ToListAsync();
        return result;
    }

    private async Task PrintAggregate(string title, List<OrderDetailsAggregateItem> orderDetails)
    {
        var aggregate = new OrderDetailsAggregateModel
        {
            Title = title,
            Details = orderDetails,
        };
        await _printService.PrintAsync(aggregate);
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst("chUserId").Value);
    }
}