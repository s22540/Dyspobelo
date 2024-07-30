import React, { useState } from "react";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Nowe has³o i potwierdzenie has³a musz¹ byæ takie same.");
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
            alert("Has³o zosta³o zmienione.");
        } else {
            alert("Nie uda³o siê zmieniæ has³a.");
        }
    };

    return (
        <form onSubmit={handleChangePassword}>
            <div>
                <label>Obecne has³o:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Nowe has³o:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label>PotwierdŸ nowe has³o:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">Zmieñ has³o</button>
        </form>
    );
};

export default ChangePassword;
