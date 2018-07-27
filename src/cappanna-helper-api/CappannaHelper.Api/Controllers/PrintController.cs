﻿using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrintController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;

        public PrintController(ApplicationDbContext context, IPrintService printService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _printService = printService ?? throw new ArgumentNullException(nameof(printService));
        }

        [Route("order/{id}")]
        public async Task<IActionResult> GetPrint(int id)
        {
            ChOrder result;

            using (var transaction = _context.Database.BeginTransaction())
            {
                result = await _context.Orders
                    .Include(o => o.CreatedBy)
                    .Include(o => o.Operations)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (result == null)
                {
                    return NotFound($"L'ordine con Id '{id}' non esiste");
                }

                //try
                //{
                //    await _printService.PrintAsync(order);
                //}
                //catch (Exception e)
                //{
                //    throw new Exception("Impossibile ristampare l'ordine", e);
                //}

                try
                {
                    var printOperationId = (int) OperationTypes.Print;
                    result.Operations.Add(new ChOrderOperation {
                        OperationTimestamp = DateTime.Now,
                        TypeId = printOperationId,
                        UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    });
                    result.Status = printOperationId;
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'operazione di stampa dell'ordine", e);
                }

                return Ok(result);
            }
        }
    }
}