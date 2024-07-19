using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ZglaszajacyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ZglaszajacyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Zglaszajacy
        [HttpPost]
        public async Task<ActionResult<Zglaszajacy>> PostZglaszajacy(Zglaszajacy zglaszajacy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Zglaszajacy.Add(zglaszajacy);
            await _context.SaveChangesAsync();

            return Ok(zglaszajacy);
        }
    }
}