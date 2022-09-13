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
    public class SettingController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SettingController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<Setting> result;

            using(var transaction = await _context.Database.BeginTransactionAsync())
            {
                result = await _context.Settings.ToListAsync();
                transaction.Commit();
            }

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

            Setting result;

            using(var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    result = await _context.Settings.SingleOrDefaultAsync(o => o.Id == setting.Id);

                    if(result == null)
                    {
                        transaction.Rollback();

                        return NotFound(new { Message = $"L'impostazione Id '{setting.Id}' non esiste" });
                    }

                    result.Value = setting.Value;

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch(Exception e)
                {
                    throw new Exception("Impossibile salvare il piatto. Ripetere l'operazione", e);
                }
            }

            return Ok(result);
        }
    }
}
