import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const MarkersContext = createContext();

export const useMarkers = () => {
	return useContext(MarkersContext);
};

export const MarkersProvider = ({ children }) => {
	const [markers, setMarkers] = useState([]);
	const [selectedMarker, setSelectedMarker] = useState(null);

	// Tablice na dane pojazdów
	const [policjaData, setPolicjaData] = useState([]);
	const [strazPozarnaData, setStrazPozarnaData] = useState([]);
	const [pogotowieData, setPogotowieData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jednostkiResponse = await axios.get(
					"https://dyspobeloapi.azurewebsites.net/api/Jednostki"
				);
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

				const policjaResponse = await axios.get(
					"https://dyspobeloapi.azurewebsites.net/api/Policja"
				);
				const strazPozarnaResponse = await axios.get(
					"https://dyspobeloapi.azurewebsites.net/api/StrazPozarna"
				);
				const pogotowieResponse = await axios.get(
					"https://dyspobeloapi.azurewebsites.net/api/Pogotowie"
				);

				// Ustawianie danych pojazdów
				setPolicjaData(policjaResponse.data);
				setStrazPozarnaData(strazPozarnaResponse.data);
				setPogotowieData(pogotowieResponse.data);

				// Tworzenie markerów
				const dynamicMarkers = [
					...policjaResponse.data.map((policja) => ({
						id: `policja-${policja.id}`,
						position: [52.31334657982878, 20.963226080840816],
						iconUrl: process.env.PUBLIC_URL + "/radiowoz.png",
						number: policja.numer_Patrolu,
						status: policja.status_Patrolu,
						remarks: policja.uwagi,
						type: "dynamic",
					})),
					...strazPozarnaResponse.data.map((straz) => ({
						id: `straz-${straz.id}`,
						position: [52.23502490562511, 20.913809239927748],
						iconUrl: process.env.PUBLIC_URL + "/wozstraz.png",
						number: straz.numer_Wozu,
						status: straz.status_Wozu,
						remarks: straz.uwagi,
						type: "dynamic",
					})),
					...pogotowieResponse.data.map((pogotowie) => ({
						id: `pogotowie-${pogotowie.id}`,
						position: [52.28741134469457, 20.951918268687976],
						iconUrl: process.env.PUBLIC_URL + "/karetka.png",
						number: pogotowie.numer_Karetki,
						status: pogotowie.status_Karetki,
						remarks: pogotowie.uwagi,
						type: "dynamic",
					})),
				];

				const allMarkers = [...jednostkiMarkers, ...dynamicMarkers];

				console.log("Markers created:", allMarkers);
				setMarkers(allMarkers);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
	}, []);

	const updateMarkerPosition = (id, newPosition) => {
		setMarkers((prevMarkers) =>
			prevMarkers.map((marker) =>
				marker.id === id ? { ...marker, position: newPosition } : marker
			)
		);
	};

	const selectMarker = (marker) => {
		setSelectedMarker(marker);
	};

	const geocodeAddress = async (address) => {
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
				params: {
					street: address,
					format: "json",
					addressdetails: 1,
					limit: 1,
					city: "Warszawa",
					country: "Poland"
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
			return [52.237049, 21.017532];
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

	const fetchVehicleData = async () => {
		try {
			const policjaResponse = await axios.get(
				"https://dyspobeloapi.azurewebsites.net/api/Policja"
			);
			const strazPozarnaResponse = await axios.get(
				"https://dyspobeloapi.azurewebsites.net/api/StrazPozarna"
			);
			const pogotowieResponse = await axios.get(
				"https://dyspobeloapi.azurewebsites.net/api/Pogotowie"
			);

			setPolicjaData(policjaResponse.data);
			setStrazPozarnaData(strazPozarnaResponse.data);
			setPogotowieData(pogotowieResponse.data);
		} catch (error) {
			console.error("Failed to fetch vehicle data:", error);
		}
	};

	return (
		<MarkersContext.Provider
			value={{
				markers,
				updateMarkerPosition,
				selectMarker,
				selectedMarker,
				policjaData,
				strazPozarnaData,
				pogotowieData,
				fetchVehicleData
			}}
		>
			{children}
		</MarkersContext.Provider>
	);
};