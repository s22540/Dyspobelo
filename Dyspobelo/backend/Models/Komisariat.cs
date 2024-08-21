using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("komisariat")]
public class Komisariat
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Column("nazwa_komisariatu")]
    public string NazwaKomisariatu { get; set; }

    [Required]
    [Column("adres")]
    public string Adres { get; set; }

    [Required]
    [Column("numer_kontaktowy")]
    public string NumerKontaktowy { get; set; }
}
