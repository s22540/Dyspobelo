import React from "react";
import { Routes, Route } from "react-router-dom";
import AnalitykMenu from "../components/AnalitykMenu";
import AnalitykSettings from "../screens/AnalitykSettings";

const MainAnalityk = () => {
    return (
        <div style={{ display: "flex" }}>
            <AnalitykMenu />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <Routes>
                    <Route path="/analityk-settings" element={<AnalitykSettings />} /> {}
                </Routes>
            </div>
        </div>
    );
};

export default MainAnalityk;