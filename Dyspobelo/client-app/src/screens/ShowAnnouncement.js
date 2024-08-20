import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SimpleMap from "../components/SimpleMap";
import Menu from "../components/Menu";
import EventList from "../components/EventList";
import { MarkersProvider } from "../context/MarkersContext";

const ShowAnnouncement = () => {
    const { t } = useTranslation();
    const [markers, setMarkers] = useState([]);

    const handleSelectEvent = (event) => {
        setMarkers([event]);
    };

    const styles = {
        layout: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        container: {
            width: "100%",
            height: "100%",
        },
        halfWidth: {
            width: "50%",
        },
    };

    return (
        <MarkersProvider>
            <div style={styles.container}>
                <div>
                    <Menu />
                </div>
                <div style={styles.layout}>
                    <div style={styles.halfWidth}>
                        <EventList onSelectEvent={handleSelectEvent} />
                    </div>
                    <div style={styles.halfWidth}>
                        <SimpleMap markers={markers} />
                    </div>
                </div>
            </div>
        </MarkersProvider>
    );
};

export default ShowAnnouncement;
