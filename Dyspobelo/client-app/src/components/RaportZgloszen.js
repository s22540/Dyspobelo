import React, { useState } from "react";
import AnalitykMenu from "./AnalitykMenu";

const RaportZgloszen = () => {
    const [raport, setRaport] = useState(null);
    const [loading, setLoading] = useState(false);

    const wygenerujRaport = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5126/api/raport/raport-zgloszen", {
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

    const getMonthName = (monthNumber) => {
        const months = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];
        return months[monthNumber - 1];
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
                <h1>Wygeneruj raport zgłoszeń</h1>
                <button onClick={wygenerujRaport} style={styles.button} disabled={loading}>
                    {loading ? "Generowanie..." : "Generuj raport"}
                </button>

                {raport && (
                    <div style={styles.raportContainer}>
                        <h2>Raport</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Typ zgłoszenia</th>
                                    <th style={styles.th}>Rok</th>
                                    <th style={styles.th}>Miesiąc</th>
                                    <th style={styles.th}>Liczba zgłoszeń</th>
                                </tr>
                            </thead>
                            <tbody>
                                {raport.map((item, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{item.typZgloszenia}</td>
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