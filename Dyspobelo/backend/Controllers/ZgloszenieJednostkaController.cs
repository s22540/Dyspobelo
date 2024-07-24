using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ZgloszenieJednostkaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ZgloszenieJednostkaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ZgloszenieJednostka>> PostZgloszenieJednostka(ZgloszenieJednostka zgloszenieJednostka)
        {
            _context.ZgloszenieJednostka.Add(zgloszenieJednostka);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetZgloszenieJednostka), new { id = zgloszenieJednostka.Id_Zgloszenia }, zgloszenieJednostka);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ZgloszenieJednostka>> GetZgloszenieJednostka(int id)
        {
            var zgloszenieJednostka = await _context.ZgloszenieJednostka.FindAsync(id);

            if (zgloszenieJednostka == null)
            {
                return NotFound();
            }

            return zgloszenieJednostka;
        }
    }
}