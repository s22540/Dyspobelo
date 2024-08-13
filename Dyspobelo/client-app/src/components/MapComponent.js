import React, { useEffect, useContext, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.sync";
import { MarkersContext } from "../context/MarkersContext";
import MovingMarkerLogic from "./MovingMarkerLogic";

const MapComponent = () => {
	const { markers } = useContext(MarkersContext);
	const mapRef = useRef(null);

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
					<MovingMarkerLogic key={marker.id} marker={marker} />
				))}
			</MapContainer>
		</div>
	);
};

export default MapComponent;
