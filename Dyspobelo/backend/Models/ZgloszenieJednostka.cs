using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ZgloszenieJednostka
{
    [Key]
    public int IdZgloszenia { get; set; }
    public int? PolicjaId { get; set; }
    public int? StrazPozarnaId { get; set; }
    public int? PogotowieId { get; set; }
    [ForeignKey("PolicjaId")]
    public Policja? Policja { get; set; }
    [ForeignKey("StrazPozarnaId")]
    public StrazPozarna? StrazPozarna { get; set; }
    [ForeignKey("PogotowieId")]
    public Pogotowie? Pogotowie { get; set; }
}