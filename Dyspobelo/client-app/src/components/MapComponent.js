import React, { useEffect, useContext, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet.sync";
import { MarkersContext } from "../context/MarkersContext";
import MovingMarkerLogic from "./MovingMarkerLogic";

const MapComponent = () => {
	const { markers, selectedMarker, updateMarkerPosition } =
		useContext(MarkersContext);
	const mapRef = useRef(null);

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current._leaflet_map = mapRef.current.leafletElement;
			const otherMapContainers =
				document.querySelectorAll(".leaflet-container");
			otherMapContainers.forEach((otherMapContainer) => {
				if (otherMapContainer !== mapRef.current) {
					const otherMap = otherMapContainer._leaflet_map;
					if (otherMap) {
						mapRef.current._leaflet_map.sync(otherMap);
						otherMap.sync(mapRef.current._leaflet_map);
					}
				}
			});
		}
	}, []);

	//const defaultPosition = [52.237049, 21.017532];

	// const handleMarkerMove = (newPosition, id) => {
	// 	updateMarkerPosition(id, newPosition);
	// };

	return (
		<MapContainer
			ref={mapRef}
			//center={selectedMarker?.position || defaultPosition}
			//zoom={20}
			style={{ height: "65vh", width: "100%" }}
			className="leaflet-container"
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{markers.map((marker) => (
				<React.Fragment key={marker.id}>
					<MovingMarkerLogic marker={marker} />
				</React.Fragment>
			))}
		</MapContainer>
	);
};

export default MapComponent;
