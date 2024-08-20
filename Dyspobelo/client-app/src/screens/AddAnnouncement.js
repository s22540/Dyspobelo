<<<<<<< HEAD
﻿import React, { useRef } from "react";
=======
﻿import React from "react";
import { useTranslation } from "react-i18next";
>>>>>>> origin/master
import Form from "../components/Form";
import Menu from "../components/Menu";
import MovingMarkerLogic from "../components/MovingMarkerLogic";
import MapComponent from "../components/MapComponent";

const AddAnnouncement = ({ children }) => {
<<<<<<< HEAD
	const movingMarkerRef = useRef(null);

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
					{/* Jeśli dzieci (children) są przekazane, użyj ich, w przeciwnym razie użyj MapComponent */}
					{children ? (
						React.cloneElement(children, { ref: movingMarkerRef })
					) : (
						<MapComponent ref={movingMarkerRef} />
					)}
				</div>
			</div>
		</div>
	);
=======
    const { t } = useTranslation();
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
                    <Form />
                </div>
                <div style={styles.halfWidth}>{children}</div>
            </div>
        </div>
    );
>>>>>>> origin/master
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
