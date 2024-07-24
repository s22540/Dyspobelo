import React from "react";
import MapComponent from "./MapComponent";

const Layout = ({ children }) => {
	const styles = {
		container: {
			display: "flex",
			flexDirection: "column",
			height: "100vh",
		},
		content: {
			flex: 1,
			display: "flex",
			flexDirection: "column",
		},
		mapContainer: {
			position: "fixed",
			bottom: 0,
			left: 0,
			width: "100%",
			height: "33%", // 1/3 wysokości ekranu
			zIndex: 1000,
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.mapContainer}>
				<MapComponent />
			</div>
			<div style={styles.content}>{children}</div>
		</div>
	);
};

export default Layout;
