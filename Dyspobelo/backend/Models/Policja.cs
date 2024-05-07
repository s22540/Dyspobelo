using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Policja
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string NumerPatrolu { get; set; }
    [Required]
    public char StatusPatrolu { get; set; }
    public int ObsluzoneZgloszenia { get; set; }
    public required string Uwagi { get; set; }
    public int KomisariatId { get; set; }
    [ForeignKey("KomisariatId")]
    public required Komisariat Komisariat { get; set; }
}