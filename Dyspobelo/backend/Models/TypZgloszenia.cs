using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class TypZgloszenia
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NazwaTypu { get; set; }
    [Required]
    public char CzyPowraca { get; set; }
}