import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MarkersContext } from '../context/MarkersContext';

// Geocoding function
const getCoordinatesFromAddress = async (address) => {
    const formattedAddress = encodeURIComponent(`${address}, Poland`);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();

    if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
        throw new Error("No coordinates found for address");
    }
};

function List({ onSelectZgloszenie }) {
    const [zgloszenia, setZgloszenia] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState({ field: "", order: "" });
    const { selectMarker } = useContext(MarkersContext);

    const fetchZgloszenia = async () => {
        try {
            const response = await axios.get("http://localhost:5126/api/Zgloszenia");
            setZgloszenia(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZgloszenia();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortOptionChange = (field, order) => {
        setSortOption({ field, order });
    };

    const applySorting = (zgloszenia) => {
        return zgloszenia.sort((a, b) => {
            if (sortOption.field === "id") {
                return sortOption.order === "asc" ? a.id - b.id : b.id - a.id;
            }
            if (sortOption.field === "ulica") {
                return sortOption.order === "asc"
                    ? a.ulica.localeCompare(b.ulica)
                    : b.ulica.localeCompare(a.ulica);
            }
            if (sortOption.field === "date") {
                return sortOption.order === "asc"
                    ? new Date(a.data_zgloszenia) - new Date(b.data_zgloszenia)
                    : new Date(b.data_zgloszenia) - new Date(a.data_zgloszenia);
            }
            return 0;
        });
    };

    const handleSelectZgloszenie = async (zgloszenie) => {
        const address = `${zgloszenie.ulica} ${zgloszenie.numer_budynku}`;
        console.log("Fetching coordinates for address:", address);

        try {
            const { latitude, longitude } = await getCoordinatesFromAddress(address);
            console.log("Coordinates found:", latitude, longitude);

            onSelectZgloszenie(zgloszenie);
            selectMarker({
                id: zgloszenie.id,
                position: [latitude, longitude],
                iconUrl: process.env.PUBLIC_URL + '/marker.png', 
                annType: zgloszenie.typZgloszenia || 'Unknown',
                address: address,
                description: zgloszenie.opis_zdarzenia
            });
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            height: "400px",
            overflowY: "scroll",
            margin: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f8f8f8",
            alignItems: "center",
        },
        searchInput: {
            width: "80%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        searchContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            padding: "10px 20px",
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "grey",
            color: "white",
            width: "100%",
        },
        sortButtons: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px 0",
        },
        sortButtonGroup: {
            margin: "0 10px",
            display: "flex",
            flexDirection: "column",
        },
        sortButton: {
            padding: "10px 20px",
            margin: "5px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#ccc",
            color: "black",
            minWidth: "120px",
        },
        sortButtonActive: {
            backgroundColor: "blue",
            color: "white",
        }
    };

    const getButtonStyle = (field, order) =>
        sortOption.field === field && sortOption.order === order
            ? { ...styles.sortButton, ...styles.sortButtonActive }
            : styles.sortButton;

    return (
        <div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Szukaj po ID lub ulicy..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            <div style={styles.container}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    applySorting(zgloszenia.filter(zgloszenie =>
                        zgloszenie.ulica.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        zgloszenie.id.toString().includes(searchTerm)
                    )).map(zgloszenie => (
                        <button
                            key={zgloszenie.id}
                            onClick={() => handleSelectZgloszenie(zgloszenie)}
                            style={styles.button}
                        >
                            {`Zgłoszenie ID: ${zgloszenie.id}, Ulica: ${zgloszenie.ulica}, Data: ${new Date(zgloszenie.data_zgloszenia).toLocaleDateString()}`}
                        </button>
                    ))
                )}
            </div>
            <div style={styles.sortButtons}>
                <div style={styles.sortButtonGroup}>
                    <button
                        style={getButtonStyle("id", "asc")}
                        onClick={() => handleSortOptionChange("id", "asc")}
                    >
                        ID rosnąco
                    </button>
                    <button
                        style={getButtonStyle("id", "desc")}
                        onClick={() => handleSortOptionChange("id", "desc")}
                    >
                        ID malejąco
                    </button>
                </div>
                <div style={styles.sortButtonGroup}>
                    <button
                        style={getButtonStyle("ulica", "asc")}
                        onClick={() => handleSortOptionChange("ulica", "asc")}
                    >
                        Ulica rosnąco
                    </button>
                    <button
                        style={getButtonStyle("ulica", "desc")}
                        onClick={() => handleSortOptionChange("ulica", "desc")}
                    >
                        Ulica malejąco
                    </button>
                </div>
                <div style={styles.sortButtonGroup}>
                    <button
                        style={getButtonStyle("date", "asc")}
                        onClick={() => handleSortOptionChange("date", "asc")}
                    >
                        Data rosnąco
                    </button>
                    <button
                        style={getButtonStyle("date", "desc")}
                        onClick={() => handleSortOptionChange("date", "desc")}
                    >
                        Data malejąco
                    </button>
                </div>
            </div>
        </div>
    );
}

export default List;
