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
                .Select(z => new ZgloszenieDto
                {
                    Id = z.Id,
                    Id_dyspozytor = z.id_dyspozytor,
                    Id_zglaszajacy = z.id_zglaszajacy,
                    Id_typ_zgloszenia = z.id_typ_zgloszenia,
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
                .Select(z => new ZgloszenieDto
                {
                    Id = z.Id,
                    Id_dyspozytor = z.id_dyspozytor,
                    Id_zglaszajacy = z.id_zglaszajacy,
                    Id_typ_zgloszenia = z.id_typ_zgloszenia,
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

            var zglaszajacy = await _context.Zglaszajacy.FindAsync(zgloszenie.id_zglaszajacy);
            if (zglaszajacy != null)
            {
                zglaszajacy.id_zgloszenia = zgloszenie.Id;
                _context.Zglaszajacy.Update(zglaszajacy);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetZgloszenie), new { id = zgloszenie.Id }, zgloszenie);
        }

        // PUT: api/Zgloszenia/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZgloszenie(int id, [FromBody] ZgloszenieDto zgloszenieDto)
        {
            if (id != zgloszenieDto.Id)
            {
                return BadRequest();
            }

            var zgloszenie = await _context.Zgloszenia.FindAsync(id);
            if (zgloszenie == null)
            {
                return NotFound();
            }

            if (zgloszenieDto.Id_dyspozytor != 0)
            {
                zgloszenie.id_dyspozytor = zgloszenieDto.Id_dyspozytor;
            }

            if (zgloszenieDto.Id_zglaszajacy != 0)
            {
                zgloszenie.id_zglaszajacy = zgloszenieDto.Id_zglaszajacy;
            }

            if (zgloszenieDto.Id_typ_zgloszenia != 0)
            {
                zgloszenie.id_typ_zgloszenia = zgloszenieDto.Id_typ_zgloszenia;
            }

            if (zgloszenieDto.Id_klasa_zgloszenia != 0)
            {
                zgloszenie.id_klasa_zgloszenia = zgloszenieDto.Id_klasa_zgloszenia;
            }

            if (!string.IsNullOrEmpty(zgloszenieDto.Ulica))
            {
                zgloszenie.ulica = zgloszenieDto.Ulica;
            }

            if (zgloszenieDto.Numer_budynku != 0)
            {
                zgloszenie.numer_budynku = zgloszenieDto.Numer_budynku;
            }

            if (zgloszenieDto.Numer_mieszkania != 0)
            {
                zgloszenie.numer_mieszkania = zgloszenieDto.Numer_mieszkania;
            }

            if (!string.IsNullOrEmpty(zgloszenieDto.Opis_zdarzenia))
            {
                zgloszenie.opis_zdarzenia = zgloszenieDto.Opis_zdarzenia;
            }

            if (zgloszenieDto.Id_zgloszenie_jednostka != 0)
            {
                zgloszenie.id_zgloszenie_jednostka = zgloszenieDto.Id_zgloszenie_jednostka;
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
        private bool ZgloszenieExists(int id)
        {
            return _context.Zgloszenia.Any(e => e.Id == id);
        }
    }
}