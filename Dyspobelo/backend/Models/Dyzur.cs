using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Dyzur
{
    [Key]
    public int IdHarmonogramu { get; set; }
    public DateTime DataRozpoczeciaDyzuru { get; set; }
    public DateTime DataZakonczeniaDyzuru { get; set; }

    public ICollection<DyspozytorDyzur> DyspozytorDyzury { get; set; }
}