using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Komisariat
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Nazwa_Komisariatu { get; set; }
    [Required]
    public required string Adres { get; set; }
    [Required]
    public required string Numer_Kontaktowy { get; set; }
}