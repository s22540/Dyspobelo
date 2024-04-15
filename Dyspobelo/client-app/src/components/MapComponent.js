import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';

const getRandomCoordinates = (center, range = 0.02) => {
    return [
        center[0] + (Math.random() - 0.5) * range,
        center[1] + (Math.random() - 0.5) * range
    ];
};

const interpolatePosition = (start, end, ratio) => {
    return [
        start[0] + (end[0] - start[0]) * ratio,
        start[1] + (end[1] - start[1]) * ratio
    ];
};

const MovingMarker = ({ initialPosition, iconUrl, vehicleType }) => {
    const map = useMap();
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        const marker = L.marker(initialPosition, { icon }).addTo(map);

        marker.bindPopup(`<strong>Type:</strong> ${vehicleType}`);

        let step = 0;
        let currentSegment = initialPosition;
        let nextSegment = getRandomCoordinates(currentSegment);

        const updatePosition = () => {
            const numSteps = 200;
            const ratio = step / numSteps;
            const newPos = interpolatePosition(currentSegment, nextSegment, ratio);
            marker.setLatLng(new L.LatLng(newPos[0], newPos[1]));
            setPosition(newPos);

            if (step === numSteps) {
                currentSegment = newPos;
                nextSegment = getRandomCoordinates(currentSegment);
                step = 0;
                map.flyTo(new L.LatLng(newPos[0], newPos[1]), map.getZoom());
            } else {
                step++;
            }
        };

        const interval = setInterval(updatePosition, 25);

        return () => {
            clearInterval(interval);
            marker.remove();
        };
    }, [map, iconUrl, vehicleType]);

    return null;
};

const MapComponent = () => {
    const initialPositions = [
        [50.06143, 19.93658],  // ambulans
        [50.06500, 19.94000],  // ambulans
        [50.06200, 19.93000],  // radiowoz
        [50.06200, 19.93650],  // radiowoz
        [50.06200, 19.97000],  // straz
        [50.06200, 19.92000]   // straz
    ];

    return (
        <MapContainer center={initialPositions[0]} zoom={13} style={{ height: '65vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MovingMarker initialPosition={initialPositions[0]} iconUrl={process.env.PUBLIC_URL + '/karetka.png'} vehicleType="Ambulans" />
            <MovingMarker initialPosition={initialPositions[1]} iconUrl={process.env.PUBLIC_URL + '/karetka.png'} vehicleType="Ambulans" />
            <MovingMarker initialPosition={initialPositions[2]} iconUrl={process.env.PUBLIC_URL + '/radiowoz.png'} vehicleType="Radiowóz" />
            <MovingMarker initialPosition={initialPositions[3]} iconUrl={process.env.PUBLIC_URL + '/radiowoz.png'} vehicleType="Radiowóz" />
            <MovingMarker initialPosition={initialPositions[4]} iconUrl={process.env.PUBLIC_URL + '/wozstraz.png'} vehicleType="Wóz Stra¿acki" />
            <MovingMarker initialPosition={initialPositions[5]} iconUrl={process.env.PUBLIC_URL + '/wozstraz.png'} vehicleType="Wóz Stra¿acki" />
        </MapContainer>
    );
};

export default MapComponent;