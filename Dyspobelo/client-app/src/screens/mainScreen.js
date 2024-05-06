import React from "react";
import Menu from "../components/Menu";
import MapComponent from "../components/MapComponent";

const MainScreen = () => {
	const styles = {
		outerContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		mapContainer: {
			width: "80%",
			display: "flex",
			justifyContent: "center",
		},
	};

	return (
		<div>
			<Menu />
			<div style={styles.outerContainer}>
				<div style={styles.mapContainer}>
					<MapComponent />
				</div>
			</div>
		</div>
	);
};

export default MainScreen;
