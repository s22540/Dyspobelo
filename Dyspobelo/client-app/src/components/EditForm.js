import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function EditForm({ zgloszenie, onReportSubmit, onUpdate }) {
    const { t } = useTranslation();

    const [zglaszajacyData, setZglaszajacyData] = useState({
        imie: "",
        nazwisko: "",
        numer_Kontaktowy: "",
    });

    const [zgloszenieData, setZgloszenieData] = useState({
        id: zgloszenie?.id ?? 0,
        id_dyspozytor: zgloszenie?.id_dyspozytor ?? 0,
        id_zglaszajacy: zgloszenie?.id_zglaszajacy ?? 0,
        id_typ_zgloszenia: zgloszenie?.id_typ_zgloszenia ?? 0,
        id_klasa_zgloszenia: zgloszenie?.id_klasa_zgloszenia ?? 0,
        id_zgloszenie_jednostka: zgloszenie?.id_zgloszenie_jednostka ?? 0,
        ulica: zgloszenie?.ulica ?? "",
        numer_budynku: zgloszenie?.numer_budynku?.toString() ?? "",
        numer_mieszkania: zgloszenie?.numer_mieszkania
            ? zgloszenie.numer_mieszkania.toString()
            : "",
        data_zgloszenia:
            zgloszenie?.data_zgloszenia ?? new Date().toISOString().substring(0, 10),
        opis_zdarzenia: zgloszenie?.opis_zdarzenia ?? "",
    });

    const [typyZgloszen, setTypyZgloszen] = useState([]);
    const [klasyZgloszen, setKlasyZgloszen] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // dane dla zgłaszającego
    const fetchZglaszajacyData = async () => {
        if (zgloszenie?.id_zglaszajacy) {
            try {
                const response = await axios.get(
                    `https://dyspobeloapi.azurewebsites.net/api/Zglaszajacy/${zgloszenie.id_zglaszajacy}`
                );
                setZglaszajacyData(response.data);
            } catch (error) {
                console.error("Error loading zgłaszający data:", error);
            }
        }
    };

    // dane dla zgłoszenia
    const fetchZgloszenieData = async () => {
        if (zgloszenie?.id) {
            try {
                const response = await axios.get(
                    `https://dyspobeloapi.azurewebsites.net/api/Zgloszenia/${zgloszenie.id}`
                );
                const data = response.data;
                setZgloszenieData({
                    ...data,
                    numer_budynku: data.numer_budynku.toString(),
                    numer_mieszkania: data.numer_mieszkania
                        ? data.numer_mieszkania.toString()
                        : "",
                    data_zgloszenia: new Date(data.data_zgloszenia)
                        .toISOString()
                        .substring(0, 10),
                });
            } catch (error) {
                console.error("Error loading zgłoszenie data:", error);
            }
        }
    };

    // typy i klasy zgłoszen
    const fetchReferenceData = async () => {
        try {
            const typyResponse = await axios.get(
                "https://dyspobeloapi.azurewebsites.net/api/TypyZgloszenia"
            );
            setTypyZgloszen(typyResponse.data);

            const klasyResponse = await axios.get(
                "https://dyspobeloapi.azurewebsites.net/api/KlasyZgloszenia"
            );
            setKlasyZgloszen(klasyResponse.data);
        } catch (error) {
            console.error("Error loading reference data:", error);
        }
    };

    useEffect(() => {
        onUpdate();
        fetchReferenceData();
        fetchZglaszajacyData();
        fetchZgloszenieData();
    }, [zgloszenie]);

    // obsługa zmian w formularzu
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (["imie", "nazwisko", "numer_Kontaktowy"].includes(name)) {
            setZglaszajacyData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            setZgloszenieData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // aktualizacja zgłaszającego
            await axios.put(
                `https://dyspobeloapi.azurewebsites.net/api/Zglaszajacy/${zgloszenieData.id_zglaszajacy}`,
                zglaszajacyData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // aktualizacja zgłoszenia
            const zgloszeniePayload = {
                ...zgloszenieData,
                numer_budynku: parseInt(zgloszenieData.numer_budynku, 10),
                numer_mieszkania: parseInt(zgloszenieData.numer_mieszkania, 10),
            };

            await axios.put(
                `https://dyspobeloapi.azurewebsites.net/api/Zgloszenia/${zgloszenieData.id}`,
                zgloszeniePayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            setMessage("Zgłoszenie zostało pomyślnie zaktualizowane!");
            setMessageType("success");
            
            // odświeżenie po aktualizacji
            await onUpdate();
            await fetchZglaszajacyData();
            await fetchZgloszenieData();
        } catch (error) {
            console.error("Failed to update:", error);
            setMessage(`Błąd: ${error.message}`);
            setMessageType("error");
        }

        setTimeout(() => {
            setMessage("");
        }, 300);
    };

    const styles = {
        formContainer: {
            margin: "0 auto",
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        input: {
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
        },
        button: {
            padding: "10px 15px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
        submitButton: {
            backgroundColor: "#4CAF50",
        },
        cancelButton: {
            backgroundColor: "#f44336",
        },
        messagePopup: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor:
                messageType === "error"
                    ? "rgba(248, 215, 218, 0.9)"
                    : "rgba(212, 237, 218, 0.9)",
            color: messageType === "error" ? "#721c24" : "#155724",
            padding: "15px 30px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: 9999,
            textAlign: "center",
            border:
                messageType === "error"
                    ? "1px solid rgba(245, 198, 203, 0.9)"
                    : "1px solid rgba(195, 230, 203, 0.9)",
        },
    };

    return (
        <div style={styles.formContainer}>
            <h2>{t("Edytuj dane zgłoszenia")}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="imie"
                    value={zglaszajacyData.imie}
                    onChange={handleInputChange}
                    placeholder={t("Imię")}
                    style={styles.input}
                />
                <input
                    name="nazwisko"
                    value={zglaszajacyData.nazwisko}
                    onChange={handleInputChange}
                    placeholder={t("Nazwisko")}
                    style={styles.input}
                />
                <input
                    name="numer_Kontaktowy"
                    value={zglaszajacyData.numer_Kontaktowy}
                    onChange={handleInputChange}
                    placeholder={t("Numer kontaktowy")}
                    style={styles.input}
                />
                <input
                    name="ulica"
                    value={zgloszenieData.ulica}
                    onChange={handleInputChange}
                    placeholder={t("Ulica")}
                    style={styles.input}
                />
                <input
                    name="numer_budynku"
                    value={zgloszenieData.numer_budynku}
                    onChange={handleInputChange}
                    placeholder={t("Numer budynku")}
                    style={styles.input}
                />
                <input
                    name="numer_mieszkania"
                    value={zgloszenieData.numer_mieszkania}
                    onChange={handleInputChange}
                    placeholder={t("Numer mieszkania")}
                    style={styles.input}
                />
                <select
                    name="id_typ_zgloszenia"
                    value={zgloszenieData.id_typ_zgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">{t("Wybierz typ zgłoszenia")}</option>
                    {typyZgloszen.map((typ) => (
                        <option key={typ.id} value={typ.id}>
                            {t(typ.nazwa_typu)}
                        </option>
                    ))}
                </select>
                <select
                    name="id_klasa_zgloszenia"
                    value={zgloszenieData.id_klasa_zgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">{t("Wybierz klasę zgłoszenia")}</option>
                    {klasyZgloszen.map((klasa) => (
                        <option key={klasa.id} value={klasa.id}>
                            {t(klasa.klasa_zgloszenia)}
                        </option>
                    ))}
                </select>
                <textarea
                    name="opis_zdarzenia"
                    value={zgloszenieData.opis_zdarzenia}
                    onChange={handleInputChange}
                    placeholder={t("Opis zdarzenia")}
                    style={{ ...styles.input, height: "100px" }}
                />
                <div style={styles.buttonContainer}>
                    <button
                        type="submit"
                        style={{ ...styles.button, ...styles.submitButton }}
                    >
                        {t("Zatwierdź")}
                    </button>
                </div>
            </form>
            {message && <div style={styles.messagePopup}>{message}</div>}
        </div>
    );
}

export default EditForm;