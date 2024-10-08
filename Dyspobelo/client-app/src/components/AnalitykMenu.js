import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AnalitykMenu = () => {
    const { t } = useTranslation();
    const linkStyle = {
        display: "block",
        padding: "10px",
        margin: "5px",
        textDecoration: "none",
        color: "black",
    };

    const navStyle = {
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "45px",
    };

    const activeStyle = {
        fontWeight: "bold",
        backgroundColor: "#eee",
    };

    return (
        <div>
            <nav>
                <ul style={navStyle}>
                    <li>
                        <NavLink
                            to="/wygeneruj-raport"
                            style={({ isActive }) =>
                                isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                            }
                        >
                            {t('Wygeneruj raport zgłoszeń')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/wygeneruj-raport-ulic"
                            style={({ isActive }) =>
                                isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                            }
                        >
                            {t('Wygeneruj raport ulic')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/analityk-settings"
                            style={({ isActive }) =>
                                isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                            }
                        >
                            {t('Ustawienia')}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AnalitykMenu;