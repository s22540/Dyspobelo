using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ZgloszeniaController : ControllerBase
    {
        private readonly ILogger<ZgloszeniaController> _logger;
        private readonly ApplicationDbContext _context;

        public ZgloszeniaController(ApplicationDbContext context, ILogger<ZgloszeniaController> logger)
        {
            _context = context;
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // GET: api/Zgloszenia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zgloszenie>>> GetZgloszenia()
        {
            return await _context.Zgloszenia.ToListAsync();
        }

        // GET: api/Zgloszenia/5
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

        // POST: api/Zgloszenia
        [HttpPost]
        public async Task<ActionResult<Zgloszenie>> PostZgloszenie(Zgloszenie zgloszenie)
        {
            _logger.LogInformation("Received POST request with data: {@Zgloszenie}", zgloszenie);
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid data: {@ModelStateErrors}", ModelState);
                return BadRequest(ModelState);
            }

            _context.Zgloszenia.Add(zgloszenie);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetZgloszenie", new { id = zgloszenie.Id }, zgloszenie);
        }


    }
}
