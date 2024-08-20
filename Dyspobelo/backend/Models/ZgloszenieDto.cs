public class ZgloszenieDto
{
    public int Id { get; set; }
    public int Id_dyspozytor { get; set; }
    public int Id_zglaszajacy { get; set; }
    public int Id_typ_zgloszenia { get; set; }
    public int Id_klasa_zgloszenia { get; set; }
    public int Id_zgloszenie_jednostka { get; set; }
    public string Ulica { get; set; }
    public int Numer_budynku { get; set; }
    public int? Numer_mieszkania { get; set; }
    public DateTime Data_zgloszenia { get; set; }
    public string Opis_zdarzenia { get; set; }
}