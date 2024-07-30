import React from "react";
import Form from "../components/Form";
import Menu from "../components/Menu";
import Map from "../components/MapComponent";

const AddAnnouncement = ({ children }) => {
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
};

export default AddAnnouncement;
