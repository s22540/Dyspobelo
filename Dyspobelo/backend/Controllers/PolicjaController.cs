using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicjaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PolicjaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policja>>> GetPolicja()
        {
            return await _context.Policja.ToListAsync();
        }
    }
}