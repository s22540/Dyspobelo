﻿import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditForm from "../components/EditForm";
import Menu from "../components/Menu";
import List from "../components/List";

const EditAnnouncement = () => {
	return null;
	// const { t } = useTranslation();
	// const styles = {
	//     layout: {
	//         display: "flex",
	//         justifyContent: "space-between",
	//         alignItems: "flex-start",
	//         gap: "20px",
	//     },
	//     container: {
	//         width: "100%",
	//     },
	//     halfWidth: {
	//         width: "50%",
	//         height: "660px",
	//         boxSizing: "border-box",
	//     },
	// };
	// const [selectedZgloszenie, setSelectedZgloszenie] = useState(null);
	// return (
	//     <div style={styles.container}>
	//         <div>
	//             <Menu />
	//         </div>
	//         <div style={styles.layout}>
	//             <div style={styles.halfWidth}>
	//                 <List
	//                     onSelectZgloszenie={setSelectedZgloszenie}
	//                     placeholder={t("Wyszukaj zgłoszenie")}
	//                 />
	//             </div>
	//             <div style={styles.halfWidth}>
	//                 {selectedZgloszenie && (
	//                     <EditForm
	//                         zgloszenie={selectedZgloszenie}
	//                         title={t("Edytuj zgłoszenie")}
	//                     />
	//                 )}
	//             </div>
	//         </div>
	//     </div>
	// );
};

export default EditAnnouncement;
