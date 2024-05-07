using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class StrazPozarna
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NumerWozu { get; set; }
    [Required]
    public char StatusWozu { get; set; }
    public int ObsluzoneZgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int RemizaId { get; set; }
    [ForeignKey("RemizaId")]
    public required Remiza Remiza { get; set; }

    public ICollection<ZgloszenieJednostka> ZgloszenieJednostkas { get; set; }
}