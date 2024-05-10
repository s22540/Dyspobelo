using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Dyspozytor
{
    public int Id { get; set; }
    public int Numer_Dyspozytora { get; set; }

    public string Zahashowane_Haslo { get; set; }

    //public ICollection<DyspozytorDyzur> DyspozytorDyzury { get; set; }
}