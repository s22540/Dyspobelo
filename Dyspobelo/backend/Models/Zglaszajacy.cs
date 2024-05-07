using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Zglaszajacy
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Imie { get; set; }
    [Required]
    public required string Nazwisko { get; set; }
    public required string NumerKontaktowy { get; set; }
}