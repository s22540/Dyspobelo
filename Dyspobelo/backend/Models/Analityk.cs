namespace Dyspobelo.backend.Models
{
    public class Analityk
    {
        public int Id { get; set; }
        public int Numer_Analityka { get; set; }
        public string? Imie { get; set; }
        public string? Nazwisko { get; set; }
        public string Zahashowane_Haslo { get; set; }
    }
}
