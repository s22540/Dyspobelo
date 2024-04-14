import React from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";

const Home = () => <div>Ekran główny</div>;
const AddAnnouncement = () => <div>Dodaj ogłoszenie</div>;
const EditAnnouncement = () => <div>Edycja ogłoszenia</div>;
const ShowAnnouncements = () => <div>Wyświetl ogłoszenia</div>;
const Settings = () => <div>Ustawienia</div>;

const Menu = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Ekran główny
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/add-announcement"
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Dodaj ogłoszenie
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit-announcement"
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Edycja ogłoszenia
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/show-announcements"
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Wyświetl ogłoszenia
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/settings"
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Ustawienia
						</NavLink>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-announcement" element={<AddAnnouncement />} />
				<Route path="/edit-announcement" element={<EditAnnouncement />} />
				<Route path="/show-announcements" element={<ShowAnnouncements />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	);
};

export default Menu;
