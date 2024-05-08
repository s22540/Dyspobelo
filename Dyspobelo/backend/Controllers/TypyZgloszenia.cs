using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypyZgloszeniaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypyZgloszeniaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TypyZgloszenia
        [HttpGet]
        public async Task<IActionResult> GetTyp_Zgloszenia()
        {
            var typy = await _context.Typ_Zgloszenia.ToListAsync();
            return Ok(typy);
        }
    }
}