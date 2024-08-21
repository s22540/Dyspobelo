import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const MarkersContext = createContext();

export const useMarkers = () => {
	return useContext(MarkersContext);
};

export const MarkersProvider = ({ children }) => {
	const [markers, setMarkers] = useState([]);
	const [selectedMarker, setSelectedMarker] = useState(null);

	useEffect(() => {
		const fetchAndGeocodeMarkers = async () => {
			try {
				// Pobieranie danych o budynkach (komisariaty, remizy, szpitale)
				const jednostkiResponse = await axios.get(
					"http://localhost:5126/api/Jednostki"
				);

				// Geokodowanie adresów jednostek
				const jednostkiMarkers = await Promise.all(
					jednostkiResponse.data.map(async (jednostka) => {
						const coordinates = await geocodeAddress(jednostka.adres);
						return {
							id: `${jednostka.typ}-${jednostka.id}`,
							position: coordinates,
							iconUrl: getIconUrl(jednostka.typ),
							name: jednostka.nazwa,
							contact: jednostka.numerKontaktowy,
							type: "static",
						};
					})
				);

				// Pobieranie danych o pojazdach
				const policjaResponse = await axios.get(
					"http://localhost:5126/api/Policja"
				);
				const strazPozarnaResponse = await axios.get(
					"http://localhost:5126/api/StrazPozarna"
				);
				const pogotowieResponse = await axios.get(
					"http://localhost:5126/api/Pogotowie"
				);

				const dynamicMarkers = [
					...policjaResponse.data.map((policja) => ({
						id: `policja-${policja.id}`,
						position: [52.237049, 21.017532], // Przyk³adowe wspó³rzêdne
						iconUrl: process.env.PUBLIC_URL + "/radiowoz.png",
						number: policja.numer_Patrolu,
						status: policja.status_Patrolu,
						remarks: policja.uwagi,
						type: "dynamic",
					})),
					...strazPozarnaResponse.data.map((straz) => ({
						id: `straz-${straz.id}`,
						position: [52.237049, 21.017532], // Przyk³adowe wspó³rzêdne
						iconUrl: process.env.PUBLIC_URL + "/wozstraz.png",
						number: straz.numer_Wozu,
						status: straz.status_Wozu,
						remarks: straz.uwagi,
						type: "dynamic",
					})),
					...pogotowieResponse.data.map((pogotowie) => ({
						id: `pogotowie-${pogotowie.id}`,
						position: [52.237049, 21.017532], // Przyk³adowe wspó³rzêdne
						iconUrl: process.env.PUBLIC_URL + "/karetka.png",
						number: pogotowie.numer_Karetki,
						status: pogotowie.status_Karetki,
						remarks: pogotowie.uwagi,
						type: "dynamic",
					})),
				];

				// Po³¹czenie markerów statycznych i dynamicznych
				const allMarkers = [...jednostkiMarkers, ...dynamicMarkers];

				console.log("Fetched and geocoded markers:", allMarkers);
				setMarkers(allMarkers);
			} catch (error) {
				console.error("Failed to fetch and geocode markers:", error);
			}
		};

		fetchAndGeocodeMarkers();
	}, []);

	// Funkcja do aktualizacji pozycji markera
	const updateMarkerPosition = (id, newPosition) => {
		setMarkers((prevMarkers) =>
			prevMarkers.map((marker) =>
				marker.id === id ? { ...marker, position: newPosition } : marker
			)
		);
	};

	// Funkcja do wyboru markera
	const selectMarker = (marker) => {
		setSelectedMarker(marker);
	};

	const geocodeAddress = async (address) => {
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
				params: {
					q: address,
					format: "json",
					addressdetails: 1,
					limit: 1,
				},
			});

			if (response.data.length > 0) {
				const { lat, lon } = response.data[0];
				return [parseFloat(lat), parseFloat(lon)];
			} else {
				throw new Error("No coordinates found for address: " + address);
			}
		} catch (error) {
			console.error("Geocoding error:", error);
			return [52.237049, 21.017532]; // Domyœlnie Warszawa, jeœli geokodowanie nie powiedzie siê
		}
	};

	const getIconUrl = (typ) => {
		switch (typ) {
			case "Komisariat":
				return process.env.PUBLIC_URL + "/komisariat.png";
			case "Remiza":
				return process.env.PUBLIC_URL + "/remiza.png";
			case "Szpital":
				return process.env.PUBLIC_URL + "/szpital.png";
			default:
				return process.env.PUBLIC_URL + "/default.png";
		}
	};

	return (
		<MarkersContext.Provider
			value={{ markers, updateMarkerPosition, selectMarker, selectedMarker }}
		>
			{children}
		</MarkersContext.Provider>
	);
};
