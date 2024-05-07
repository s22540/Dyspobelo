using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Remiza
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NazwaRemizy { get; set; }
    [Required]
    public required string Adres { get; set; }
    [Required]
    public required string NumerKontaktowy { get; set; }
}