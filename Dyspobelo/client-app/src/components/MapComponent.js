import React, { useEffect, useContext, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.sync";
import { MarkersContext } from "../context/MarkersContext";
import MovingMarkerLogic from "./MovingMarkerLogic";

const MapComponent = React.forwardRef((props, ref) => {
	const { markers } = useContext(MarkersContext);
	const mapRef = useRef(null);
	const markerLogicRef = useRef(null);

	useEffect(() => {
		if (mapRef.current) {
			const leafletMap = mapRef.current._leaflet_map;
			const otherMapContainers =
				document.querySelectorAll(".leaflet-container");

			otherMapContainers.forEach((otherMapContainer) => {
				if (otherMapContainer !== mapRef.current) {
					const otherMap = otherMapContainer._leaflet_map;
					if (otherMap) {
						leafletMap.sync(otherMap);
						otherMap.sync(leafletMap);
					}
				}
			});
		}
	}, []);

	React.useImperativeHandle(ref, () => ({
		handleNewReport: (coordinates, vehicleId) => {
			if (markerLogicRef.current) {
				markerLogicRef.current.handleNewReport(coordinates, vehicleId);
			}
		},
	}));

	return (
		<div style={{ position: "relative" }}>
			<style>
				{`
                    .leaflet-routing-container {
                        display: none !important;
                    }
                `}
			</style>
			<MapContainer
				ref={mapRef}
				style={{ height: "65vh", width: "100%" }}
				className="leaflet-container"
				center={[51.505, -0.09]}
				zoom={13}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{markers.map((marker) => (
					<MovingMarkerLogic
						key={`marker-${marker.id}`}
						ref={markerLogicRef}
						marker={marker}
					/>
				))}
			</MapContainer>
		</div>
	);
});

export default MapComponent;
