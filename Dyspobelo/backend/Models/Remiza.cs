using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("remiza")]
public class Remiza
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Column("nazwa_remizy")]
    public string NazwaRemizy { get; set; }

    [Required]
    [Column("adres")]
    public string Adres { get; set; }

    [Required]
    [Column("numer_kontaktowy")]
    public string NumerKontaktowy { get; set; }
}
