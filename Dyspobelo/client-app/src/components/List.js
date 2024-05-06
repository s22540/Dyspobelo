import React, { useState } from "react";

function List() {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// Function template for handling button clicks
	const handleButtonClick = (element) => {
		console.log(`Clicked on element: ${element}`);
		// You can add your logic here or expand this function
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
			width: "50%",
		},
	};

	return (
		//search bar
		<div>
			{/* <div style={styles.searchContainer}>
				<input
					type="text"
					placeholder="Szukaj..."
					value={searchTerm}
					onChange={handleSearchChange}
					style={styles.searchInput}
				/>
			</div> */}
			<div style={styles.container}>
				{Array.from({ length: 20 }, (_, i) => `Element ${i + 1}`).map(
					(element) => (
						<button
							key={element}
							onClick={() => handleButtonClick(element)}
							style={styles.button}
						>
							{element}
						</button>
					)
				)}
			</div>
		</div>
	);
}

export default List;
