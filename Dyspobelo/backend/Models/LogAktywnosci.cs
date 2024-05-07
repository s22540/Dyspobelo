using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class LogAktywnosci
{
    [Key]
    public int IdUzytkownika { get; set; }
    [Required]
    public required string TypAktywnosci { get; set; }
    [Required]
    public DateTime DataAktywnosci { get; set; }
    [Required]
    public required string OpisAktywnosci { get; set; }
}