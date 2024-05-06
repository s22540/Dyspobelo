-- Wstawianie danych do tabeli dyspozytor
INSERT INTO dyspozytor (id, numer_dyspozytora, imie, nazwisko) VALUES
(1, 101, 'Jan', 'Kowalski'),
(2, 102, 'Anna', 'Nowak');

-- Wstawianie danych do tabeli dyzur
INSERT INTO dyzur (id_harmonogramu, data_rozpoczecia_dyzuru, data_zakonczenia_dyzuru) VALUES
(1, '2023-05-01', '2023-05-02'),
(2, '2023-05-03', '2023-05-04');

-- Wstawianie danych do tabeli dyspozytor_dyzur
INSERT INTO dyspozytor_dyzur (dyspozytor_id, dyzur_id_harmonogramu) VALUES
(1, 1),
(2, 2);

-- Wstawianie danych do tabeli zglaszajacy
INSERT INTO zglaszajacy (id, imie, nazwisko, numer_kontaktowy) VALUES
(1, 'Marek', 'Borowski', '500-600-700'),
(2, 'Ewa', 'Zielińska', '501-601-701');

-- Wstawianie danych do tabeli klasa_zgloszenia
INSERT INTO klasa_zgloszenia (id, klasa_zgloszenia) VALUES
(1, 'Pilne'),
(2, 'Standardowe');

-- Wstawianie danych do tabeli typ_zgloszenia
INSERT INTO typ_zgloszenia (id, nazwa_typu, czy_powraca) VALUES
(1, 'Wypadek', 'N'),
(2, 'Pożar', 'T');

-- Wstawianie danych do tabeli komisariat
INSERT INTO komisariat (id, nazwa_komisariatu, adres, numer_kontaktowy) VALUES
(1, 'Komisariat Centrum', 'Ul. Centralna 5', '22-22-22-22');

-- Wstawianie danych do tabeli remiza
INSERT INTO remiza (id, nazwa_remizy, adres, numer_kontaktowy) VALUES
(1, 'Remiza Główna', 'Ul. Pożarnicza 10', '23-23-23-23');

-- Wstawianie danych do tabeli szpital
INSERT INTO szpital (id, nazwa_szpitala, adres, numer_kontaktowy) VALUES
(1, 'Szpital Miejski', 'Ul. Zdrowotna 20', '24-24-24-24');

-- Wstawianie danych do tabeli policja
INSERT INTO policja (id, numer_patrolu, status_patrolu, obsluzone_zgloszenia, uwagi, komisariat_id) VALUES
(1, 'P001', 'A', 5, 'Brak uwag', 1);

-- Wstawianie danych do tabeli straz_pozarna
INSERT INTO straz_pozarna (id, numer_wozu, status_wozu, obsluzone_zgloszenia, uwagi, remiza_id) VALUES
(1, 'S001', 'A', 3, 'Brak uwag', 1);

-- Wstawianie danych do tabeli pogotowie
INSERT INTO pogotowie (id, numer_karetki, status_karetki, obsluzone_zgloszenia, uwagi, szpital_id) VALUES
(1, 'M001', 'A', 8, 'Brak uwag', 1);

-- Wstawianie danych do tabeli zgloszenie_jednostka
INSERT INTO zgloszenie_jednostka (id_zgloszenia, policja_id, straz_pozarna_id, pogotowie_id) VALUES
(1, 1, 1, 1);

-- Wstawianie danych do tabeli zgloszenie
INSERT INTO zgloszenie (id, id_dyspozytor, id_zglaszajacy, id_typ_zgloszenia, id_klasa_zgloszenia, id_zgloszenie_jednostka, ulica, numer_budynku, numer_mieszkania, data_zgloszenia, opis_zdarzenia) VALUES
(1, 1, 1, 1, 1, 1, 'Ul. Testowa', 10, 5, '2023-05-01', 'Opis testowego zdarzenia');