import React, { useState } from "react";
import Map from "../components/MapComponent";
import Menu from "../components/Menu";
import List from "../components/List";
import { MarkersContext } from "../context/MarkersContext";

const ShowAnnouncement = ({ mapComponent }) => {
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
		<MarkersContext>
			<div style={styles.container}>
				<div>
					<Menu />
				</div>
				<div style={styles.layout}>
					<div style={styles.halfWidth}>
						<List onSelectZgloszenie={handleSelectZgloszenie} />
					</div>
					<div style={styles.halfWidth}>{mapComponent}</div>
				</div>
			</div>
		</MarkersContext>
	);
};

export default ShowAnnouncement;
