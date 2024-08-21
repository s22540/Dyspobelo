import React, { useEffect, useContext, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet.sync";
import { MarkersContext } from "../context/MarkersContext";
import MovingMarkerLogic from "./MovingMarkerLogic";
import L from "leaflet";

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
                center={[52.237049, 21.017532]} 
                zoom={13}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {markers.filter(marker => marker.type === "static").map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={L.icon({
                            iconUrl: marker.iconUrl,
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                        })}
                    >
                        <Popup>
                            <div>
                                <strong>{marker.name}</strong>
                                <br />
                                Kontakt: {marker.contact}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {markers.filter(marker => marker.type === "dynamic").map((marker) => (
                    <MovingMarkerLogic
                        key={marker.id}
                        ref={markerLogicRef}
                        marker={marker}
                    />
                ))}
            </MapContainer>
        </div>
    );
});

export default MapComponent;
