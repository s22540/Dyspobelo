/*Procedura historyzująca*/
DELIMITER $$
CREATE PROCEDURE zgloszenie_hist_proc()
BEGIN
    DECLARE v_record_count INT;
    DECLARE v_record_count_tmp INT;
	DECLARE v_tmp_table_exists INT;
    DECLARE v_total_records INT;
    INSERT INTO zdarzenia_systemowe VALUES ('zgloszenie_hist_proc','Rozpoczęcie historyzacji tabeli zgloszenie', NULL, NOW());
	SELECT COUNT(*) 
	FROM information_schema.tables
	WHERE table_name = 'zgloszenie_historia_tmp' INTO v_tmp_table_exists;
    
    IF v_tmp_table_exists = 1 THEN
		DROP TABLE zgloszenie_historia_tmp;
	END IF;
    
    SELECT COUNT(*) FROM zgloszenie WHERE data_zgloszenia < NOW() - INTERVAL 7 DAY INTO v_record_count;
	CREATE TABLE zgloszenie_historia_tmp AS SELECT * FROM zgloszenie WHERE 0=1;
    INSERT INTO zgloszenie_historia_tmp SELECT * FROM zgloszenie WHERE data_zgloszenia < NOW() - INTERVAL 7 DAY;
    ALTER TABLE zgloszenie_historia_tmp ADD data_historyzacji DATE;
    UPDATE zgloszenie_historia_tmp SET data_historyzacji = NOW();
    SELECT COUNT(*) FROM zgloszenie_historia_tmp INTO v_record_count_tmp;
    IF v_record_count = v_record_count_tmp THEN
		INSERT INTO zgloszenie_historia SELECT * FROM zgloszenie_historia_tmp;
        SET v_total_records = ROW_COUNT();
        DELETE zgloszenie FROM zgloszenie INNER JOIN zgloszenie_historia_tmp ON zgloszenie_historia_tmp.id = zgloszenie.id WHERE 		  zgloszenie_historia_tmp.id = zgloszenie.id;
        DROP TABLE zgloszenie_historia_tmp;
    END IF;
    INSERT INTO zdarzenia_systemowe VALUES ('zgloszenie_hist_proc','Zakończenie historyzacji tabeli zgloszenie', v_total_records, NOW());
END$$
DELIMITER ;


/*Procedura do generowania raportow*/

DELIMITER //

CREATE PROCEDURE GenerujRaportZgloszen()
BEGIN
    SELECT 
        t.nazwa_typu AS TypZgloszenia,
        YEAR(z.data_zgloszenia) AS Rok,
        MONTH(z.data_zgloszenia) AS Miesiac,
        COUNT(*) AS LiczbaZgloszen
    FROM 
        zgloszenie z
    JOIN 
        typ_zgloszenia t ON z.id_typ_zgloszenia = t.id
    GROUP BY 
        t.nazwa_typu, 
        YEAR(z.data_zgloszenia), 
        MONTH(z.data_zgloszenia)
    ORDER BY 
        Rok, Miesiac, TypZgloszenia;
END //

DELIMITER ;

/*Procedura do generowania raportow z ulicami*/
DELIMITER //

CREATE PROCEDURE GenerujRaportUlic()
BEGIN
    SELECT 
        z.ulica AS Ulica,
        t.nazwa_typu AS TypZgloszenia,
        COUNT(*) AS LiczbaZgloszen
    FROM 
        zgloszenie z
    JOIN 
        typ_zgloszenia t ON z.id_typ_zgloszenia = t.id
    GROUP BY 
        z.ulica, t.nazwa_typu
    ORDER BY 
        LiczbaZgloszen DESC;
END //

DELIMITER ;