import React, { useState, useEffect, onSelectEvent } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet-control-geocoder";
import axios from "axios";

function Form({ onReportSubmit }) {
	const { t } = useTranslation();

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

	const [typyZgloszen, setTypyZgloszen] = useState([]);
	const [klasyZgloszen, setKlasyZgloszen] = useState([]);
	const [policjaList, setPolicjaList] = useState([]);
	const [strazPozarnaList, setStrazPozarnaList] = useState([]);
	const [pogotowieList, setPogotowieList] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

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
				setPolicjaList(policjaData.filter((p) => p.status_Patrolu === "A"));

				const strazPozarnaResponse = await fetch(
					"http://localhost:5126/api/StrazPozarna"
				);
				const strazPozarnaData = await strazPozarnaResponse.json();
				setStrazPozarnaList(
					strazPozarnaData.filter((s) => s.status_Wozu === "A")
				);

				const pogotowieResponse = await fetch(
					"http://localhost:5126/api/Pogotowie"
				);
				const pogotowieData = await pogotowieResponse.json();
				setPogotowieList(pogotowieData.filter((p) => p.status_Karetki === "A"));
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

	const geocodeAddress = async () => {
		const city = "Warszawa";
		const country = "Polska";
		const address = `${formData.ulica} ${formData.numerBudynku}, ${city}, ${country}`;
		const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
			address
		)}&format=json&limit=1`;

		try {
			console.log(`Geocoding address: ${address}`);
			const response = await axios.get(url);
			const data = response.data;

			if (data.length > 0) {
				const latitude = parseFloat(data[0].lat);
				const longitude = parseFloat(data[0].lon);
				console.log(`Geocoded coordinates: [${latitude}, ${longitude}]`);
				return [latitude, longitude];
			} else {
				console.error("Geocoding failed for address:", address);
				return null;
			}
		} catch (error) {
			console.error("Error in geocoding address:", error);
			return null;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("Submitting form data:", formData);
			const coordinates = await geocodeAddress();

			if (coordinates) {
				let selectedVehicleId = "";

				if (formData.policja_id) {
					selectedVehicleId = `policja-${formData.policja_id}`;
				} else if (formData.straz_pozarna_id) {
					selectedVehicleId = `straz-${formData.straz_pozarna_id}`;
				} else if (formData.pogotowie_id) {
					selectedVehicleId = `pogotowie-${formData.pogotowie_id}`;
				}

				console.log(`Selected Vehicle ID: ${selectedVehicleId}`);

				if (selectedVehicleId) {
					onReportSubmit(coordinates, selectedVehicleId);
				}

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
					throw new Error("Błąd tworzenia zgłaszającego");
				const zglaszajacyData = await zglaszajacyResponse.json();
				console.log("Created zgłaszający:", zglaszajacyData);

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
							? `policja-${parseInt(formData.policja_id)}`
							: null,
						straz_pozarna_id: formData.straz_pozarna_id
							? `straz-${parseInt(formData.straz_pozarna_id)}`
							: null,
						pogotowie_id: formData.pogotowie_id
							? `pogotowie-${parseInt(formData.pogotowie_id)}`
							: null,
					},
					koordynaty: {
						lat: coordinates[0],
						lon: coordinates[1],
					},
				};

				const response = await fetch("http://localhost:5126/api/Zgloszenia", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(zgloszenieData),
				});

				if (!response.ok) throw new Error("Failed to submit the form");
				const responseData = await response.json();
				console.log("Submitted zgłoszenie:", responseData);

				await fetch(
					`http://localhost:5126/api/Zglaszajacy/${zglaszajacyData.id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ id_zgloszenia: responseData.id }),
					}
				);

				console.log("Updated zgłaszający with zgłoszenie ID");
			}

			resetForm();
			setMessage("Zgłoszenie zostało pomyślnie dodane!");
			setMessageType("success");
		} catch (error) {
			console.error("Error submitting form:", error);
			setMessage(`Błąd: ${error.message}`);
			setMessageType("error");
		}

		setTimeout(() => {
			setMessage("");
		}, 3000);
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
		messagePopup: {
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			backgroundColor:
				messageType === "error"
					? "rgba(248, 215, 218, 0.9)"
					: "rgba(212, 237, 218, 0.9)",
			color: messageType === "error" ? "#721c24" : "#155724",
			padding: "15px 30px",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
			zIndex: 9999,
			textAlign: "center",
			border:
				messageType === "error"
					? "1px solid rgba(245, 198, 203, 0.9)"
					: "1px solid rgba(195, 230, 203, 0.9)",
		},
	};

	return (
		<div style={styles.formContainer}>
			<h2>{t("Wprowadź dane zgłoszenia")}</h2>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					name="imie"
					value={formData.imie}
					onChange={handleInputChange}
					placeholder={t("Imię")}
					style={styles.input}
				/>
				<input
					name="nazwisko"
					value={formData.nazwisko}
					onChange={handleInputChange}
					placeholder={t("Nazwisko")}
					style={styles.input}
				/>
				<input
					name="numerKontaktowy"
					value={formData.numerKontaktowy}
					onChange={handleInputChange}
					placeholder={t("Numer kontaktowy")}
					style={styles.input}
				/>
				<input
					name="ulica"
					value={formData.ulica}
					//onChange={handleInputChange}
					onChange={(e) => setFormData({ ...formData, ulica: e.target.value })}
					placeholder={t("Ulica")}
					style={styles.input}
				/>
				<input
					name="numerBudynku"
					value={formData.numerBudynku}
					//onChange={handleInputChange}
					onChange={(e) =>
						setFormData({ ...formData, numerBudynku: e.target.value })
					}
					placeholder={t("Numer budynku")}
					style={styles.input}
				/>
				<input
					name="numerMieszkania"
					value={formData.numerMieszkania}
					onChange={handleInputChange}
					placeholder={t("Numer mieszkania")}
					style={styles.input}
				/>
				<select
					name="id_typ_zgloszenia"
					value={formData.id_typ_zgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">{t("Wybierz typ zgłoszenia")}</option>
					{typyZgloszen.map((typ) => (
						<option key={typ.id} value={typ.id}>
							{t(typ.nazwa_typu)}
						</option>
					))}
				</select>
				<select
					name="id_klasa_zgloszenia"
					value={formData.id_klasa_zgloszenia}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">{t("Wybierz klasę zgłoszenia")}</option>
					{klasyZgloszen.map((klasa) => (
						<option key={klasa.id} value={klasa.id}>
							{t(klasa.klasa_zgloszenia)}
						</option>
					))}
				</select>
				<textarea
					name="opis_zdarzenia"
					value={formData.opis_zdarzenia}
					onChange={handleInputChange}
					placeholder={t("Opis zdarzenia")}
					style={{ ...styles.input, height: "100px" }}
				/>
				<select
					name="policja_id"
					value={formData.policja_id}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">{t("Wybierz jednostkę policji")}</option>
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
					<option value="">{t("Wybierz jednostkę straży pożarnej")}</option>
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
					<option value="">{t("Wybierz jednostkę pogotowia")}</option>
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
						{t("Anuluj")}
					</button>
					<button
						type="submit"
						style={{ ...styles.button, ...styles.submitButton }}
					>
						{t("Zatwierdź")}
					</button>
				</div>
			</form>
			{message && <div style={styles.messagePopup}>{message}</div>}
		</div>
	);
}

export default Form;
