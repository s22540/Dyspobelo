using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StrazPozarnaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StrazPozarnaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StrazPozarna>>> GetStrazPozarna()
        {
            return await _context.StrazPozarna.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StrazPozarna>> GetStrazPozarnaById(int id)
        {
            var strazPozarna = await _context.StrazPozarna.FindAsync(id);
            if (strazPozarna == null)
            {
                return NotFound();
            }
            return strazPozarna;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateStrazPozarnaStatus(int id, [FromBody] char newStatus)
        {
            var strazPozarna = await _context.StrazPozarna.FindAsync(id);
            if (strazPozarna == null)
            {
                return NotFound();
            }

            strazPozarna.Status_Wozu = newStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}