﻿import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const List = ({ onSelectZgloszenie, zgloszenia }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedZgloszenieId, setSelectedZgloszenieId] = useState(null);

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
            height: "640px",
            padding: "0 20px 20px 20px",
            backgroundColor: "#f2f2f2",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            overflow: "auto",
            position: "relative",
        },
        searchContainer: {
            position: "sticky",
            top: 0,
            backgroundColor: "#f2f2f2",
            zIndex: 100,
            padding: "10px 0",
            marginBottom: "10px",
            width: "100%",
        },
        searchInput: {
            width: "97.5%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            margin: "0 auto",
            display: "block",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
    };

    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder={t("Szukaj po ID lub ulicy...")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            {filteredZgloszenia.map((zgloszenie, index) => (
                <div
                    key={zgloszenie.id}
                    style={{
                        ...styles.item,
                        ...(hoveredItem === index && styles.itemHover),
                        ...(selectedZgloszenieId === zgloszenie.id && {
                            backgroundColor: "#a2a2a2",
                            border: "1px solid #000000"
                        }),
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                        onSelectZgloszenie(zgloszenie);
                        setSelectedZgloszenieId(zgloszenie.id);
                    }}
                >
                    <div>
                        <strong>{t("Zgłoszenie ID")}:</strong> {zgloszenie.id}
                    </div>
                    <div>
                        <strong>{t("Adres")}:</strong> {zgloszenie.ulica}{" "}
                        {zgloszenie.numer_budynku}
                        {zgloszenie.numer_mieszkania
                            ? `/${zgloszenie.numer_mieszkania}`
                            : ""}
                    </div>
                    <div>
                        <strong>{t("Data")}:</strong>{" "}
                        {new Date(zgloszenie.data_zgloszenia).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;