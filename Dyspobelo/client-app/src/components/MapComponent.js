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

const getRandomCoordinates = (center, range = 50) => {
    return [
        center[0] + (Math.random() - 0.5) * range,
        center[1] + (Math.random() - 0.5) * range
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
        let nextSegment = getRandomCoordinates(currentSegment, 5); 
        let startTime = performance.now();
        let travelDistance = L.latLng(currentSegment).distanceTo(nextSegment);
        let duration = travelDistance / 100;

        const updatePosition = () => {
            let currentTime = performance.now();
            let elapsed = currentTime - startTime;
            let progress = elapsed / (duration * 1000); 

            if (progress < 1) {
                const newPos = interpolatePosition(currentSegment, nextSegment, progress);
                leafletMarker.setLatLng(newPos);
                updateMarkerPosition(marker.id, newPos);
                requestAnimationFrame(updatePosition);
            } else {
                currentSegment = nextSegment;
                nextSegment = getRandomCoordinates(currentSegment, 5); 
                startTime = performance.now();
                travelDistance = L.latLng(currentSegment).distanceTo(nextSegment);
                duration = travelDistance / 100; 
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

    return (
        <MapContainer center={markers[0]?.position || [0, 0]} zoom={13} style={{ height: '65vh', width: '100%' }}>
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