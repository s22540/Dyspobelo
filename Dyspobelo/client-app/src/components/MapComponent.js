import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MarkersContext } from '../context/MarkersContext';

const interpolatePosition = (start, end, ratio) => {
    return [
        start[0] + (end[0] - start[0]) * ratio,
        start[1] + (end[1] - start[1]) * ratio
    ];
};

const getRandomCoordinates = (center, range = 300) => {
    return [
        center[0] + (Math.random() - 0.5) * range / 111320, // Dzielenie przez ~111320 przelicza stopnie na metry na równiku
        center[1] + (Math.random() - 0.5) * range / (40075000 * Math.cos(center[0] * Math.PI / 180) / 360) // Poprawka na zmianê d³ugoœci stopnia d³ugoœci geograficznej w zale¿noœci od szerokoœci
    ];
};

const MovingMarkerLogic = ({ marker }) => {
    const map = useMap();
    const { updateMarkerPosition } = useContext(MarkersContext);

    useEffect(() => {
        const icon = L.icon({
            iconUrl: marker.iconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        const leafletMarker = L.marker(marker.position, { icon }).addTo(map);
        leafletMarker.bindPopup(`<strong>Type:</strong> ${marker.vehicleType}`);

        let currentSegment = marker.position;
        let nextSegment = getRandomCoordinates(currentSegment); 
        let startTime = performance.now();
        let travelDistance = L.latLng(currentSegment).distanceTo(nextSegment);
        let duration = travelDistance / 75;

        const updatePosition = () => {
            let currentTime = performance.now();
            let elapsed = currentTime - startTime;
            let progress = elapsed / (duration * 5000);

            if (progress < 1) {
                const newPos = interpolatePosition(currentSegment, nextSegment, progress);
                leafletMarker.setLatLng(newPos);
                updateMarkerPosition(marker.id, newPos);
                requestAnimationFrame(updatePosition);
            } else {
                currentSegment = nextSegment;
                nextSegment = getRandomCoordinates(currentSegment);
                startTime = performance.now();
                travelDistance = L.latLng(currentSegment).distanceTo(nextSegment);
                duration = travelDistance / 75;
                requestAnimationFrame(updatePosition);
            }
        };

        requestAnimationFrame(updatePosition);

        return () => {
            leafletMarker.remove();
        };
    }, [map, marker, updateMarkerPosition]);

    return null;
};

const MapComponent = () => {
    const { markers } = useContext(MarkersContext);

    const defaultPosition = [52.237049, 21.017532];

    return (
        <MapContainer center={markers[0]?.position || defaultPosition} zoom={13} style={{ height: '65vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker => (
                <MovingMarkerLogic key={marker.id} marker={marker} />
            ))}
        </MapContainer>
    );
};

export default MapComponent;