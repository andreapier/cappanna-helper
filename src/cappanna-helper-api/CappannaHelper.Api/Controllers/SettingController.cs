using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SettingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            var result = await _context.Settings.ToListAsync();
            await transaction.CommitAsync();
            return Ok(result);

        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] Setting setting)
        {
            if(setting == null)
            {
                return BadRequest(new { Message = "Dati dell'impostazione non specificati" });
            }

            if(setting.Id <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un'impostazione senza specificare l'Id" });
            }

            if(setting.Name == null)
            {
                return BadRequest(new { Message = "Impossibile modificare un'impostazione senza specificare il nome" });
            }

            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var result = await _context.Settings.SingleOrDefaultAsync(o => o.Id == setting.Id);

                if(result == null)
                {
                    await transaction.RollbackAsync();
                    return NotFound(new { Message = $"L'impostazione Id '{setting.Id}' non esiste" });
                }

                result.Value = setting.Value;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(result);
            }
            catch(Exception e)
            {
                throw new Exception("Impossibile modificare l'impostazione. Ripetere l'operazione", e);
            }

        }
    }
}
