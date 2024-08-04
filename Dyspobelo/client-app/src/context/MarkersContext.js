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
				const response = await axios.get(
					"http://localhost:5126/api/vehicle/vehicles"
				);
				const fetchedMarkers = response.data.map((item, index) => ({
					id: index,
					position: [52.237049, 21.017532],
					iconUrl: getIconUrl(item.type),
					annType: item.TypZgloszenia,
					address: item.ulica + " " + item.numer_budynku,
					description: item.opis_zdarzenia,
				}));
				console.log("Fetched markers:", fetchedMarkers); // Dodaj logowanie
				setMarkers(fetchedMarkers);
			} catch (error) {
				console.error("Failed to fetch vehicles:", error);
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

	const getIconUrl = (type) => {
		switch (type) {
			case "Policja":
				return process.env.PUBLIC_URL + "/radiowoz.png";
			case "Straz_Pozarna":
				return process.env.PUBLIC_URL + "/wozstraz.png";
			case "Pogotowie":
				return process.env.PUBLIC_URL + "/karetka.png";
			default:
				return process.env.PUBLIC_URL + "/marker.png";
		}
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
