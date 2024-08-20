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
		const fetchMarkers = async () => {
			try {
				const policjaResponse = await axios.get(
					"http://localhost:5126/api/Policja"
				);
				const strazPozarnaResponse = await axios.get(
					"http://localhost:5126/api/StrazPozarna"
				);
				const pogotowieResponse = await axios.get(
					"http://localhost:5126/api/Pogotowie"
				);

				const policjaMarkers = policjaResponse.data.map((policja) => ({
					id: `policja-${policja.id}`,
					position: [52.237049, 21.017532],
					iconUrl: process.env.PUBLIC_URL + "/radiowoz.png",
					number: policja.numer_Patrolu,
					status: policja.status_Patrolu,
					remarks: policja.uwagi,
				}));

				const strazPozarnaMarkers = strazPozarnaResponse.data.map((straz) => ({
					id: `straz-${straz.id}`,
					position: [52.237049, 21.017532],
					iconUrl: process.env.PUBLIC_URL + "/wozstraz.png",
					number: straz.numer_Wozu,
					status: straz.status_Wozu,
					remarks: straz.uwagi,
				}));

				const pogotowieMarkers = pogotowieResponse.data.map((pogotowie) => ({
					id: `pogotowie-${pogotowie.id}`,
					position: [52.237049, 21.017532],
					iconUrl: process.env.PUBLIC_URL + "/karetka.png",
					number: pogotowie.numer_Karetki,
					status: pogotowie.status_Karetki,
					remarks: pogotowie.uwagi,
				}));

				const allMarkers = [
					...policjaMarkers,
					...strazPozarnaMarkers,
					...pogotowieMarkers,
				];

				console.log("Fetched markers:", allMarkers);
				setMarkers(allMarkers);
			} catch (error) {
				console.error("Failed to fetch markers:", error);
			}
		};

		fetchMarkers();
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

	return (
		<MarkersContext.Provider
			value={{ markers, updateMarkerPosition, selectMarker, selectedMarker }}
		>
			{children}
		</MarkersContext.Provider>
	);
};
