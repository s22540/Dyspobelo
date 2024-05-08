using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlasyZgloszeniaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KlasyZgloszeniaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/KlasyZgloszenia
        [HttpGet]
        public async Task<IActionResult> GetKlasa_Zgloszenia()
        {
            var typy = await _context.Klasa_Zgloszenia.ToListAsync();
            return Ok(typy);
        }
    }
}