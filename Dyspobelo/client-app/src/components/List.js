import React, { useState, useEffect } from "react";
import axios from "axios";

function List({ onSelectZgloszenie }) {
	const [zgloszenia, setZgloszenia] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);

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

	const filteredZgloszenia = zgloszenia.filter((zgloszenie) =>
		zgloszenie.ulica.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
			align: "center",
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
	};

	return (
		<div>
			<div style={styles.searchContainer}>
				<input
					type="text"
					placeholder="Szukaj po ulicy..."
					value={searchTerm}
					onChange={handleSearchChange}
					style={styles.searchInput}
				/>
			</div>
			<div style={styles.container}>
				{loading ? (
					<p>Loading...</p>
				) : (
					filteredZgloszenia.map((zgloszenie) => (
						<button
							key={zgloszenie.id}
							onClick={() => onSelectZgloszenie(zgloszenie)}
							style={styles.button}
						>
							{`Zgłoszenie ID: ${zgloszenie.id}`}
						</button>
						//, Ulica: ${zgloszenie.ulica}
					))
				)}
			</div>
		</div>
	);
}

export default List;
