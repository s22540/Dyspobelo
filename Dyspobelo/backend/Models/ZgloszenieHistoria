using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class ZgloszenieHistoria
{
    [Key]
    public int Id { get; set; }
    public int IdDyspozytor { get; set; }
    public int IdZglaszajacy { get; set; }
    public int IdTypZgloszenia { get; set; }
    public int IdKlasaZgloszenia { get; set; }
    public int IdZgloszenieJednostka { get; set; }
    [Required]
    public string Ulica { get; set; }
    [Required]
    public int NumerBudynku { get; set; }
    [Required]
    public int NumerMieszkania { get; set; }
    public DateTime DataZgloszenia { get; set; }
    public string OpisZdarzenia { get; set; }
    public DateTime? DataHistoryzacji { get; set; }
}