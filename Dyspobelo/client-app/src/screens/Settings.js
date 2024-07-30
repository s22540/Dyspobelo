import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ChangePassword from "../components/ChangePassword";
import { useTranslation } from "react-i18next";

const Settings = () => {
	const { t, i18n } = useTranslation();
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
					const response = await fetch(`http://localhost:5126/api/user/${storedUserId}`);
					if (response.ok) {
						const data = await response.json();
						setUserInfo({ imie: data.imie, nazwisko: data.nazwisko });
					} else {
						console.error("Failed to fetch user data");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, []);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div>
			<div>
				<Menu />
			</div>
			<div className="settings-page">
				<button className="button" onClick={() => setShowChangePassword(!showChangePassword)}>
					{t('Change Password')}
				</button>
				{showChangePassword && <ChangePassword />}
				<div className="button" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
					{t('Language')} <span className="dropdown-icon">▼</span>
				</div>
				{showLanguageDropdown && (
					<div className="dropdown-menu">
						<div className="dropdown-item" onClick={() => changeLanguage('en')}>English</div>
						<div className="dropdown-item" onClick={() => changeLanguage('pl')}>Polski</div>
					</div>
				)}
				<button className="button">{t('More Settings')}</button>

				<div className="toggle-container">
					<label className="toggle-label">
						{/* <DarkModeToggle /> */}
						{t('Dark Mode')}
					</label>
				</div>

				<ul className="user-info-list">
					<li>{t('User')}</li>
					<li>{userInfo.imie && userInfo.nazwisko ? `${userInfo.imie} ${userInfo.nazwisko}` : t('User user')}</li>
					<li className="logout-link">{t('Logout')}</li>
				</ul>
			</div>
		</div>
	);
};

export default Settings;
