import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ChangePassword from "../components/ChangePassword";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Settings = () => {

	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userInfo, setUserInfo] = useState({ imie: '', nazwisko: '' });
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			const storedUserId = localStorage.getItem('id_dyspozytora');
			setUserId(storedUserId);

            if (storedUserId) {
                try {
					const response = await fetch(`https://dyspobeloapi.azurewebsites.net/api/User/${storedUserId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserInfo({ imie: data.imie, nazwisko: data.nazwisko });
                    } else {
                        console.error("Nie udało się pobrać danych użytkownika");
                    }
                } catch (error) {
                    console.error("Błąd podczas pobierania danych użytkownika:", error);
                }
            }
        };


		fetchUserData();
	}, []);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const handleLogout = () => {
		localStorage.removeItem('id_dyspozytora');
		navigate('/login');
	};

	const styles = {
		container: {
			width: "100%",
			maxWidth: "800px",
			margin: "0 auto",
			padding: "20px",
			backgroundColor: "#f2f2f2",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			fontFamily: "Arial, sans-serif",
			marginTop: "10px",
		},
		button: {
			padding: "10px 15px",
			color: "black",
			border: "1px solid #ccc",
			borderRadius: "5px",
			cursor: "pointer",
			backgroundColor: "#e0e0e0",
			width: "100%",
			boxSizing: "border-box",
			marginBottom: "10px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		dropdownMenu: {
			backgroundColor: "#fff",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			borderRadius: "8px",
			padding: "10px",
			marginTop: "10px",
		},
		dropdownItem: {
			padding: "10px",
			cursor: "pointer",
		},
		userInfoList: {
			listStyleType: "none",
			padding: "0",
			margin: "10px 0",
		},
		userInfoItem: {
			padding: "10px",
			borderBottom: "1px solid #ccc",
			display: "flex",
			justifyContent: "space-between",
		},
		logoutLink: {
			color: "red",
			cursor: "pointer",
			padding: "10px",
			borderBottom: "1px solid #ccc",
		},
		darkModeOption: {
			padding: "10px",
			cursor: "pointer",
			borderBottom: "1px solid #ccc",
			display: "flex",
			justifyContent: "space-between",
		}
	};

    return (
        <div>
            <div>
                <Menu />
            </div>
            <div style={styles.container}>
                <button style={styles.button} onClick={() => setShowChangePassword(!showChangePassword)}>
                    {t('Zmień hasło')}
                    <span>▼</span>
                </button>
                {showChangePassword && <ChangePassword />}
                <div style={styles.button} onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                    {t('Język')} <span>▼</span>
                </div>
                {showLanguageDropdown && (
                    <div style={styles.dropdownMenu}>
                        <div style={styles.dropdownItem} onClick={() => changeLanguage('en')}>English</div>
                        <div style={styles.dropdownItem} onClick={() => changeLanguage('pl')}>Polski</div>
                    </div>
                )}
                <ul style={styles.userInfoList}>
                    <li style={styles.userInfoItem}>
                        {t('Użytkownik')}
                        <span>{userInfo.imie && userInfo.nazwisko ? `${userInfo.imie} ${userInfo.nazwisko}` : t('Użytkownik')}</span>
                    </li>
                    <li style={styles.logoutLink} onClick={handleLogout}>{t('Wyloguj')}</li>
                </ul>
            </div>
        </div>
    );
};

export default Settings;
