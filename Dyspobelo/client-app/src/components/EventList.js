import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EventList = ({ onSelectEvent }) => {
    const { t } = useTranslation();
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5126/api/Zgloszenia");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEvents = events.filter(
        (event) =>
            event.id.toString().includes(searchTerm) ||
            event.ulica.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const geocodeAddress = async (event) => {
        const city = "Warszawa";
        const country = t("Polska");
        const address = `${event.ulica} ${event.numer_budynku}, ${city}, ${country}`;
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.length > 0) {
                const latitude = parseFloat(data[0].lat);
                const longitude = parseFloat(data[0].lon);
                onSelectEvent({
                    id: event.id,
                    position: [latitude, longitude],
                    ulica: event.ulica,
                    numerBudynku: event.numer_budynku,
                    numerMieszkania: event.numer_mieszkania,
                    data: event.data_zgloszenia,
                });
            } else {
                console.error("Geocoding failed for address:", address);
            }
        } catch (error) {
            console.error("Error in geocoding address:", error);
        }
    };

    const styles = {
        container: {
            width: "95%",
            padding: "20px",
            backgroundColor: "#f2f2f2",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
        item: {
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        itemHover: {
            backgroundColor: "#e9ecef",
        },
        searchInput: {
            width: "75%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
    };

    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder={t("Szukaj po ID, ulicy, lub numerze budynku...")}
                value={searchTerm}
                onChange={handleSearchChange}
                style={styles.searchInput}
            />
            {filteredEvents.map((event, index) => (
                <div
                    key={event.id}
                    style={{
                        ...styles.item,
                        ...(hoveredItem === index && styles.itemHover),
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => geocodeAddress(event)}
                >
                    <div>
                        <strong>{t("ID")}:</strong> {event.id}
                    </div>
                    <div>
                        <strong>{t("Adres")}:</strong> {event.ulica} {event.numer_budynku}/{event.numer_mieszkania}
                    </div>
                    <div>
                        <strong>{t("Data zgłoszenia")}:</strong> {new Date(event.data_zgloszenia).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventList;
