import React, { createContext, useState } from 'react';
import { getRandomCoordinates } from '../components/MapComponent';

export const MarkersContext = createContext();

export const MarkersProvider = ({ children }) => {
    const initialPositions = [
        [50.06143, 19.93658],
        [50.06500, 19.94000],
        [50.06500, 19.94000],
        [50.06500, 19.94000],
    ];

    const createInitialMarkersState = () => initialPositions.map((position, index) => ({
        id: index,
        position: position,
        iconUrl: index % 2 === 0 ? process.env.PUBLIC_URL + '/karetka.png' : process.env.PUBLIC_URL + '/radiowoz.png', 
        vehicleType: index % 2 === 0 ? "Ambulans" : "Radiowóz"
    }));

    const [markers, setMarkers] = useState(createInitialMarkersState);

    const updateMarkerPosition = (id, newPosition) => {
        setMarkers(prevMarkers => prevMarkers.map(marker =>
            marker.id === id ? { ...marker, position: newPosition } : marker
        ));
    };

    return (
        <MarkersContext.Provider value={{ markers, updateMarkerPosition }}>
            {children}
        </MarkersContext.Provider>
    );
};