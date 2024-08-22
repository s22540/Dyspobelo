import React from "react";
import Form from "../components/Form";
import Menu from "../components/Menu";

const AddAnnouncement = ({ onReportSubmit }) => {
	// const movingMarkerRef = useRef(null);

	// const handleNewReport = (coordinates, vehicleId) => {
	// 	console.log(
	// 		"handleNewReport called with coordinates:",
	// 		coordinates,
	// 		"and vehicleId:",
	// 		vehicleId
	// 	);

	// 	if (movingMarkerRef.current) {
	// 		console.log("Calling handleNewReport on MovingMarkerLogic");
	// 		movingMarkerRef.current.handleNewReport(coordinates, vehicleId);
	// 	} else {
	// 		console.log("movingMarkerRef.current is null");
	// 	}
	// };

	const styles = {
		layout: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-start",
			width: "100%",
			overflow: "hidden",
			boxSizing: "border-box",
		},
		container: {
			width: "100%",
			padding: "20px",
			boxSizing: "border-box",
			overflowX: "hidden",
			overflowY: "auto",
		},
		halfWidth: {
			width: "48%",
			boxSizing: "border-box",
			height: "60vh",
		},
		mapContainer: {
			marginRight: "20px",
			width: "100%",
			boxSizing: "border-box",
			height: "100%",
		},
	};

	return (
		<div style={styles.container}>
			<Menu />
			<div style={styles.layout}>
				<div style={styles.halfWidth}>
					<Form onReportSubmit={onReportSubmit} />
				</div>
				<div style={styles.halfWidth}>
					<div style={styles.mapContainer}>
						{/* <MapComponent
							center={mapState.center}
							zoom={mapState.zoom}
							ref={movingMarkerRef}
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddAnnouncement;
