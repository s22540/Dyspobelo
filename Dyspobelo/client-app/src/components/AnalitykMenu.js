import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import AnalitykSettings from "../screens/AnalitykSettings";
const AnalitykMenu = () => {
	const linkStyle = {
		display: "block",
		padding: "10px",
		margin: "5px",
		textDecoration: "none",
		color: "black",
	};

	const navStyle = {
		display: "flex",
		justifyContent: "space-evenly",
		listStyle: "none",
		padding: "10px",
		border: "1px solid #ddd",
		borderRadius: "4px",
		margin: "45px",
	};

	const activeStyle = {
		fontWeight: "bold",
		backgroundColor: "#eee",
	};

	return (
		<div>
			<nav>
				<ul style={navStyle}>
					<li>
						<NavLink
							to="/analityk-settings"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Ustawienia
						</NavLink>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/analityk-settings" element={<AnalitykSettings />} /> {}
			</Routes>
		</div>
	);
};

export default AnalitykMenu;