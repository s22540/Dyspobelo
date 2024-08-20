import React from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "./MapComponent";

const Layout = ({ children }) => {
	const location = useLocation();

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
		mapContainer: (baseStyle) => ({
			...baseStyle,
			borderRadius: "10px",
			overflow: "hidden",
			backgroundColor: "white",
			zIndex: 1000,
		}),
	};
	const pathStyles = {
		"/main": {
			position: "fixed",
			bottom: "20px",
			left: "50%",
			transform: "translateX(-50%)",
			width: "calc(100% - 40px)",
			height: "calc(100vh - 200px)",
		},
		"/add-announcement": {
			width: "50%", // Default width for large screens
			height: "calc(100vh - 160px)",
			marginRight: "3rem",
		},
		"/show-announcement": {
			width: "50%", // Default width for large screens
			height: "calc(100vh - 160px)",
			marginRight: "3rem",
		},
	};

	const hideMapOnPaths = [
		"/login",
		"/settings",
		"/edit-announcement",
		"/show-announcement",
		"/add-announcement",
		"/login-analityk",
		"/main-analityk",
		"/analityk-settings",
		"/wygeneruj-raport",
		"/wygeneruj-raport-ulic",
	];
	const shouldHideMap = hideMapOnPaths.includes(location.pathname);
	const currentPathStyle = pathStyles[location.pathname] || pathStyles["/main"];

	return (
		<div style={styles.container}>
			<div style={styles.content}>{children}</div>
			{!shouldHideMap && (
				<div
					className={"add-announcement-map-container"}
					style={styles.mapContainer(currentPathStyle)}
				>
					<MapComponent />
				</div>
			)}
		</div>
	);
};

export default Layout;
