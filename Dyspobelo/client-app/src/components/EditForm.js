import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function EditForm({ zgloszenie, onReportSubmit }) {
	const { t } = useTranslation();

	const [formData, setFormData] = useState({
		id: zgloszenie?.id ?? 0,
		id_dyspozytor: zgloszenie?.id_dyspozytor ?? 0,
		id_zglaszajacy: zgloszenie?.id_zglaszajacy ?? 0,
		id_typ_zgloszenia: zgloszenie?.id_typ_zgloszenia ?? 0,
		id_klasa_zgloszenia: zgloszenie?.id_klasa_zgloszenia ?? 0,
		id_zgloszenie_jednostka: zgloszenie?.id_zgloszenie_jednostka ?? 0,
		ulica: zgloszenie?.ulica ?? "",
		numer_budynku: zgloszenie?.numer_budynku.toString() ?? "",
		numer_mieszkania: zgloszenie?.numer_mieszkania
			? zgloszenie.numer_mieszkania.toString()
			: "",
		data_zgloszenia:
			zgloszenie?.data_zgloszenia ?? new Date().toISOString().substring(0, 10),
		opis_zdarzenia: zgloszenie?.opis_zdarzenia ?? "",
		imie: "",
		nazwisko: "",
		numer_kontaktowy: "",
	});

	const [typyZgloszen, setTypyZgloszen] = useState([]);
	const [klasyZgloszen, setKlasyZgloszen] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const typyResponse = await axios.get(
					"http://localhost:5126/api/TypyZgloszenia"
				);
				setTypyZgloszen(typyResponse.data);

				const klasyResponse = await axios.get(
					"http://localhost:5126/api/KlasyZgloszenia"
				);
				setKlasyZgloszen(klasyResponse.data);
			} catch (error) {
				console.error("Error loading data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchZglaszajacyData = async () => {
			if (zgloszenie) {
				setFormData({
					...formData,
					...zgloszenie,
					numer_budynku: zgloszenie.numer_budynku.toString(),
					numer_mieszkania: zgloszenie?.numer_mieszkania
						? zgloszenie.numer_mieszkania.toString()
						: "",
					data_zgloszenia: new Date(zgloszenie.data_zgloszenia)
						.toISOString()
						.substring(0, 10),
				});

				try {
					const zglaszajacyResponse = await axios.get(
						`http://localhost:5126/api/Zglaszajacy/${zgloszenie.id_zglaszajacy}`
					);
					const zglaszajacyData = zglaszajacyResponse.data;
					setFormData((prevState) => ({
						...prevState,
						imie: zglaszajacyData.imie,
						nazwisko: zglaszajacyData.nazwisko,
						numer_kontaktowy: zglaszajacyData.numer_Kontaktowy,
					}));
				} catch (error) {
					console.error("Error loading zgłaszający data:", error);
				}
			}
		};

		fetchZglaszajacyData();
	}, [zgloszenie]);

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
		const address = `${formData.ulica} ${formData.numer_budynku}, ${city}, ${country}`;
		const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
			address
		)}&format=json&limit=1`;

		try {
			const response = await axios.get(url);
			const data = response.data;

			if (data.length > 0) {
				const latitude = parseFloat(data[0].lat);
				const longitude = parseFloat(data[0].lon);
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

		const today = new Date().toISOString().substring(0, 10);
		if (formData.data_zgloszenia !== today) {
			setMessage("Tylko zgłoszenia z dnia dzisiejszego mogą być edytowane.");
			setMessageType("error");
			return;
		}

		try {
			const coordinates = await geocodeAddress();

			if (coordinates) {
				let selectedVehicleId = `edit-${formData.id}`;

				if (selectedVehicleId) {
					onReportSubmit(coordinates, selectedVehicleId);
				}
			}

			const zglaszajacyPayload = {
				id: zgloszenie.id_zglaszajacy,
				imie: formData.imie,
				nazwisko: formData.nazwisko,
				numer_kontaktowy: formData.numer_kontaktowy,
			};

			await axios.put(
				`http://localhost:5126/api/Zglaszajacy/${zgloszenie.id_zglaszajacy}`,
				zglaszajacyPayload,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const zgloszeniePayload = {
				id: formData.id,
				id_dyspozytor: formData.id_dyspozytor,
				id_typ_zgloszenia: formData.id_typ_zgloszenia,
				id_klasa_zgloszenia: formData.id_klasa_zgloszenia,
				ulica: formData.ulica,
				numer_budynku: parseInt(formData.numer_budynku, 10),
				numer_mieszkania: parseInt(formData.numer_mieszkania, 10),
				data_zgloszenia: formData.data_zgloszenia,
				opis_zdarzenia: formData.opis_zdarzenia,
			};

			await axios.put(
				`http://localhost:5126/api/Zgloszenia/${formData.id}`,
				zgloszeniePayload,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setMessage("Zgłoszenie zostało pomyślnie zaktualizowane!");
			setMessageType("success");
		} catch (error) {
			console.error("Failed to update:", error);
			setMessage(`Błąd: ${error.message}`);
			setMessageType("error");
		}

		setTimeout(() => {
			setMessage("");
		}, 300);
	};

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
			<h2>{t("Edytuj dane zgłoszenia")}</h2>
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
					name="numer_kontaktowy"
					value={formData.numer_kontaktowy}
					onChange={handleInputChange}
					placeholder={t("Numer kontaktowy")}
					style={styles.input}
				/>
				<input
					name="ulica"
					value={formData.ulica}
					onChange={handleInputChange}
					placeholder={t("Ulica")}
					style={styles.input}
				/>
				<input
					name="numer_budynku"
					value={formData.numer_budynku}
					onChange={handleInputChange}
					placeholder={t("Numer budynku")}
					style={styles.input}
				/>
				<input
					name="numer_mieszkania"
					value={formData.numer_mieszkania}
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
				<div style={styles.buttonContainer}>
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

export default EditForm;
