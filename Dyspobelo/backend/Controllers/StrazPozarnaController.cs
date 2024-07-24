using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StrazPozarnaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StrazPozarnaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StrazPozarna>>> GetStrazPozarna()
        {
            return await _context.StrazPozarna.ToListAsync();
        }
    }
}