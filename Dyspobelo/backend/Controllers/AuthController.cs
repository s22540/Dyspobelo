using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Dyspozytor model)
    {
        Console.WriteLine($"Próba logowania użytkownika {model.Numer_Dyspozytora}");
        var dyspozytor = await _context.Dyspozytors
            .SingleOrDefaultAsync(u => u.Numer_Dyspozytora == model.Numer_Dyspozytora);

        if (dyspozytor != null)
        {
            if (BCrypt.Net.BCrypt.Verify(model.Zahashowane_Haslo, dyspozytor.Zahashowane_Haslo))
            {
                return Ok(new { message = "Logowanie pomyślnie zakończone" });
            }
        }
        Console.WriteLine("Numer dyspozytora lub hasło nieprawidłowe");
        return BadRequest(new { message = "Numer dyspozytora lub hasło nieprawidłowe" });
    }
}