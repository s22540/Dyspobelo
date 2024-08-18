using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;
using Dyspobelo.backend.Models;

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
                return Ok(new { id_dyspozytor = dyspozytor.Id });
            }
        }
        Console.WriteLine("Numer dyspozytora lub hasło nieprawidłowe");
        return BadRequest(new { message = "Numer dyspozytora lub hasło nieprawidłowe" });
    }

    [HttpPost("login-analityk")]
    public async Task<IActionResult> LoginAnalityk([FromBody] Analityk model)
    {
        Console.WriteLine($"Próba logowania analityka {model.Numer_Analityka}");
        var analityk = await _context.Analityk
            .SingleOrDefaultAsync(u => u.Numer_Analityka == model.Numer_Analityka);

        if (analityk != null)
        {
            if (BCrypt.Net.BCrypt.Verify(model.Zahashowane_Haslo, analityk.Zahashowane_Haslo))
            {
                return Ok(new { id_analityk = analityk.Id });
            }
        }
        Console.WriteLine("Numer analityka lub hasło nieprawidłowe");
        return BadRequest(new { message = "Numer analityka lub hasło nieprawidłowe" });
    }
}