public class Zgloszenie
{
    public int Id { get; set; }
    public required int IdDyspozytor { get; set; }
    public required int IdZglaszajacy { get; set; }
    public required int IdTypZgloszenia { get; set; }
    public required int IdKlasaZgloszenia { get; set; }
    public required int IdZgloszenieJednostka { get; set; }
    public required string Ulica { get; set; }
    public required int NumerBudynku { get; set; }
    public required int NumerMieszkania { get; set; }
    public required DateTime DataZgloszenia { get; set; }
    public string? OpisZdarzenia { get; set; }
}
