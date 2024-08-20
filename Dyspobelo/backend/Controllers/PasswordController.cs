using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PasswordController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PasswordController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
    {
        if (model.NewPassword != model.ConfirmPassword)
        {
            return BadRequest(new { message = "Nowe hasło i potwierdzenie hasła muszą być takie same" });
        }

        var userIdHeader = HttpContext.Request.Headers["Authorization"].ToString();
        var userId = userIdHeader.Split(" ")[1];

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "Nie jesteś zalogowany" });
        }

        var dyspozytor = await _context.Dyspozytors
            .SingleOrDefaultAsync(u => u.Id == int.Parse(userId));

        if (dyspozytor == null)
        {
            return NotFound(new { message = "Użytkownik nie został znaleziony" });
        }

        if (!BCrypt.Net.BCrypt.Verify(model.CurrentPassword, dyspozytor.Zahashowane_Haslo))
        {
            return BadRequest(new { message = "Obecne hasło jest nieprawidłowe" });
        }

        dyspozytor.Zahashowane_Haslo = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
        _context.Dyspozytors.Update(dyspozytor);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Hasło zostało zmienione" });
    }

    [HttpPost("change-password-analityk")]
    public async Task<IActionResult> ChangePasswordAnalityk([FromBody] ChangePasswordModel model)
    {
        if (model.NewPassword != model.ConfirmPassword)
        {
            return BadRequest(new { message = "Nowe hasło i potwierdzenie hasła muszą być takie same" });
        }

        var userIdHeader = HttpContext.Request.Headers["Authorization"].ToString();
        var userId = userIdHeader.Split(" ")[1];

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "Nie jesteś zalogowany" });
        }

        var analityk = await _context.Analityk
            .SingleOrDefaultAsync(u => u.Id == int.Parse(userId));

        if (analityk == null)
        {
            return NotFound(new { message = "Analityk nie został znaleziony" });
        }

        if (!BCrypt.Net.BCrypt.Verify(model.CurrentPassword, analityk.Zahashowane_Haslo))
        {
            return BadRequest(new { message = "Obecne hasło jest nieprawidłowe" });
        }

        analityk.Zahashowane_Haslo = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
        _context.Analityk.Update(analityk);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Hasło zostało zmienione" });
    }
}
