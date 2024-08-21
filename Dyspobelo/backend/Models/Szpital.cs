using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("szpital")]
public class Szpital
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Column("nazwa_szpitala")]
    public string NazwaSzpitala { get; set; }

    [Required]
    [Column("adres")]
    public string Adres { get; set; }

    [Required]
    [Column("numer_kontaktowy")]
    public string NumerKontaktowy { get; set; }
}
