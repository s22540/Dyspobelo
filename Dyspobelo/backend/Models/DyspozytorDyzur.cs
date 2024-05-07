using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class DyspozytorDyzur
{
    [Key, Column(Order = 0)]
    public int DyspozytorId { get; set; }
    [Key, Column(Order = 1)]
    public int DyzurIdHarmonogramu { get; set; }
    [ForeignKey("DyspozytorId")]
    public required Dyspozytor Dyspozytor { get; set; }
    [ForeignKey("DyzurIdHarmonogramu")]
    public required Dyzur Dyzur { get; set; }
}