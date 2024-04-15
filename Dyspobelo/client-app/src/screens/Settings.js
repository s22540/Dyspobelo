import React from "react";
// import { DarkModeToggle } from "../components/DarkModeToggle";
// import DarkModeContext from "../context/DarkModeContext";
import Menu from "../components/Menu";

const Settings = () => {
	return (
		<div>
			<div>
				<Menu />
			</div>
			<div className="settings-page">
				<button className="button">Zmień hasło</button>
				<button className="button">
					Język <span className="dropdown-icon">▼</span>
				</button>
				<button className="button">Więcej ustawień</button>

				<div className="toggle-container">
					<label className="toggle-label">
						{/* <DarkModeToggle /> */}
						Czarny tryb
					</label>
				</div>

				<ul className="user-info-list">
					<li>Użytkownik</li>
					<li>User user</li>
					<li className="logout-link">Wyloguj</li>
				</ul>
			</div>
		</div>
	);
};

export default Settings;
