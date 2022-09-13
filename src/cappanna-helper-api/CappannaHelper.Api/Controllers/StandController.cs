using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StandController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StandController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<Stand> result;

            using(var transaction = await _context.Database.BeginTransactionAsync())
            {
                result = await _context.Stands.ToListAsync();
                transaction.Commit();
            }

            return Ok(result);
        }
    }
}
