using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Zglaszajacy
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Imie { get; set; }
    [Required]
    public string Nazwisko { get; set; }
    [Required]
    public string Numer_Kontaktowy { get; set; }

    public int id_zgloszenia { get; set; }
}