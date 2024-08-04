import React, { useState } from "react";
import Map from "../components/MapComponent";
import Menu from "../components/Menu";
import List from "../components/List";
import { MarkersProvider } from "../context/MarkersContext";

const ShowAnnouncement = ({ children }) => {
	const [selectedZgloszenie, setSelectedZgloszenie] = useState(null);

	const handleSelectZgloszenie = (zgloszenie) => {
		setSelectedZgloszenie(zgloszenie);
	};

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
		<MarkersProvider>
			<div style={styles.container}>
				<div>
					<Menu />
				</div>
				<div style={styles.layout}>
					<div style={styles.halfWidth}>
						<List onSelectZgloszenie={handleSelectZgloszenie} />
					</div>
					<div style={styles.halfWidth}>{children}</div>
				</div>
			</div>
		</MarkersProvider>
	);
};

export default ShowAnnouncement;
