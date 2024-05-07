using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Pogotowie
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NumerKaretki { get; set; }
    [Required]
    public char StatusKaretki { get; set; }
    public int ObsluzoneZgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int SzpitalId { get; set; }
    [ForeignKey("SzpitalId")]
    public required Szpital Szpital { get; set; }
}