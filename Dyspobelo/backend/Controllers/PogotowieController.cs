using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PogotowieController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PogotowieController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pogotowie>>> GetPogotowie()
        {
            return await _context.Pogotowie.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pogotowie>> GetPogotowieById(int id)
        {
            var pogotowie = await _context.Pogotowie.FindAsync(id);
            if (pogotowie == null)
            {
                return NotFound();
            }
            return pogotowie;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdatePogotowieStatus(int id, [FromBody] char newStatus)
        {
            var pogotowie = await _context.Pogotowie.FindAsync(id);
            if (pogotowie == null)
            {
                return NotFound();
            }

            pogotowie.Status_Karetki = newStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}