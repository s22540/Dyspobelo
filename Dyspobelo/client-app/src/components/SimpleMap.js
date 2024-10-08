import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";

const customIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const MapUpdater = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.closePopup();
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [position, map]);

    return null;
};

const SimpleMap = ({ markers }) => {
    const { t } = useTranslation();

    return (
        <MapContainer
            center={[52.237049, 21.017532]}
            zoom={13}
            style={{ height: "590px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.length > 0 && (
                <>
                    <MapUpdater position={markers[0].position} />
                    <Marker
                        position={markers[0].position}
                        icon={customIcon}
                    >
                        <Popup>
                            <div>
                                <strong>{t("ID")}:</strong> {markers[0].id}<br />
                                <strong>{t("Adres")}:</strong> {`${markers[0].ulica} ${markers[0].numerBudynku}${markers[0].numerMieszkania ? '/' + markers[0].numerMieszkania : ''}`}<br />
                                <strong>{t("Data zgłoszenia")}:</strong> {new Date(markers[0].data).toLocaleDateString()}
                            </div>
                        </Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
};

export default SimpleMap;
