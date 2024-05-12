import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MarkersContext = createContext();

export const MarkersProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/vehicle/vehicles');
                const fetchedMarkers = response.data.map((item, index) => ({
                    id: index,
                    position: [50.06143, 19.93658],
                    iconUrl: item.Type === 'Pogotowie' ? process.env.PUBLIC_URL + '/karetka.png' : process.env.PUBLIC_URL + '/radiowoz.png',
                    vehicleType: item.Type
                }));
                setMarkers(fetchedMarkers);
            } catch (error) {
                console.error('Failed to fetch vehicles:', error);
            }
        };
        fetchVehicles();
    }, []);

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