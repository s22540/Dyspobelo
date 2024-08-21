using Dyspobelo.backend.DTOs;
using Dyspobelo.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dyspobelo.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JednostkiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JednostkiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JednostkaDto>>> GetJednostki()
        {
            var komisariaty = await _context.Set<Komisariat>()
                .Select(k => new JednostkaDto
                {
                    Typ = "Komisariat",
                    Nazwa = k.NazwaKomisariatu,
                    Adres = k.Adres,
                    NumerKontaktowy = k.NumerKontaktowy
                }).ToListAsync();

            var remizy = await _context.Set<Remiza>()
                .Select(r => new JednostkaDto
                {
                    Typ = "Remiza",
                    Nazwa = r.NazwaRemizy,
                    Adres = r.Adres,
                    NumerKontaktowy = r.NumerKontaktowy
                }).ToListAsync();

            var szpitale = await _context.Set<Szpital>()
                .Select(s => new JednostkaDto
                {
                    Typ = "Szpital",
                    Nazwa = s.NazwaSzpitala,
                    Adres = s.Adres,
                    NumerKontaktowy = s.NumerKontaktowy
                }).ToListAsync();

            var jednostki = komisariaty.Concat(remizy).Concat(szpitale).ToList();

            return Ok(jednostki);
        }
    }
}
