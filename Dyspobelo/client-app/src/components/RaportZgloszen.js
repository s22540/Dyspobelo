import React, { useState } from "react";
import AnalitykMenu from "./AnalitykMenu";
import { useTranslation } from "react-i18next";

const RaportZgloszen = () => {
    const [raport, setRaport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [filters, setFilters] = useState({ typZgloszenia: "", rok: "", miesiac: "", liczbaZgloszen: "" });
    const { t } = useTranslation();

    const wygenerujRaport = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://dyspobeloapi.azurewebsites.net/api/Raport/raport-zgloszen",
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

    const getMonthName = (monthNumber) => {
        const months = [
            t("Styczeń"), t("Luty"), t("Marzec"), t("Kwiecień"), t("Maj"), t("Czerwiec"),
            t("Lipiec"), t("Sierpień"), t("Wrzesień"), t("Październik"), t("Listopad"), t("Grudzień")
        ];
        return months[monthNumber - 1];
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

        const conditions = filter.split(" ").map(cond => cond.trim());
        let match = true;

        conditions.forEach(cond => {
            if (cond.startsWith(">")) {
                const number = parseFloat(cond.slice(1));
                if (isNaN(number) || value <= number) {
                    match = false;
                }
            } else if (cond.startsWith("<")) {
                const number = parseFloat(cond.slice(1));
                if (isNaN(number) || value >= number) {
                    match = false;
                }
            } else if (cond.startsWith("=")) {
                const number = parseFloat(cond.slice(1));
                if (isNaN(number) || value !== number) {
                    match = false;
                }
            } else {
                const number = parseFloat(cond);
                if (!isNaN(number) && value !== number) {
                    match = false;
                }
            }
        });

        return match;
    };

    const filteredRaport = raport
        ? raport.filter(
            (item) =>
                item.typZgloszenia.toLowerCase().includes(filters.typZgloszenia.toLowerCase()) &&
                item.rok.toString().includes(filters.rok) &&
                getMonthName(item.miesiac).toLowerCase().includes(filters.miesiac.toLowerCase()) &&
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

    const translateReportType = (type) => {
        switch (type) {
            case "Pożar":
                return t("Pożar");
            case "Wypadek":
                return t("Wypadek");
            default:
                return type;
        }
    };

    return (
        <div>
            <AnalitykMenu />
            <div style={styles.container}>
                <h1>{t("Wygeneruj raport zgłoszeń")}</h1>
                <button onClick={wygenerujRaport} style={styles.button} disabled={loading}>
                    {loading ? t("Generowanie...") : t("Generuj raport")}
                </button>

                {raport && (
                    <div style={styles.raportContainer}>
                        <h2>{t("Raport")}</h2>
                        <div style={styles.filterContainer}>
                            <input
                                name="typZgloszenia"
                                value={filters.typZgloszenia}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj po typie zgłoszenia")}
                                style={styles.filterInput}
                            />
                            <input
                                name="rok"
                                value={filters.rok}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj po roku")}
                                style={styles.filterInput}
                            />
                            <input
                                name="miesiac"
                                value={filters.miesiac}
                                onChange={handleFilterChange}
                                placeholder={t("Filtruj po miesiącu")}
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
                                    <th style={styles.th} onClick={() => sortData("typZgloszenia")}>
                                        {t("Typ zgłoszenia")} <span style={styles.sortIcon}>{getSortIcon("typZgloszenia")}</span>
                                    </th>
                                    <th style={styles.th} onClick={() => sortData("rok")}>
                                        {t("Rok")} <span style={styles.sortIcon}>{getSortIcon("rok")}</span>
                                    </th>
                                    <th style={styles.th} onClick={() => sortData("miesiac")}>
                                        {t("Miesiąc")} <span style={styles.sortIcon}>{getSortIcon("miesiac")}</span>
                                    </th>
                                    <th style={styles.th} onClick={() => sortData("liczbaZgloszen")}>
                                        {t("Liczba zgłoszeń")} <span style={styles.sortIcon}>{getSortIcon("liczbaZgloszen")}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRaport.map((item, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{translateReportType(item.typZgloszenia)}</td>
                                        <td style={styles.td}>{item.rok}</td>
                                        <td style={styles.td}>{getMonthName(item.miesiac)}</td>
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

export default RaportZgloszen;
