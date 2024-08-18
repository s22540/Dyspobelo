/*Skrypt tworzący podstawową strukturę bazy danych Dyspobelo*/

/*Tworzenie bazy danych*/
CREATE DATABASE dyspobelo;
USE dyspobelo;
/*Tabele techniczne*/
CREATE TABLE zdarzenia_systemowe (
nazwa_procedury VARCHAR(100),
opis VARCHAR(100),
rekordy_insertowane INT,
czas_wykonania TIMESTAMP
);
/*Czy potrzebne?*/
CREATE TABLE log_aktywnosci (
id_uzytkownika INT,
typ_aktywnosci VARCHAR(20) NOT NULL,
data_aktywnosci DATE NOT NULL,
opis_aktywnosci VARCHAR(20) NOT NULL,
CONSTRAINT PK_log_aktywnosci PRIMARY KEY (id_uzytkownika)
);

CREATE TABLE zgloszenie_historia (
id INT,
id_dyspozytor INT,
id_zglaszajacy INT,
id_typ_zgloszenia INT,
id_klasa_zgloszenia INT,
id_zgloszenie_jednostka INT,
ulica VARCHAR(50),
numer_budynku INT NOT NULL,
numer_mieszkania INT NOT NULL,
data_zgloszenia DATE,
opis_zdarzenia VARCHAR(1000),
data_historyzacji DATE,
CONSTRAINT PK_zgloszenie_historia PRIMARY KEY (id)
);

/*Osoby*/
CREATE TABLE dyzur(
id_harmonogramu INT,
data_rozpoczecia_dyzuru DATE,
data_zakonczenia_dyzuru DATE,
CONSTRAINT PK_dyzur PRIMARY KEY (id_harmonogramu)
);

CREATE TABLE dyspozytor(
id INT,
numer_dyspozytora INT,
imie VARCHAR(20),
nazwisko VARCHAR(20),
zahashowane_haslo VARCHAR(1000),
CONSTRAINT PK_dyspozytor PRIMARY KEY (id)
);

CREATE TABLE analityk(
id INT,
numer_analityka INT,
imie VARCHAR(20),
nazwisko VARCHAR(20),
zahashowane_haslo VARCHAR(1000),
CONSTRAINT PK_analityk PRIMARY KEY (id)
);

CREATE TABLE dyspozytor_dyzur(
dyspozytor_id INT,
dyzur_id_harmonogramu INT,
CONSTRAINT PK_dyspozytor_dyzur PRIMARY KEY (dyspozytor_id,dyzur_id_harmonogramu),
CONSTRAINT FK_dyspozytor_id FOREIGN KEY (dyspozytor_id) REFERENCES dyspozytor (id),
CONSTRAINT FK_dyzur_id_harmonogramu FOREIGN KEY (dyzur_id_harmonogramu) REFERENCES dyzur (id_harmonogramu)
);

CREATE TABLE zglaszajacy(
id INT AUTO_INCREMENT,
imie VARCHAR(20) NOT NULL,
nazwisko VARCHAR(20) NOT NULL,
numer_kontaktowy VARCHAR(20),
id_zgloszenia INT,
CONSTRAINT PK_zglaszajacy PRIMARY KEY (id)
);

/*Tabele około zgłoszenia*/
CREATE TABLE klasa_zgloszenia(
id INT,
klasa_zgloszenia VARCHAR(20) NOT NULL,
CONSTRAINT PK_klasa_zgloszenia PRIMARY KEY (id)
);

CREATE TABLE typ_zgloszenia(
id INT,
nazwa_typu VARCHAR(100) NOT NULL,
czy_powraca CHAR(1) NOT NULL,
CONSTRAINT PK_typ_zgloszenia PRIMARY KEY (id)
);

/*Jednostki*/
CREATE TABLE komisariat(
id INT,
nazwa_komisariatu VARCHAR(50) NOT NULL,
adres VARCHAR(100) NOT NULL,
numer_kontaktowy VARCHAR(15) NOT NULL,
CONSTRAINT PK_komisariat PRIMARY KEY (id)
);

CREATE TABLE remiza(
id INT,
nazwa_remizy VARCHAR(50) NOT NULL,
adres VARCHAR(100) NOT NULL,
numer_kontaktowy VARCHAR(15) NOT NULL,
CONSTRAINT PK_remiza PRIMARY KEY (id)
);

CREATE TABLE szpital(
id INT,
nazwa_szpitala VARCHAR(50) NOT NULL,
adres VARCHAR(100) NOT NULL,
numer_kontaktowy VARCHAR(15) NOT NULL,
CONSTRAINT PK_szpital PRIMARY KEY (id)
);

CREATE TABLE policja(
id INT,
numer_patrolu VARCHAR(10) NOT NULL,
status_patrolu CHAR(1) NOT NULL,
obsluzone_zgloszenia INT NOT NULL,
uwagi VARCHAR(100) NOT NULL,
komisariat_id INT,
CONSTRAINT PK_policja PRIMARY KEY (id),
CONSTRAINT FK_komisariat_id FOREIGN KEY (komisariat_id) REFERENCES komisariat (id)
);

CREATE TABLE straz_pozarna(
id INT,
numer_wozu VARCHAR(10) NOT NULL,
status_wozu CHAR(1) NOT NULL,
obsluzone_zgloszenia INT NOT NULL,
uwagi VARCHAR(100) NOT NULL,
remiza_id INT,
CONSTRAINT PK_straz_pozarna PRIMARY KEY (id),
CONSTRAINT FK_remiza_id FOREIGN KEY (remiza_id) REFERENCES remiza (id)
);

CREATE TABLE pogotowie(
id INT,
numer_karetki VARCHAR(10) NOT NULL,
status_karetki CHAR(1) NOT NULL,
obsluzone_zgloszenia INT NOT NULL,
uwagi VARCHAR(100) NOT NULL,
szpital_id INT,
CONSTRAINT PK_pogotowie PRIMARY KEY (id),
CONSTRAINT FK_szpital_id FOREIGN KEY (szpital_id) REFERENCES szpital (id)
);

/*Zgloszenie*/
CREATE TABLE zgloszenie_jednostka(
id_zgloszenia INT,
policja_id INT,
straz_pozarna_id INT,
pogotowie_id INT,
CONSTRAINT FK_policja_id FOREIGN KEY (policja_id) REFERENCES policja (id),
CONSTRAINT FK_straz_pozarna_id FOREIGN KEY (straz_pozarna_id) REFERENCES straz_pozarna (id),
CONSTRAINT FK_pogotowie_id FOREIGN KEY (pogotowie_id) REFERENCES pogotowie (id)
);

CREATE TABLE zgloszenie(
id INT AUTO_INCREMENT,
id_dyspozytor INT,
id_zglaszajacy INT,
id_typ_zgloszenia INT,
id_klasa_zgloszenia INT,
id_zgloszenie_jednostka INT,
ulica VARCHAR(50),
numer_budynku INT NOT NULL,
numer_mieszkania INT NOT NULL,
data_zgloszenia DATE,
opis_zdarzenia VARCHAR(1000),
CONSTRAINT PK_zgloszenie PRIMARY KEY (id),
CONSTRAINT FK_id_dyspozytor FOREIGN KEY (id_dyspozytor) REFERENCES dyspozytor (id),
CONSTRAINT FK_id_zglaszajacy FOREIGN KEY (id_zglaszajacy) REFERENCES zglaszajacy (id),
CONSTRAINT FK_id_typ_zgloszenia FOREIGN KEY (id_typ_zgloszenia) REFERENCES typ_zgloszenia (id),
CONSTRAINT FK_id_klasa_zgloszenia FOREIGN KEY (id_klasa_zgloszenia) REFERENCES klasa_zgloszenia (id)
);

/*ALTER TABLE zgloszenie_jednostka
ADD CONSTRAINT FK_id_zgloszenia
FOREIGN KEY (id_zgloszenia) REFERENCES zgloszenie(id);*/

/*Indexy*/

CREATE INDEX zgloszenie_idx ON zgloszenie (id);
CREATE INDEX zgloszenie_historia_idx ON zgloszenie_historia (id);
CREATE INDEX zglaszajacy_idx ON zglaszajacy (id);
