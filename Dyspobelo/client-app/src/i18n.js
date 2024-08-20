import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Zmień hasło": "Change password",
            "Obecne hasło": "Current password",
            "Nowe hasło": "New password",
            "Potwierdź nowe hasło": "Confirm new password",
            "Zatwierdź": "Submit",
            "Język": "Language",
            "Użytkownik": "User",
            "Wyloguj": "Logout",
            "Ekran główny": "Home",
            "Dodaj zgłoszenie": "Add announcement",
            "Edycja zgłoszenia": "Edit announcement",
            "Wyświetl zgłoszenia": "Show announcements",
            "Ustawienia": "Settings",
            "Wprowadź dane zgłoszenia": "Enter report details",
            "Imię": "First name",
            "Nazwisko": "Last name",
            "Numer kontaktowy": "Contact number",
            "Ulica": "Street",
            "Numer budynku": "Building number",
            "Numer mieszkania": "Apartment number",
            "Wybierz typ zgłoszenia": "Select report type",
            "Wybierz klasę zgłoszenia": "Select report class",
            "Opis zdarzenia": "Incident description",
            "Wybierz jednostkę policji": "Select police unit",
            "Wybierz jednostkę straży pożarnej": "Select fire brigade unit",
            "Wybierz jednostkę pogotowia": "Select ambulance unit",
            "Anuluj": "Cancel",
            "Pilne": "Urgent",
            "Standardowe": "Standard",
            "Wypadek": "Accident",
            "Pożar": "Fire",
            "Edytuj dane zgłoszenia": "Edit report details",
            "Tytuł zgłoszenia": "Report title",
            "Zapisz zmiany": "Save changes",
            "Wyszukaj zgłoszenie": "Search report",
            "Zgłoszenie ID": "Report ID",
            "Data": "Date",
            "Szukaj po ID lub ulicy...": "Search by ID or street...",
            "Szukaj po ID, ulicy, lub numerze budynku...": "Search by ID, street, or building number...",
            "ID": "ID",
            "Adres": "Address",
            "Data zgłoszenia": "Report date",
            "Polska": "Poland",
            "Typ pojazdu": "Vehicle type",
            "Stan": "Status",
            "Pozycja": "Position",
            "Pojazd policyjny": "Police vehicle",
            "Straż pożarna": "Fire brigade",
            "Ambulans": "Ambulance",
            "Dostępny": "Available",
            "Zajęty": "Busy",
            "Jednostka": "Unit",
            "Uwagi": "Remarks",
            "Brak uwag": "No remarks",
            "Zaloguj jako analityk": "Login as analyst",
            "Zaloguj": "Log In",
            "Numer dyspozytora": "Dispatcher number",
            "Login dyspozytor": "Login dispatcher",
            "Zaloguj jako dyspozytor": "Login as dispatcher",
            "Numer analityka": "Analyst number",
            "Login analityk": "Login analyst",
            "Hasło": "Password",
            "Wygeneruj raport zgłoszeń": "Generate a ticket report",
            "Wygeneruj raport ulic": "Generate a street report",
            "Styczeń": "January",
            "Luty": "February",
            "Marzec": "March",
            "Kwiecień": "April",
            "Maj": "May",
            "Czerwiec": "June",
            "Lipiec": "July",
            "Sierpień": "August",
            "Wrzesień": "September",
            "Październik": "October",
            "Listopad": "November",
            "Grudzień": "December",
            "Generuj raport": "Generate report",
            "Generowanie...": "Generating...",
            "Typ zgłoszenia": "Report type",
            "Rok": "Year",
            "Miesiąc": "Month",
            "Liczba zgłoszeń": "Number of reports",
            "Raport": "Report",
            "Błąd podczas generowania raportu:": "Error generating report:",
            "Wygeneruj raport zgłoszeń na ulicach": "Generate a street report",
        }
    },
    pl: {
        translation: {
            "Zmień hasło": "Zmień hasło",
            "Obecne hasło": "Obecne hasło",
            "Nowe hasło": "Nowe hasło",
            "Potwierdź nowe hasło": "Potwierdź nowe hasło",
            "Zatwierdź": "Zatwierdź",
            "Język": "Język",
            "Użytkownik": "Użytkownik",
            "Wyloguj": "Wyloguj",
            "Ekran główny": "Ekran główny",
            "Dodaj zgłoszenie": "Dodaj zgłoszenie",
            "Edycja zgłoszenia": "Edycja zgłoszenia",
            "Wyświetl zgłoszenia": "Wyświetl zgłoszenia",
            "Ustawienia": "Ustawienia",
            "Wprowadź dane zgłoszenia": "Wprowadź dane zgłoszenia",
            "Imię": "Imię",
            "Nazwisko": "Nazwisko",
            "Numer kontaktowy": "Numer kontaktowy",
            "Ulica": "Ulica",
            "Numer budynku": "Numer budynku",
            "Numer mieszkania": "Numer mieszkania",
            "Wybierz typ zgłoszenia": "Wybierz typ zgłoszenia",
            "Wybierz klasę zgłoszenia": "Wybierz klasę zgłoszenia",
            "Opis zdarzenia": "Opis zdarzenia",
            "Wybierz jednostkę policji": "Wybierz jednostkę policji",
            "Wybierz jednostkę straży pożarnej": "Wybierz jednostkę straży pożarnej",
            "Wybierz jednostkę pogotowia": "Wybierz jednostkę pogotowia",
            "Anuluj": "Anuluj",
            "Pilne": "Pilne",
            "Standardowe": "Standardowe",
            "Wypadek": "Wypadek",
            "Pożar": "Pożar",
            "Edytuj dane zgłoszenia": "Edytuj dane zgłoszenia",
            "Tytuł zgłoszenia": "Tytuł zgłoszenia",
            "Zapisz zmiany": "Zapisz zmiany",
            "Wyszukaj zgłoszenie": "Wyszukaj zgłoszenie",
            "Zgłoszenie ID": "Zgłoszenie ID",
            "Data": "Data",
            "Szukaj po ID lub ulicy...": "Szukaj po ID lub ulicy...",
            "Szukaj po ID, ulicy, lub numerze budynku...": "Szukaj po ID, ulicy, lub numerze budynku...",
            "ID": "ID",
            "Adres": "Adres",
            "Data zgłoszenia": "Data zgłoszenia",
            "Polska": "Polska",
            "Typ pojazdu": "Typ pojazdu",
            "Stan": "Stan",
            "Pozycja": "Pozycja",
            "Pojazd policyjny": "Pojazd policyjny",
            "Straż pożarna": "Straż pożarna",
            "Ambulans": "Ambulans",
            "Dostępny": "Dostępny",
            "Zajęty": "Zajęty",
            "Jednostka": "Jednostka",
            "Uwagi": "Uwagi",
            "Brak uwag": "Brak uwag",
            "Zaloguj jako analityk": "Zaloguj jako analityk",
            "Zaloguj": "Zaloguj",
            "Numer dyspozytora": "Numer dyspozytora",
            "Login dyspozytor": "Login dyspozytor",
            "Zaloguj jako dyspozytor": "Zaloguj jako dyspozytor",
            "Numer analityka": "Numer analityka",
            "Login analityk": "Login analityk",
            "Hasło": "Hasło",
            "Wygeneruj raport zgłoszeń": "Wygeneruj raport zgłoszeń",
            "Wygeneruj raport ulic": "Wygeneruj raport ulic",
            "Styczeń": "Styczeń",
            "Luty": "Luty",
            "Marzec": "Marzec",
            "Kwiecień": "Kwiecień",
            "Maj": "Maj",
            "Czerwiec": "Czerwiec",
            "Lipiec": "Lipiec",
            "Sierpień": "Sierpień",
            "Wrzesień": "Wrzesień",
            "Październik": "Październik",
            "Listopad": "Listopad",
            "Grudzień": "Grudzień",
            "Generuj raport": "Generuj raport",
            "Generowanie...": "Generowanie...",
            "Typ zgłoszenia": "Typ zgłoszenia",
            "Rok": "Rok",
            "Miesiąc": "Miesiąc",
            "Liczba zgłoszeń": "Liczba zgłoszeń",
            "Raport": "Raport",
            "Błąd podczas generowania raportu:": "Błąd podczas generowania raportu:",
            "Wygeneruj raport zgłoszeń na ulicach": "Wygeneruj raport zgłoszeń na ulicach",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
