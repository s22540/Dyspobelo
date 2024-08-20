import React, { useState } from "react";
import AnalitykMenu from "./AnalitykMenu";
import { useTranslation } from "react-i18next";

const RaportUlic = () => {
    const [raport, setRaport] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const wygenerujRaport = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5126/api/raport/raport-ulic", {
                method: "GET",
            });
            const data = await response.json();
            setRaport(data);
        } catch (error) {
            console.error("Błąd podczas generowania raportu:", error);
        } finally {
            setLoading(false);
        }
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
        },
        td: {
            border: "1px solid #ddd",
            padding: "8px",
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
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>{t("Ulica")}</th>
                                    <th style={styles.th}>{t("Typ zgłoszenia")}</th>
                                    <th style={styles.th}>{t("Liczba zgłoszeń")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {raport.map((item, index) => (
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