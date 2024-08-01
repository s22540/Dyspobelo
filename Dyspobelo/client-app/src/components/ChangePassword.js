import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert(t("Nowe has³o i potwierdzenie has³a musz¹ byæ takie same."));
            return;
        }

        const userId = localStorage.getItem("id_dyspozytora");

        const response = await fetch("http://localhost:5126/api/password/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userId}`, // U¿ycie ID u¿ytkownika z lokalnego magazynu
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        });

        if (response.ok) {
            alert(t("Has³o zosta³o zmienione."));
        } else {
            alert(t("Nie uda³o siê zmieniæ has³a."));
        }
    };

    const styles = {
        formContainer: {
            margin: "0 auto",
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            fontFamily: "Arial, sans-serif", // Upewnij siê, ¿e font obs³uguje polskie znaki
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
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleChangePassword} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('Current Password')}:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('New Password')}:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>{t('Confirm New Password')}:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>{t('Submit')}</button>
            </form>
        </div>
    );
};

export default ChangePassword;