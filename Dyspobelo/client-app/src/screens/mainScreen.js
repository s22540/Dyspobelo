import React from "react";
import Menu from "../components/Menu";

const MainScreen = ({ children }) => {
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
				<div style={styles.mapContainer}>{children}</div>
			</div>
		</div>
	);
};

export default MainScreen;
