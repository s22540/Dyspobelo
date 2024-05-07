using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Szpital
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NazwaSzpitala { get; set; }
    [Required]
    public required string Adres { get; set; }
    [Required]
    public required string NumerKontaktowy { get; set; }
}