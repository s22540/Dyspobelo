using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class KlasaZgloszenia
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Klasa_zgloszenia { get; set; }
}