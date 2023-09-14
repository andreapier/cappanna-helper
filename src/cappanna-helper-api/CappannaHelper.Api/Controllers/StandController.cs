using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var result = await _context.Stands.ToListAsync();
            await transaction.CommitAsync();

            return Ok(result);
        }
    }
}
