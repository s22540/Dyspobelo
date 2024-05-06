using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Dyspobelo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ZgloszeniaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ZgloszeniaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Zgloszenia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zgloszenie>>> GetZgloszenia()
        {
            return await _context.Zgloszenia.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Zgloszenie>> GetZgloszenie(int id)
        {
            var zgloszenie = await _context.Zgloszenia.FindAsync(id);

            if (zgloszenie == null)
            {
                return NotFound();
            }

            return zgloszenie;
        }
    }
}
