import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMarkers } from "../tools/markersSlice";

const MarkersLoader = () => {
	const dispatch = useDispatch();

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
				dispatch(setMarkers(fetchedMarkers));
			} catch (error) {
				console.error("Failed to fetch vehicles:", error);
			}
		};

		fetchMarkers();
	}, [dispatch]);

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

	return null;
};

export default MarkersLoader;
