import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMarkers } from "../context/MarkersContext";
import axios from "axios";
import { updateVehicleStatus } from "../components/MovingMarkerLogic";
function Form({ onReportSubmit }) {
	const { t } = useTranslation();
	const { policjaData, strazPozarnaData, pogotowieData, fetchVehicleData } =
		useMarkers();

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
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [errors, setErrors] = useState("");

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
		fetchVehicleData();
		const fetchTypyIKlasyZgloszen = async () => {
			try {
				const typyResponse = await fetch(
					"https://dyspobeloapi.azurewebsites.net/api/TypyZgloszenia"
				);
				const typyData = await typyResponse.json();
				setTypyZgloszen(typyData);

				const klasyResponse = await fetch(
					"https://dyspobeloapi.azurewebsites.net/api/KlasyZgloszenia"
				);
				const klasyData = await klasyResponse.json();
				setKlasyZgloszen(klasyData);
			} catch (error) {
				console.error("Error loading data:", error);
			}
		};

		fetchTypyIKlasyZgloszen();
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

	const validateForm = () => {
		const {
			imie,
			nazwisko,
			numerKontaktowy,
			opis_zdarzenia,
			ulica,
			numerBudynku,
			id_typ_zgloszenia,
			id_klasa_zgloszenia,
			policja_id,
			straz_pozarna_id,
			pogotowie_id,
		} = formData;
		let errors = [];

		if (!imie) errors.push(t("Pole imię jest wymagane."));
		if (!nazwisko) errors.push(t("Pole nazwisko jest wymagane."));
		if (!numerKontaktowy)
			errors.push(t("Pole numer kontaktowy jest wymagane."));
		if (!opis_zdarzenia) errors.push(t("Pole opis zdarzenia jest wymagane."));
		if (!ulica) errors.push(t("Pole ulica jest wymagane."));
		if (!numerBudynku) errors.push(t("Pole numer budynku jest wymagane."));
		if (!id_typ_zgloszenia)
			errors.push(t("Wybierz odpowiedni typ zgłoszenia."));
		if (!id_klasa_zgloszenia)
			errors.push(t("Wybierz odpowiednią klase zgłoszenia."));
		if (!policja_id && !straz_pozarna_id && !pogotowie_id)
			errors.push(t("Przydziel przynajmniej jedną jednostkę."));

		if (errors.length > 0) {
			setMessage(errors.join("\n"));
			setMessageType("error");

			setTimeout(() => {
				setMessage("");
				setMessageType("");
			}, 3000);

			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			console.log("Submitting form data:", formData);

			const coordinates = await geocodeAddress();

			if (!coordinates) {
				setMessage("Wprowadź poprawny adres.");
				setMessageType("error");

				setTimeout(() => {
					setMessage("");
					setMessageType("");
				}, 3000);

				return;
			}

			const selectedVehicleIds = [];

			if (formData.policja_id) {
				selectedVehicleIds.push(`policja-${formData.policja_id}`);
			}
			if (formData.straz_pozarna_id) {
				selectedVehicleIds.push(`straz-${formData.straz_pozarna_id}`);
			}
			if (formData.pogotowie_id) {
				selectedVehicleIds.push(`pogotowie-${formData.pogotowie_id}`);
			}

			console.log(`Selected Vehicle ID: ${selectedVehicleIds}`);

			if (selectedVehicleIds.length > 0) {
				onReportSubmit(coordinates, selectedVehicleIds);

				for (const vehicleId of selectedVehicleIds) {
					await updateVehicleStatus(vehicleId, "Z");
				}
				await fetchVehicleData();
			}

			const zglaszajacyResponse = await fetch(
				"https://dyspobeloapi.azurewebsites.net/api/Zglaszajacy",
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
						? parseInt(formData.policja_id)
						: null,
					straz_pozarna_id: formData.straz_pozarna_id
						? parseInt(formData.straz_pozarna_id)
						: null,
					pogotowie_id: formData.pogotowie_id
						? parseInt(formData.pogotowie_id)
						: null,
				},
				koordynaty: {
					lat: coordinates[0],
					lon: coordinates[1],
				},
			};

			const response = await fetch(
				"https://dyspobeloapi.azurewebsites.net/api/Zgloszenia",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(zgloszenieData),
				}
			);

			if (!response.ok) throw new Error("Failed to submit the form");
			const responseData = await response.json();
			console.log("Submitted zgłoszenie:", responseData);

			await fetch(
				`https://dyspobeloapi.azurewebsites.net/api/Zglaszajacy/${zglaszajacyData.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id_zgloszenia: responseData.id }),
				}
			);

			console.log("Updated zgłaszający with zgłoszenie ID");
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
			width: "100%",
			margin: "0 auto",
			backgroundColor: "#f2f2f2",
			padding: "20px",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
		},
		form: {
			display: "flex",
			flexWrap: "wrap",
			gap: "10px",
		},
		input: {
			padding: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
			flex: "1 1 45%",
		},
		fullWidthInput: {
			flex: "1 1 100%",
		},
		textarea: {
			flex: "1 1 100%",
			padding: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
			height: "100px",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "flex-end",
			gap: "10px",
			width: "100%",
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
					onChange={(e) => setFormData({ ...formData, ulica: e.target.value })}
					placeholder={t("Ulica")}
					style={styles.input}
				/>
				<input
					name="numerBudynku"
					value={formData.numerBudynku}
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
					placeholder={t("Numer mieszkania (opcjonalny)")}
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
					style={styles.textarea}
				/>

				<select
					name="policja_id"
					value={formData.policja_id}
					onChange={handleInputChange}
					style={styles.input}
				>
					<option value="">{t("Wybierz jednostkę policji")}</option>
					{policjaData
						.filter((p) => p.status_Patrolu === "A")
						.map((p) => (
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
					{strazPozarnaData
						.filter((s) => s.status_Wozu === "A")
						.map((s) => (
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
					{pogotowieData
						.filter((p) => p.status_Karetki === "A")
						.map((p) => (
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
			{message && (
				<div style={styles.messagePopup}>
					{message.split("\n").map((msg, index) => (
						<div key={index}>{msg}</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Form;
