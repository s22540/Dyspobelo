using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Pogotowie
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Numer_Karetki { get; set; }
    [Required]
    public char Status_Karetki { get; set; }
    public int Obsluzone_Zgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int Szpital_Id { get; set; }
    [ForeignKey("Szpital_Id")]
    public required Szpital Szpital { get; set; }
    public ICollection<ZgloszenieJednostka> Zgloszenie_Jednostkas { get; set; }
}