using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ZdarzeniaSystemowe
{
    [Key]
    public DateTime IdDataZdarzenia { get; set; }
    public int IdUzytkownika { get; set; }
    public string? OpisBledu { get; set; }
    public int? RekordyInsertowane { get; set; }
}
