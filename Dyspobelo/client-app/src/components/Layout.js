import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "../screens/mainScreen";
import AddAnnouncement from "../screens/AddAnnouncement";
import { useTranslation } from "react-i18next";
import MapComponent from "./MapComponent";
import { useMap } from "../context/MapContext";
import Form from "../components/Form";
import Menu from "../components/Menu";
import List from "../components/List";
import EditForm from "../components/EditForm";

const Layout = ({ children, mode }) => {
	const movingMarkerRef = useRef(null);
	const { mapState, setMapState } = useMap();
	const { t } = useTranslation();
	const [markers, setMarkers] = useState([]);
	const handleSelectEvent = (event) => {
		setMarkers([event]);
	};

	const handleNewReport = (coordinates, vehicleId) => {
		console.log(
			"handleNewReport called with coordinates:",
			coordinates,
			"and vehicleId:",
			vehicleId
		);

		if (movingMarkerRef.current) {
			console.log("Calling handleNewReport on MovingMarkerLogic");
			movingMarkerRef.current.handleNewReport(coordinates, vehicleId);
		} else {
			console.log("movingMarkerRef.current is null");
		}
	};
	const [selectedZgloszenie, setSelectedZgloszenie] = useState(null);

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
			display: mode === "edit" ? "none" : "block",
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
									zgloszenie={selectedZgloszenie}
									title={t("Edytuj zgłoszenie")}
								/>
							)}
						</div>
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
