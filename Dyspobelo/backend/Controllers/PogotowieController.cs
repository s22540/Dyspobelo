using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PogotowieController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PogotowieController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pogotowie>>> GetPogotowie()
        {
            return await _context.Pogotowie.ToListAsync();
        }
    }
}