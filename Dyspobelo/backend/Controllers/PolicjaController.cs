using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicjaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PolicjaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policja>>> GetPolicja()
        {
            return await _context.Policja.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Policja>> GetPolicjaById(int id)
        {
            var policja = await _context.Policja.FindAsync(id);
            if (policja == null)
            {
                return NotFound();
            }
            return policja;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdatePolicjaStatus(int id, [FromBody] char newStatus)
        {
            var policja = await _context.Policja.FindAsync(id);
            if (policja == null)
            {
                return NotFound();
            }

            policja.Status_Patrolu = newStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}