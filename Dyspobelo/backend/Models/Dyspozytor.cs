using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Dyspozytor
{
    [Key]
    public int Id { get; set; }
    public int NumerDyspozytora { get; set; }
    [Required]
    public required string Imie { get; set; }
    [Required]
    public required string Nazwisko { get; set; }

    public ICollection<DyspozytorDyzur> DyspozytorDyzury { get; set; }
}