-- Wstawianie danych do tabeli dyspozytor
INSERT INTO dyspozytor (id, numer_dyspozytora, imie, nazwisko, zahashowane_haslo) VALUES
(1, 101, 'Jan', 'Kowalski','$2a$12$.cY4DU1ypSs2wG3.9Wz5Qe5HfvzPdpqmRd4XTBut3rIaMc4rOucqa'),
(2, 102, 'Anna', 'Nowak', null);

INSERT INTO analityk (Id, Numer_Analityka, Imie, Nazwisko, Zahashowane_Haslo)
VALUES (1, 123456, 'Jan', 'Kowalski', '$2a$11$1VLNPmpoD9VYJl7V/1HtIOmlMOUyZQtbenkrjCKKF8a9XsPjqXPs2');


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

