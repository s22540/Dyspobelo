using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ZgloszenieJednostka
{
    [Key]
    public int Id_Zgloszenia { get; set; }
    public int? Policja_Id { get; set; }
    public int? Straz_Pozarna_Id { get; set; }
    public int? Pogotowie_Id { get; set; }
    
    [ForeignKey("Policja_Id")]
    public Policja? Policja { get; set; }
    
    [ForeignKey("Straz_Pozarna_Id")]
    public StrazPozarna? StrazPozarna { get; set; }
    
    [ForeignKey("Pogotowie_Id")]
    public Pogotowie? Pogotowie { get; set; }
}