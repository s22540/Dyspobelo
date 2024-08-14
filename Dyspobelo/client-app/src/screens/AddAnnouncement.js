import React, { useRef } from "react";
import Form from "../components/Form";
import Menu from "../components/Menu";
import MovingMarkerLogic from "../components/MovingMarkerLogic";
import MapComponent from "../components/MapComponent";

const AddAnnouncement = ({ children }) => {
	const movingMarkerRef = useRef(null);

	const handleNewReport = (coordinates, vehicleId) => {
		if (movingMarkerRef.current) {
			movingMarkerRef.current.handleNewReport(coordinates, vehicleId);
		}
	};

	const styles = {
		layout: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-start",
		},
		container: {
			width: "100%",
		},
		halfWidth: {
			width: "50%",
		},
	};

	return (
		<div style={styles.container}>
			<div>
				<Menu />
			</div>
			<div style={styles.layout}>
				<div style={styles.halfWidth}>
					<Form onReportSubmit={handleNewReport} />
				</div>
				<div style={styles.halfWidth}>
					<MapComponent ref={movingMarkerRef} />
				</div>
			</div>
		</div>
	);
};

export default AddAnnouncement;

//---------------------------------------
//screen z mapką jako prop, to wyzej ma na tą chwile mapke fixed i jest renderowana oddzielnie

// import React from "react";
// import Form from "../components/Form";
// import Menu from "../components/Menu";
// import Map from "../components/MapComponent";

// const AddAnnouncement = ({ children }) => {
// 	const styles = {
// 		layout: {
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "flex-start",
// 		},
// 		container: {
// 			width: "100%",
// 		},
// 		halfWidth: {
// 			width: "50%",
// 		},
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<div>
// 				<Menu />
// 			</div>
// 			<div style={styles.layout}>
// 				<div style={styles.halfWidth}>
// 					<Form />
// 				</div>
// 				<div style={styles.halfWidth}>{children}</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AddAnnouncement;
