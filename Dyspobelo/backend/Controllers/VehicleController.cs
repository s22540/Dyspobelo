using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VehicleController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("vehicles")]
    public async Task<IActionResult> GetVehicles()
    {
        var policja = await _context.Set<Policja>().ToListAsync();
        var strazPozarna = await _context.Set<StrazPozarna>().ToListAsync();
        var pogotowie = await _context.Set<Pogotowie>().ToListAsync();

        var vehicles = new List<object>();
        vehicles.AddRange(policja.Select(p => new { Type = "Policja", Vehicle = p }));
        vehicles.AddRange(strazPozarna.Select(s => new { Type = "Straz_Pozarna", Vehicle = s }));
        vehicles.AddRange(pogotowie.Select(p => new { Type = "Pogotowie", Vehicle = p }));

        return Ok(vehicles);
    }
}