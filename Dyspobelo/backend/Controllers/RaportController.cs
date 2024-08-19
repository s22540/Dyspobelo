namespace Dyspobelo.backend.Controllers
{
    using Dyspobelo.backend.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class RaportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RaportController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("raport-zgloszen")]
        public async Task<ActionResult<IEnumerable<RaportZgloszenDto>>> GetRaportZgloszen()
        {
            var raportData = await _context.Set<RaportZgloszenDto>()
                .FromSqlRaw("CALL GenerujRaportZgloszen()")
                .ToListAsync();

            return Ok(raportData);
        }

        [HttpGet("raport-ulic")]
        public async Task<ActionResult<IEnumerable<RaportUlicDTO>>> GetRaportUlic()
        {
            var raportData = await _context.Set<RaportUlicDTO>()
                .FromSqlRaw("CALL GenerujRaportUlic()")
                .ToListAsync();

            return Ok(raportData);
        }
    }
}
