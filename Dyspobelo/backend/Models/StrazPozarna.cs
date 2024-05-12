using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class StrazPozarna
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Numer_Wozu { get; set; }
    [Required]
    public char Status_Wozu { get; set; }
    public int Obsluzone_Zgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int Remiza_Id { get; set; }
    [ForeignKey("Remiza_Id")]
    public required Remiza Remiza { get; set; }

    public ICollection<ZgloszenieJednostka> ZgloszenieJednostkas { get; set; }
}