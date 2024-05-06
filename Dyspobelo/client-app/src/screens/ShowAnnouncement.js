import React from "react";
import Map from "../components/MapComponent";
import Menu from "../components/Menu";
import List from "../components/List";

const ShowAnnouncement = () => {
	const styles = {
		layout: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-start",
		},
		container: {
			width: "100%",
			height: "100%",
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
					<List />
				</div>
				<div style={styles.halfWidth}>
					<Map />
				</div>
			</div>
		</div>
	);
};

export default ShowAnnouncement;
