import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-control-geocoder";

function Form({ onReportSubmit }) {
	const [formData, setFormData] = useState({
		imie: "",
		nazwisko: "",
		numerKontaktowy: "",
		ulica: "",
		numerBudynku: "",
		numerMieszkania: "",
		id_typ_zgloszenia: "",
		id_klasa_zgloszenia: "",
		opis_zdarzenia: "",
		policja_id: "",
		straz_pozarna_id: "",
		pogotowie_id: "",
	});

	const resetForm = () => {
		setFormData({
			imie: "",
			nazwisko: "",
			numerKontaktowy: "",
			ulica: "",
			numerBudynku: "",
			numerMieszkania: "",
			id_typ_zgloszenia: "",
			id_klasa_zgloszenia: "",
			opis_zdarzenia: "",
			policja_id: "",
			straz_pozarna_id: "",
			pogotowie_id: "",
		});
	};

	const [typyZgloszen, setTypyZgloszen] = useState([]);
	const [klasyZgloszen, setKlasyZgloszen] = useState([]);
	const [policjaList, setPolicjaList] = useState([]);
	const [strazPozarnaList, setStrazPozarnaList] = useState([]);
	const [pogotowieList, setPogotowieList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const typyResponse = await fetch(
					"http://localhost:5126/api/TypyZgloszenia"
				);
				const typyData = await typyResponse.json();
				setTypyZgloszen(typyData);

				const klasyResponse = await fetch(
					"http://localhost:5126/api/KlasyZgloszenia"
				);
				const klasyData = await klasyResponse.json();
				setKlasyZgloszen(klasyData);

				const policjaResponse = await fetch(
					"http://localhost:5126/api/Policja"
				);
				const policjaData = await policjaResponse.json();
				setPolicjaList(policjaData);

				const strazPozarnaResponse = await fetch(
					"http://localhost:5126/api/StrazPozarna"
				);
				const strazPozarnaData = await strazPozarnaResponse.json();
				setStrazPozarnaList(strazPozarnaData);

				const pogotowieResponse = await fetch(
					"http://localhost:5126/api/Pogotowie"
				);
				const pogotowieData = await pogotowieResponse.json();
				setPogotowieList(pogotowieData);
			} catch (error) {
				console.error("Error loading data:", error);
			}
		};

		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const convertAddressToCoordinates = (address) => {
		return new Promise((resolve, reject) => {
			const geocoder = L.Control.Geocoder.nominatim();
			geocoder.geocode(address, (results) => {
				if (results && results.length > 0) {
					const { center } = results[0];
					resolve([center.lat, center.lng]);
				} else {
					reject(new Error(`No results found for the address: ${address}`));
				}
			});
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const address = `${formData.ulica} ${formData.numerBudynku}`;
			const coordinates = await convertAddressToCoordinates(address);

			if (coordinates) {
				const selectedVehicleId =
					formData.policja_id ||
					formData.straz_pozarna_id ||
					formData.pogotowie_id;
				if (selectedVehicleId) {
					// Przekazanie koordynatów i id wybranego pojazdu do komponentu obsługującego ruch
					onReportSubmit(coordinates, selectedVehicleId);
				}
			}
			// Tworzenie zgłaszającego przed dodaniem zgłoszenia
			const zglaszajacyResponse = await fetch(
				"http://localhost:5126/api/Zglaszajacy",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						imie: formData.imie,
						nazwisko: formData.nazwisko,
						numer_kontaktowy: formData.numerKontaktowy,
					}),
				}
			);

			if (!zglaszajacyResponse.ok)
				throw new Error("Failed to create zgłaszający");
			const zglaszajacyData = await zglaszajacyResponse.json();

			const zgloszenieData = {
				id_dyspozytor: parseInt(localStorage.getItem("id_dyspozytora")),
				id_zglaszajacy: zglaszajacyData.id,
				id_typ_zgloszenia: parseInt(formData.id_typ_zgloszenia),
				id_klasa_zgloszenia: parseInt(formData.id_klasa_zgloszenia),
				ulica: formData.ulica,
				numer_budynku: parseInt(formData.numerBudynku),
				numer_mieszkania: parseInt(formData.numerMieszkania),
				opis_zdarzenia: formData.opis_zdarzenia,
				data_zgloszenia: new Date().toISOString(),
				jednostka: {
					policja_id: formData.policja_id
						? parseInt(formData.policja_id)
						: null,
					straz_pozarna_id: formData.straz_pozarna_id
						? parseInt(formData.straz_pozarna_id)
						: null,
					pogotowie_id: formData.pogotowie_id
						? parseInt(formData.pogotowie_id)
						: null,
				},
				// koordynaty: {
				// 	lat: parseFloat(lat),
				// 	lon: parseFloat(lon),
				// },
			};

			const response = await fetch("http://localhost:5126/api/Zgloszenia", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(zgloszenieData),
			});

			if (!response.ok) throw new Error("Failed to submit the form");
			const responseData = await response.json();

			// Update zgłaszający z nowym zgłoszeniem id
			await fetch(
				`http://localhost:5126/api/Zglaszajacy/${zglaszajacyData.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id_zgloszenia: responseData.id }),
				}
			);

			console.log("Submit successful:", responseData);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const styles = {
		formContainer: {
			width: "50%",
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
			<h2>Wprowadź dane zgłoszenia</h2>
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
					//onChange={handleInputChange}
					onChange={(e) => setFormData({ ...formData, ulica: e.target.value })}
					placeholder="Ulica"
					style={styles.input}
				/>
				<input
					name="numerBudynku"
					value={formData.numerBudynku}
					//onChange={handleInputChange}
					onChange={(e) =>
						setFormData({ ...formData, numerBudynku: e.target.value })
					}
					placeholder="Numer budynku"
					style={styles.input}
				/>
				<input
					name="numerMieszkania"
					value={formData.numerMieszkania}
					onChange={handleInputChange}
					placeholder="Numer mieszkania"
					style={styles.input}
				/>
				<select
					name="id_typ_zgloszenia"
					value={formData.id_typ_zgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz typ zgłoszenia</option>
					{typyZgloszen.map((typ) => (
						<option key={typ.id} value={typ.id}>
							{typ.nazwa_typu}
						</option>
					))}
				</select>
				<select
					name="id_klasa_zgloszenia"
					value={formData.id_klasa_zgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz klasę zgłoszenia</option>
					{klasyZgloszen.map((klasa) => (
						<option key={klasa.id} value={klasa.id}>
							{klasa.klasa_zgloszenia}
						</option>
					))}
				</select>
				<textarea
					name="opis_zdarzenia"
					value={formData.opis_zdarzenia}
					onChange={handleInputChange}
					placeholder="Opis zdarzenia"
					style={{ ...styles.input, height: "100px" }}
				/>
				<select
					name="policja_id"
					value={formData.policja_id}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz jednostkę policji</option>
					{policjaList.map((p) => (
						<option key={p.id} value={p.id}>
							{p.numer_Patrolu} - {p.status_Patrolu}
						</option>
					))}
				</select>
				<select
					name="straz_pozarna_id"
					value={formData.straz_pozarna_id}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz jednostkę straży pożarnej</option>
					{strazPozarnaList.map((s) => (
						<option key={s.id} value={s.id}>
							{s.numer_Wozu} - {s.status_Wozu}
						</option>
					))}
				</select>
				<select
					name="pogotowie_id"
					value={formData.pogotowie_id}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">Wybierz jednostkę pogotowia</option>
					{pogotowieList.map((p) => (
						<option key={p.id} value={p.id}>
							{p.numer_Karetki} - {p.status_Karetki}
						</option>
					))}
				</select>
				<div style={styles.buttonContainer}>
					<button
						type="button"
						onClick={resetForm}
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

export default Form;
