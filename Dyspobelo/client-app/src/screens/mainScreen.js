import React from "react";
import { useTranslation } from "react-i18next";
import Menu from "../components/Menu";

const MainScreen = ({ children }) => {
    const { t } = useTranslation();
    const styles = {
        html: {
            height: "100%",
            margin: 0,
            padding: 0,
        },
        body: {
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "hidden", 
        },
        outerContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
            overflow: "hidden",
            margin: 0,
            padding: 0,
        },
        mapContainer: {
            width: "80%",
            display: "flex",
            justifyContent: "center",
            margin: 0,
            padding: 0,
        },
    };

    return (
        <div style={styles.body}>
            <Menu />
            <div style={styles.outerContainer}>
                <div style={styles.mapContainer}>{children}</div>
            </div>
        </div>
    );
};

export default MainScreen;
