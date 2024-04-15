import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

const Home = () => <div>Ekran główny</div>;
const AddAnnouncement = () => <div>Dodaj ogłoszenie</div>;
const EditAnnouncement = () => <div>Edycja ogłoszenia</div>;
const ShowAnnouncements = () => <div>Wyświetl ogłoszenia</div>;
const Settings = () => <div>Ustawienia</div>;

const Menu = () => {
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
							to="/main"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Ekran główny
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/add-announcement"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Dodaj ogłoszenie
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit-announcement"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Edycja ogłoszenia
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/show-announcements"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Wyświetl ogłoszenia
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/settings"
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
				<Route path="/main" element={<Home />} />
				<Route path="/add-announcement" element={<AddAnnouncement />} />
				<Route path="/edit-announcement" element={<EditAnnouncement />} />
				<Route path="/show-announcements" element={<ShowAnnouncements />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	);
};

export default Menu;
