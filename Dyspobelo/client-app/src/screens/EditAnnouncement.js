﻿import React, { useState } from "react";
import EditForm from "../components/EditForm";
import Menu from "../components/Menu";
import List from "../components/List";

const EditAnnouncement = () => {
    const styles = {
        layout: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        container: {
            width: "100%",
        },
        halfWidth: {
            width: "50%",
        },
    };

    const [selectedZgloszenie, setSelectedZgloszenie] = useState(null);

    return (
        <div style={styles.container}>
            <div>
                <Menu />
            </div>
            <div style={styles.layout}>
                <div style={styles.halfWidth}>
                    <List onSelectZgloszenie={setSelectedZgloszenie} />
                </div>
                <div style={styles.halfWidth}>
                    {selectedZgloszenie && <EditForm zgloszenie={selectedZgloszenie} />}
                </div>
            </div>
        </div>
    );
};

export default EditAnnouncement;