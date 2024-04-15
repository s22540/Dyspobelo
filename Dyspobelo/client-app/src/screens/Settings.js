import React, { useState } from "react";

const Settings = () => {
	const [darkMode, setDarkMode] = useState(false);

	const handleDarkModeChange = (event) => {
		setDarkMode(event.target.checked);
	};

	const pageStyle = {
		maxWidth: "600px",
		margin: "auto",
		padding: "20px",
		border: "1px solid #ddd",
		borderRadius: "4px",
		marginTop: "50px",
	};

	const buttonStyle = {
		display: "block",
		width: "100%",
		padding: "10px",
		margin: "10px 0",
		border: "1px solid #ccc",
		borderRadius: "4px",
		cursor: "pointer",
		background: "transparent",
	};

	const toggleContainerStyle = {
		margin: "10px 0",
		padding: "10px",
		border: "1px solid #ccc",
		borderRadius: "4px",
	};

	const toggleLabelStyle = {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
	};

	const toggleInputStyle = {
		marginRight: "10px",
	};

	const listStyle = {
		listStyle: "none",
		paddingLeft: "0",
		lineHeight: "2em",
	};

	return (
		<div style={pageStyle}>
			<div>
				<button style={buttonStyle}>Zmień hasło</button>
				<button style={buttonStyle}>
					Język <span style={{ float: "right" }}>▼</span>
				</button>
				<button style={buttonStyle}>Więcej ustawień</button>
			</div>

			<div style={toggleContainerStyle}>
				<label style={toggleLabelStyle}>
					<input
						type="checkbox"
						style={toggleInputStyle}
						checked={darkMode}
						onChange={handleDarkModeChange}
					/>
					Czarny tryb
				</label>
			</div>

			<ul style={listStyle}>
				<li>Użytkownik</li>
				<li>User user</li>
				<li style={{ cursor: "pointer", color: "#007bff" }}>Wyloguj</li>
			</ul>
		</div>
	);
};

export default Settings;
