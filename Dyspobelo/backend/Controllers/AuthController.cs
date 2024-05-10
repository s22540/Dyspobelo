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
        Console.WriteLine($"Attempting to log in user {model.Numer_Dyspozytora}");
        var dyspozytor = await _context.Dyspozytors
            .SingleOrDefaultAsync(u => u.Numer_Dyspozytora == model.Numer_Dyspozytora);

        if (dyspozytor != null)
        {
            Console.WriteLine($"User found in database. Expected PW: {dyspozytor.Zahashowane_Haslo}, Provided PW: {model.Zahashowane_Haslo}");
            if (model.Zahashowane_Haslo == dyspozytor.Zahashowane_Haslo)
            {
                return Ok(new { message = "Login successful" });
            }
        }
        Console.WriteLine("Username or password is incorrect");
        return BadRequest(new { message = "Username or password is incorrect" });
    }
}