import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { MarkersContext } from '../context/MarkersContext';
import MovingMarkerLogic from './MovingMarkerLogic';

const MapComponent = () => {
    const { markers, selectedMarker } = useContext(MarkersContext);

    const defaultPosition = [52.237049, 21.017532];

    return (
        <MapContainer center={selectedMarker?.position || defaultPosition} zoom={13} style={{ height: '65vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker => (
                <React.Fragment key={marker.id}>
                    <Marker
                        position={marker.position}
                        icon={L.icon({ iconUrl: marker.iconUrl, iconSize: [40, 40], iconAnchor: [20, 20] })}
                        interactive={false} // Set interactive to false
                    />
                    <MovingMarkerLogic marker={marker} />
                </React.Fragment>
            ))}
            {selectedMarker && selectedMarker.position && selectedMarker.position.length === 2 && (
                <Marker
                    position={selectedMarker.position}
                    icon={L.icon({ iconUrl: selectedMarker.iconUrl, iconSize: [40, 40], iconAnchor: [20, 20] })}
                    interactive={false} // Set interactive to false
                />
            )}
        </MapContainer>
    );
};

export default MapComponent;