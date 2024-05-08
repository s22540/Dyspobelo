using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class TypZgloszenia
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nazwa_Typu { get; set; }
    [Required]
    public char Czy_Powraca { get; set; }
}