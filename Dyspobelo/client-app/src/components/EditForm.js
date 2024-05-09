import React, { useEffect, useState } from "react";

function EditForm({ zgloszenie }) {
	const [formData, setFormData] = useState({
		imie: "",
		nazwisko: "",
		numerKontaktowy: "",
		ulica: "",
		numerBudynku: "",
		numerMieszkania: "",
		klasaZgloszenia: "",
		typZgloszenia: "",
		opisZdarzenia: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form Data:", formData);
		// const response = await axios.put(
		// 	`http://localhost:5126/api/Zgloszenia/${zgloszenie.id}`,
		// 	formData
		// );
		try {
			const response = await fetch(
				`http://localhost:5126/api/Zgloszenia/${zgloszenie.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Updated: ", data);
		} catch (error) {
			console.error("Failed to update: ", error);
		}
	};

	useEffect(() => {
		if (zgloszenie) {
			setFormData({
				imie: "",
				nazwisko: "",
				numerKontaktowy: "",
				ulica: zgloszenie.ulica,
				numerBudynku: zgloszenie.numer_budynku.toString(),
				numerMieszkania: zgloszenie.numer_mieszkania.toString(),
				klasaZgloszenia: zgloszenie.id_klasa_zgloszenia.toString(),
				typZgloszenia: zgloszenie.id_typ_zgloszenia.toString(),
				opisZdarzenia: zgloszenie.opis_zdarzenia,
			});
		} else {
			setFormData({
				imie: "",
				nazwisko: "",
				numerKontaktowy: "",
				ulica: "",
				numerBudynku: "",
				numerMieszkania: "",
				klasaZgloszenia: "",
				typZgloszenia: "",
				opisZdarzenia: "",
			});
		}
	}, [zgloszenie]);

	const styles = {
		formContainer: {
			margin: "0 auto",
			backgroundColor: "#f2f2f2",
			padding: "20px",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
		},
		form: {
			display: "flex",
			flexDirection: "column",
			gap: "10px",
		},
		input: {
			padding: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "flex-end",
			gap: "10px",
		},
		button: {
			padding: "10px 15px",
			color: "white",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
		},
		submitButton: {
			backgroundColor: "#4CAF50",
		},
		cancelButton: {
			backgroundColor: "#f44336",
		},
	};

	return (
		<div style={styles.formContainer}>
			<h2>Edytuj dane zgłoszenia</h2>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					name="imie"
					value={formData.imie}
					onChange={handleInputChange}
					placeholder="Imię"
					style={styles.input}
				/>
				<input
					name="nazwisko"
					value={formData.nazwisko}
					onChange={handleInputChange}
					placeholder="Nazwisko"
					style={styles.input}
				/>
				<input
					name="numerKontaktowy"
					value={formData.numerKontaktowy}
					onChange={handleInputChange}
					placeholder="Numer kontaktowy"
					style={styles.input}
				/>
				<input
					name="ulica"
					value={formData.ulica}
					onChange={handleInputChange}
					placeholder="Ulica"
					style={styles.input}
				/>
				<input
					name="numerBudynku"
					value={formData.numerBudynku}
					onChange={handleInputChange}
					placeholder="Numer budynku (opcjonalne)"
					style={styles.input}
				/>
				<input
					name="numerMieszkania"
					value={formData.numerMieszkania}
					onChange={handleInputChange}
					placeholder="Numer mieszkania (opcjonalne)"
					style={styles.input}
				/>
				<select
					name="klasaZgloszenia"
					value={formData.klasaZgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz klasę zgłoszenia</option>
					<option value="klasa1">Klasa 1</option>
					<option value="klasa2">Klasa 2</option>
				</select>
				<select
					name="typZgloszenia"
					value={formData.typZgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz typ zgłoszenia</option>
					<option value="typ1">Typ 1</option>
					<option value="typ2">Typ 2</option>
				</select>
				<textarea
					name="opisZdarzenia"
					value={formData.opisZdarzenia}
					onChange={handleInputChange}
					placeholder="Opis zdarzenia"
					style={{ ...styles.input, height: "100px" }}
				/>
				<div style={styles.buttonContainer}>
					<button
						type="button"
						onClick={() => setFormData({})}
						style={{ ...styles.button, ...styles.cancelButton }}
					>
						Anuluj
					</button>
					<button
						type="submit"
						style={{ ...styles.button, ...styles.submitButton }}
					>
						Zatwierdź
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditForm;
