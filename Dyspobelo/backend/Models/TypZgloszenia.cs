using System.ComponentModel.DataAnnotations;

public class TypZgloszenia
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string nazwa_typu { get; set; }
    [Required]
    public char czy_powraca { get; set; }
}