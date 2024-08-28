import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "../screens/mainScreen";
import AddAnnouncement from "../screens/AddAnnouncement";
import MapComponent from "./MapComponent";
import { useMap } from "../context/MapContext";
import Form from "../components/Form";
import Menu from "../components/Menu";
import EditForm from "../components/EditForm";
import List from "../components/List";
import EventList from "../components/EventList";
import SimpleMap from "../components/SimpleMap";
import ChangePassword from "../components/ChangePassword";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MarkersProvider } from "../context/MarkersContext";

const Layout = ({ children, mode }) => {
	const movingMarkerRef = useRef(null);
	const { mapState, setMapState } = useMap();
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userInfo, setUserInfo] = useState({ imie: "", nazwisko: "" });
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
	const [selectedZgloszenie, setSelectedZgloszenie] = useState(null);
	const [markers, setMarkers] = useState([]);

	const handleNewReport = (coordinates, vehicleIds) => {
		if (movingMarkerRef.current && vehicleIds.length > 0) {
			vehicleIds.forEach(vehicleId => {
				console.log(`Invoking handleNewReport for vehicleId: ${vehicleId}`);
				movingMarkerRef.current.handleNewReport(coordinates, vehicleId);
			});
		}
	};

	const handleSelectEvent = (event) => {
		setMarkers([event]);
	};

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const handleLogout = () => {
		localStorage.removeItem("id_dyspozytora");
		navigate("/login");
	};

	const styles = {
		container: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100vh",
		},
		menuContainer: {
			width: "100%",
			flexShrink: 0,
		},
		mainContent: {
			display: "flex",
			width: "100%",
			height: "100%",
			flexGrow: 1,
		},
		formContainer: {
			width: "50%",
			height: "100%",
			padding: "0px",
			margin: "0 30px",
			boxSizing: "border-box",
		},
		mapContainer: {
			width: mode === "main" ? "100%" : "50%",
			height: "100%",
			boxSizing: "border-box",
			marginRight: mode === "add" ? "10px" : "0px",
			display:
				mode === "edit" || mode === "settings" || mode === "show"
					? "none"
					: "block",
		},
		editContentContainer: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-start",
			gap: "20px",
			width: "100%",
		},
		halfWidth: {
			width: "50%",
			height: "660px",
			boxSizing: "border-box",
		},
		settingsContentContainer: {
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
	};

	return (
		<div style={styles.container}>
			<div style={styles.menuContainer}>
				<Menu />
			</div>
			<div style={styles.mainContent}>
				{mode === "add" && (
					<div style={styles.formContainer}>
						<Form onReportSubmit={handleNewReport} />
					</div>
				)}
				{mode === "edit" && (
					<div style={styles.editContentContainer}>
						<div style={styles.halfWidth}>
							<List
								onSelectZgloszenie={setSelectedZgloszenie}
								placeholder={t("Wyszukaj zgłoszenie")}
							/>
						</div>
						<div style={styles.halfWidth}>
							{selectedZgloszenie && (
								<EditForm
									//onReportSubmit={handleNewReport}
									zgloszenie={selectedZgloszenie}
									title={t("Edytuj zgłoszenie")}
								/>
							)}
						</div>
					</div>
				)}
				{mode === "show" && (
					<div style={styles.editContentContainer}>
						<div style={styles.halfWidth}>
							<EventList onSelectEvent={handleSelectEvent} />
						</div>
						<div style={styles.halfWidth}>
							<SimpleMap markers={markers} />
						</div>
					</div>
				)}
				{mode === "settings" && (
					<div style={styles.settingsContentContainer}>
						<button
							style={styles.button}
							onClick={() => setShowChangePassword(!showChangePassword)}
						>
							{t("Zmień hasło")}
							<span>▼</span>
						</button>
						{showChangePassword && <ChangePassword />}
						<div
							style={styles.button}
							onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
						>
							{t("Język")} <span>▼</span>
						</div>
						{showLanguageDropdown && (
							<div style={styles.dropdownMenu}>
								<div
									style={styles.dropdownItem}
									onClick={() => changeLanguage("en")}
								>
									English
								</div>
								<div
									style={styles.dropdownItem}
									onClick={() => changeLanguage("pl")}
								>
									Polski
								</div>
							</div>
						)}
						<ul style={styles.userInfoList}>
							<li style={styles.userInfoItem}>
								{t("Użytkownik")}
								<span>
									{userInfo.imie && userInfo.nazwisko
										? `${userInfo.imie} ${userInfo.nazwisko}`
										: t("Użytkownik")}
								</span>
							</li>
							<li style={styles.logoutLink} onClick={handleLogout}>
								{t("Wyloguj")}
							</li>
						</ul>
					</div>
				)}
				<div style={styles.mapContainer}>
					<MapComponent
						center={mapState.center}
						zoom={mapState.zoom}
						markers={mapState.markers}
						routes={mapState.routes}
						setMapState={setMapState}
						ref={movingMarkerRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default Layout;
