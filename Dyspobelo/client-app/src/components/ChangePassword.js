import React, { useState } from "react";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Nowe has�o i potwierdzenie has�a musz� by� takie same.");
            return;
        }

        const userId = localStorage.getItem("id_dyspozytora");

        const response = await fetch("http://localhost:5126/api/password/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userId}`, // U�ycie ID u�ytkownika z lokalnego magazynu
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        });

        if (response.ok) {
            alert("Has�o zosta�o zmienione.");
        } else {
            alert("Nie uda�o si� zmieni� has�a.");
        }
    };

    return (
        <form onSubmit={handleChangePassword}>
            <div>
                <label>Obecne has�o:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Nowe has�o:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Potwierd� nowe has�o:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">Zmie� has�o</button>
        </form>
    );
};

export default ChangePassword;
