import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const List = ({ onSelectZgloszenie }) => {
    const { t } = useTranslation();
    const [zgloszenia, setZgloszenia] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5126/api/Zgloszenia");
                setZgloszenia(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredZgloszenia = zgloszenia.filter(
        (zgloszenie) =>
            zgloszenie.id.toString().includes(searchTerm) ||
            zgloszenie.ulica.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                placeholder={t("Szukaj po ID lub ulicy...")}
                value={searchTerm}
                onChange={handleSearchChange}
                style={styles.searchInput}
            />
            {filteredZgloszenia.map((zgloszenie, index) => (
                <div
                    key={zgloszenie.id}
                    style={{
                        ...styles.item,
                        ...(hoveredItem === index && styles.itemHover),
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => onSelectZgloszenie(zgloszenie)}
                >
                    {t("Zgłoszenie ID")}: {zgloszenie.id}, {t("Ulica")}: {zgloszenie.ulica}, {t("Data")}: {new Date(zgloszenie.data_zgloszenia).toLocaleDateString()}
                </div>
            ))}
        </div>
    );
};

export default List;
