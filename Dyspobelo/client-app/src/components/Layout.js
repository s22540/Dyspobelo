import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "../screens/mainScreen";
import AddAnnouncement from "../screens/AddAnnouncement";
import MapComponent from "./MapComponent";
import { useMap } from "../context/MapContext";
import Form from "../components/Form";
import Menu from "../components/Menu";

const Layout = ({ children, mode }) => {
	const movingMarkerRef = useRef(null);
	const { mapState, setMapState } = useMap();

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
