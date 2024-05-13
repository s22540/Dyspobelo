using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<IEnumerable<ZgloszenieDto>>> GetZgloszenia()
        {
            var zgloszenia = await _context.Zgloszenia
                .Include(z => z.TypZgloszenia)
                .Select(z => new ZgloszenieDto
                {
                    Id = z.Id,
                    Id_dyspozytor = z.id_dyspozytor,
                    Id_zglaszajacy = z.id_zglaszajacy,
                    Id_typ_zgloszenia = z.id_typ_zgloszenia,
                    TypZgloszenia = z.TypZgloszenia.nazwa_typu,
                    Id_klasa_zgloszenia = z.id_klasa_zgloszenia,
                    Id_zgloszenie_jednostka = z.id_zgloszenie_jednostka,
                    Ulica = z.ulica,
                    Numer_budynku = z.numer_budynku,
                    Numer_mieszkania = z.numer_mieszkania,
                    Data_zgloszenia = z.data_zgloszenia,
                    Opis_zdarzenia = z.opis_zdarzenia
                })
                .ToListAsync();

            return zgloszenia;
        }

        // GET: api/Zgloszenia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ZgloszenieDto>> GetZgloszenie(int id)
        {
            var zgloszenie = await _context.Zgloszenia
                .Include(z => z.TypZgloszenia)
                .Select(z => new ZgloszenieDto
                {
                    Id = z.Id,
                    Id_dyspozytor = z.id_dyspozytor,
                    Id_zglaszajacy = z.id_zglaszajacy,
                    Id_typ_zgloszenia = z.id_typ_zgloszenia,
                    TypZgloszenia = z.TypZgloszenia.nazwa_typu,
                    Id_klasa_zgloszenia = z.id_klasa_zgloszenia,
                    Id_zgloszenie_jednostka = z.id_zgloszenie_jednostka,
                    Ulica = z.ulica,
                    Numer_budynku = z.numer_budynku,
                    Numer_mieszkania = z.numer_mieszkania,
                    Data_zgloszenia = z.data_zgloszenia,
                    Opis_zdarzenia = z.opis_zdarzenia
                })
                .FirstOrDefaultAsync(z => z.Id == id);

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

        // PUT: api/Zgloszenia/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZgloszenie(int id, Zgloszenie zgloszenie)
        {
            if (id != zgloszenie.Id)
            {
                return BadRequest();
            }

            _context.Entry(zgloszenie).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZgloszenieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        private bool ZgloszenieExists(int id) => _context.Zgloszenia.Any(e => e.Id == id);
    }
}
