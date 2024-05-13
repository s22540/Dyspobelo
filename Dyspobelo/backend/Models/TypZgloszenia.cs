using System.ComponentModel.DataAnnotations;

public class TypZgloszenia
{
    [Key]
    public int Id { get; set; }
    public string nazwa_typu { get; set; }
    public char czy_powraca { get; set; }

    public ICollection<Zgloszenie> Zgloszenia { get; set; }
}
