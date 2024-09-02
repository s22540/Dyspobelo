import React, { useState } from "react";
import AnalitykMenu from "./AnalitykMenu";
import { useTranslation } from "react-i18next";

const RaportUlic = () => {
    const [raport, setRaport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [filters, setFilters] = useState({ ulica: "", typZgloszenia: "", liczbaZgloszen: "" });
    const { t } = useTranslation();

    const wygenerujRaport = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://dyspobeloapi.azurewebsites.net/api/raport/raport-ulic",
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setRaport(data);
        } catch (error) {
            console.error("Błąd podczas generowania raportu:", error);
        } finally {
            setLoading(false);
        }
    };

    const sortData = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        setRaport((prevRaport) => {
            return [...prevRaport].sort((a, b) => {
                if (a[key] < b[key]) {
                    return direction === "ascending" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const applyNumberFilter = (value, filter) => {
        if (!filter) return true;

        const rangeRegex = /([<>]=?)?\s*(-?\d+)(?:\s*([<>]=?)\s*(-?\d+))?/;
        const match = filter.match(rangeRegex);

        if (match) {
            const operator1 = match[1];
            const number1 = parseFloat(match[2]);
            const operator2 = match[3];
            const number2 = match[4] ? parseFloat(match[4]) : null;

            if (operator1 && operator2) {
                // Przedział np. ">10 <50"
                if (operator1.includes(">") && operator2.includes("<")) {
                    return value > number1 && value < number2;
                } else if (operator1.includes("<") && operator2.includes(">")) {
                    return value < number1 && value > number2;
                }
            } else if (operator1) {
                // Pojedynczy operator np. ">10"
                if (operator1 === ">" && value > number1) return true;
                if (operator1 === ">=" && value >= number1) return true;
                if (operator1 === "<" && value < number1) return true;
                if (operator1 === "<=" && value <= number1) return true;
                if (operator1 === "=" && value === number1) return true;
            } else {
                // Brak operatora, tylko liczba
                return value === number1;
            }
        }

        return false;
    };

    const filteredRaport = raport
        ? raport.filter(
            (item) =>
                item.ulica.toLowerCase().includes(filters.ulica.toLowerCase()) &&
                item.typZgloszenia.toLowerCase().includes(filters.typZgloszenia.toLowerCase()) &&
                applyNumberFilter(item.liczbaZgloszen, filters.liczbaZgloszen)
        )
        : [];

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "↕️";
        return sortConfig.direction === "ascending" ? "▲" : "▼";
    };

    const styles = {
        container: {
            padding: "20px",
            marginTop: "20px",
        },
        button: {
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
        raportContainer: {
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "5px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            border: "1px solid #ddd",
            padding: "8px",
            backgroundColor: "#f2f2f2",
            textAlign: "left",
            cursor: "pointer",
        },
        td: {
            border: "1px solid #ddd",
            padding: "8px",
        },
        filterContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "10px",
        },
        filterInput: {
            padding: "8px",
            width: "100%",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",
        },
        sortIcon: {
            marginLeft: "5px",
            fontSize: "0.8em",
        },
    };

    return (
        <div>
            <AnalitykMenu />
            <div style={styles.container}>
                <h1>{t("Wygeneruj raport zgłoszeń na ulicach")}</h1>
                <button onClick={wygenerujRaport} style={styles.button} disabled={loading}>
                    {loading ? t("Generowanie...") : t("Generuj raport")}
                </button>

                {raport && (
                    <div style={styles.raportContainer}>
                        <h2>{t("Raport")}</h2>
                        <div style={styles.filterContainer}>
                            <input
                                name="ulica"
                                value={filters.ulica}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj po ulicy")}
                                style={styles.filterInput}
                            />
                            <input
                                name="typZgloszenia"
                                value={filters.typZgloszenia}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj po typie zgłoszenia")}
                                style={styles.filterInput}
                            />
                            <input
                                name="liczbaZgloszen"
                                value={filters.liczbaZgloszen}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj przedziałami zgłoszeń (np. >10 <50) lub po prostu po liczbie (np. 20)")}
                                style={styles.filterInput}
                            />
                        </div>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th} onClick={() => sortData("ulica")}>
                                        {t("Ulica")} <span style={styles.sortIcon}>{getSortIcon("ulica")}</span>
                                    </th>
                                    <th style={styles.th} onClick={() => sortData("typZgloszenia")}>
                                        {t("Typ zgłoszenia")} <span style={styles.sortIcon}>{getSortIcon("typZgloszenia")}</span>
                                    </th>
                                    <th style={styles.th} onClick={() => sortData("liczbaZgloszen")}>
                                        {t("Liczba zgłoszeń")} <span style={styles.sortIcon}>{getSortIcon("liczbaZgloszen")}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRaport.map((item, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{item.ulica}</td>
                                        <td style={styles.td}>{t(item.typZgloszenia)}</td>
                                        <td style={styles.td}>{item.liczbaZgloszen}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaportUlic;
