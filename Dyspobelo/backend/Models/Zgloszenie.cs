using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Zgloszenie
{
    [Key]
    public int Id { get; set; }
    public int id_dyspozytor { get; set; }
    public int id_zglaszajacy { get; set; }
    public int id_typ_zgloszenia { get; set; }
    public int id_klasa_zgloszenia { get; set; }
    public int id_zgloszenie_jednostka { get; set; }
    [Required]
    public string ulica { get; set; }
    [Required]
    public int numer_budynku { get; set; }
    [Required]
    public int numer_mieszkania { get; set; }
    public DateTime data_zgloszenia { get; set; }
    [Required]
    public string opis_zdarzenia { get; set; }
    [Required]
    public string kod_pocztowy { get; set; }

    [ForeignKey("id_typ_zgloszenia")]
    public TypZgloszenia TypZgloszenia { get; set; }
}
