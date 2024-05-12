using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Policja
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Numer_Patrolu { get; set; }
    [Required]
    public char Status_Patrolu { get; set; }
    public int Obsluzone_Zgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int Komisariat_Id { get; set; }
    [ForeignKey("Komisariat_Id")]
    public required Komisariat Komisariat { get; set; }

    public ICollection<ZgloszenieJednostka> ZgloszenieJednostkas { get; set; }
}