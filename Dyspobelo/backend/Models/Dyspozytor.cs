using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Dyspozytor
{
    public int Id { get; set; }
    public int Numer_Dyspozytora { get; set; }

    public string Zahashowane_Haslo { get; set; }

    public string? Imie { get; set; } // Dodane
    public string? Nazwisko { get; set; } // Dodane

    //public ICollection<DyspozytorDyzur> DyspozytorDyzury { get; set; }
}
