using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Dyspozytors
            .Where(u => u.Id == id)
            .Select(u => new { u.Imie, u.Nazwisko })
            .SingleOrDefaultAsync();

        if (user == null)
        {
            return NotFound(new { message = "Użytkownik nie został znaleziony" });
        }

        return Ok(user);
    }

    [HttpGet("analityk/{id}")]
    public async Task<IActionResult> GetAnalitykById(int id)
    {
        var analityk = await _context.Analityk
            .Where(u => u.Id == id)
            .Select(u => new { u.Imie, u.Nazwisko })
            .SingleOrDefaultAsync();

        if (analityk == null)
        {
            return NotFound(new { message = "Analityk nie został znaleziony" });
        }

        return Ok(analityk);
    }
}
