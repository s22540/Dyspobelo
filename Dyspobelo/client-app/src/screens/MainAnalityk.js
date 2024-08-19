import React from "react";
import { Routes, Route } from "react-router-dom";
import AnalitykMenu from "../components/AnalitykMenu";
import RaportZgloszen from "../components/RaportZgloszen";
import Settings from "../screens/AnalitykSettings";

const MainAnalityk = () => {
    return (
        <div style={{ display: "flex" }}>
            <AnalitykMenu />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <Routes>
                    <Route path="/wygeneruj-raport" element={<RaportZgloszen />} />
                    <Route path="/analityk-settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainAnalityk;