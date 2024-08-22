import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "../screens/mainScreen";
import AddAnnouncement from "../screens/AddAnnouncement";
import MapComponent from "./MapComponent";
import { useMap } from "../context/MapContext";

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
			flexDirection: mode === "main" ? "column" : "row",
			width: "100%",
			height: "100vh",
		},
		menu: {
			flexShrink: 0,
		},
		mapContainer: {
			width: mode === "main" ? "100%" : "50%",
			height: mode === "main" ? "calc(100% - 50px)" : "100vh",
			boxSizing: "border-box",
		},
		content: {
			width: mode === "main" ? "100%" : "50%",
			padding: mode === "main" ? 0 : "20px",
			boxSizing: "border-box",
		},
	};

	return (
		<div style={styles.container}>
			{mode === "main" && <div style={styles.menu}>{children}</div>}
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
			{mode !== "main" && (
				<div style={styles.content}>
					{children
						? React.cloneElement(children, { onReportSubmit: handleNewReport })
						: null}
				</div>
			)}
		</div>
	);
};

export default Layout;
