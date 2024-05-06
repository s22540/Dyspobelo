import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

const Home = () => <div>Ekran główny</div>;
const AddAnnouncement = () => <div>Dodaj zgłoszenie</div>;
const EditAnnouncement = () => <div>Edycja zgłoszenia</div>;
const ShowAnnouncement = () => <div>Wyświetl zgłoszenia</div>;
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
							Dodaj zgłoszenie
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit-announcement"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Edycja zgłoszenia
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/show-announcement"
							style={({ isActive }) =>
								isActive ? { ...linkStyle, ...activeStyle } : linkStyle
							}
						>
							Wyświetl zgłoszenia
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
				<Route path="/show-announcement" element={<ShowAnnouncement />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	);
};

export default Menu;
