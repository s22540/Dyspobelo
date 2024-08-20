import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangePasswordAnalityk = () => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage(t("Nowe hasło i potwierdzenie hasła muszą być takie same."));
            setMessageType("error");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const userId = localStorage.getItem("id_analityk");

        const response = await fetch("http://localhost:5126/api/password/change-password-analityk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userId}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        });

        if (response.ok) {
            setMessage(t("Hasło zostało zmienione."));
            setMessageType("success");
            resetForm();
        } else {
            setMessage(t("Nie udało się zmienić hasła."));
            setMessageType("error");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    const styles = {
        formContainer: {
            margin: "0 auto",
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            fontFamily: "Arial, sans-serif",
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
            width: "100%",
            boxSizing: "border-box",
        },
        button: {
            padding: "10px 15px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            marginTop: "20px",
            width: "100%",
            boxSizing: "border-box",
        },
        label: {
            marginBottom: "5px",
            display: "block",
            textAlign: "left",
        },
        inputContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
        },
        messagePopup: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: messageType === "error" ? "rgba(248, 215, 218, 0.9)" : "rgba(212, 237, 218, 0.9)",
            color: messageType === "error" ? "#721c24" : "#155724",
            padding: "15px 30px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: 9999,
            textAlign: "center",
            border: messageType === "error" ? "1px solid rgba(245, 198, 203, 0.9)" : "1px solid rgba(195, 230, 203, 0.9)",
        },
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleChangePassword} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('Obecne hasło')}:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('Nowe hasło')}:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('Potwierdź nowe hasło')}:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>{t('Zatwierdź')}</button>
            </form>
            {message && (
                <div style={styles.messagePopup}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ChangePasswordAnalityk;
