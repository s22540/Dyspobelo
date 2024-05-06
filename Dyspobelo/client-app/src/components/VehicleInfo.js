import React, { useContext } from 'react';
import { MarkersContext } from '../context/MarkersContext';

const VehicleInfo = () => {
    const { selectedMarker } = useContext(MarkersContext);

    return (
        <div style={{ padding: '20px', border: '1px solid black', margin: '20px' }}>
            {selectedMarker ? (
                <>
                    <h2>Vehicle Information</h2>
                    <p><strong>Type:</strong> {selectedMarker.vehicleType}</p>
                    <p><strong>Position:</strong> {selectedMarker.position.join(', ')}</p>
                </>
            ) : (
                <p>No vehicle selected.</p>
            )}
        </div>
    );
};

export default VehicleInfo;