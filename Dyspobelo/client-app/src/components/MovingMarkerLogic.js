import {
	useEffect,
	useRef,
	useContext,
	useState,
	useImperativeHandle,
	forwardRef,
} from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { MarkersContext } from "../context/MarkersContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

const MovingMarkerLogic = forwardRef(({ marker }, ref) => {
	const { updateMarkerPosition } = useContext(MarkersContext);
	const { t } = useTranslation();
	const map = useMap();
	const markerRef = useRef(null);
	const routingControlRef = useRef(null);
	const [destination, setDestination] = useState(null);
	const lastKnownPosition = useRef(marker.position);
	const [currentStatus, setCurrentStatus] = useState(marker.status);

	useImperativeHandle(ref, () => ({
		handleNewReport: (coordinates) => {
			setDestination(coordinates);
		},
	}));

	useEffect(() => {
		if (!marker || !map) return;

		if (!markerRef.current) {
			const remarks = marker.remarks === "Brak uwag" ? t("Brak uwag") : marker.remarks;

			markerRef.current = L.marker(marker.position, {
				icon: L.icon({
					iconUrl: marker.iconUrl,
					iconSize: [40, 40],
					iconAnchor: [20, 20],
				}),
				interactive: true,
			})
				.addTo(map)
				.bindPopup(
					`<div>
						<h2>${t("Jednostka")}: ${marker.number}</h2>
						<p>${t("Stan")}: ${t(currentStatus)}</p>
						<p>${t("Uwagi")}: ${remarks}</p>
					</div>`
				);
		} else {
			markerRef.current.setLatLng(marker.position);
			markerRef.current.setPopupContent(
				`<div>
					<h2>${t("Jednostka")}: ${marker.number}</h2>
					<p>${t("Stan")}: ${t(currentStatus)}</p>
					<p>${t("Uwagi")}: ${marker.remarks}</p>
				</div>`
			);
		}

		const intervalId = setInterval(() => {
			fetchVehicleStatus(marker.id).then((status) => {
				setCurrentStatus(status);
			});
		}, 5000); // sprawdzenie co 5 sekund

		if (destination) {
			initializeRoute(
				lastKnownPosition.current,
				destination,
				markerRef.current,
				routingControlRef,
				map
			);
		} else if (currentStatus === 'A') {
			const end = getRandomCoordinates(lastKnownPosition.current);
			initializeRoute(
				lastKnownPosition.current,
				end,
				markerRef.current,
				routingControlRef,
				map
			);
		}

		return () => {
			clearInterval(intervalId);
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
			if (routingControlRef.current) {
				map.removeControl(routingControlRef.current);
				routingControlRef.current = null;
			}
		};
	}, [map, marker, destination, currentStatus, t]);

	// pobieramy stan pojazdów tylko dla tego ¿eby widaæ by³o zmianê statusów pojazdu
	const fetchVehicleStatus = async (vehicleId) => {
		const [type, id] = vehicleId.split("-");
		let url;

		if (type === "policja") {
			url = `https://dyspobeloapi.azurewebsites.net/api/Policja/${id}`;
		} else if (type === "straz") {
			url = `https://dyspobeloapi.azurewebsites.net/api/StrazPozarna/${id}`;
		} else if (type === "pogotowie") {
			url = `https://dyspobeloapi.azurewebsites.net/api/Pogotowie/${id}`;
		}

		try {
			const response = await axios.get(url);
			return response.data.status_Patrolu || response.data.status_Wozu || response.data.status_Karetki;
		} catch (error) {
			console.error(`Failed to fetch status for ${vehicleId}:`, error);
			return null;
		}
	};

	const getRandomCoordinates = (center, range = 500) => {
		const latOffset = ((Math.random() - 0.5) * range) / 111320;
		const lngOffset =
			((Math.random() - 0.5) * range) /
			((40075000 * Math.cos((center[0] * Math.PI) / 180)) / 360);
		return [center[0] + latOffset, center[1] + lngOffset];
	};

	const initializeRoute = (start, end, marker, routingControlRef, map) => {
		if (routingControlRef.current) {
			map.removeControl(routingControlRef.current);
			routingControlRef.current = null;
		}

		routingControlRef.current = L.Routing.control({
			waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
			router: L.Routing.mapbox(
				"pk.eyJ1IjoiczIyNTQwIiwiYSI6ImNsdXpwZnVvczB6dzYyam1vMzQ4NnpqZ2sifQ.FUOF_cGUdMx6zorMIiYaQg"
			),
			routeWhileDragging: false,
			show: false,
			addWaypoints: false,
			lineOptions: {
				styles: [{ color: "blue", opacity: 0.4, weight: 4 }],
			},
			createMarker: () => null,
		})
			.on("routesfound", (e) => {
				const routes = e.routes[0].coordinates;
				animateMarker(routes, marker, routingControlRef, map);
			})
			.on("routingerror", (err) => {
				console.error("Routing error occurred:", err);
			})
			.addTo(map);
	};

	const animateMarker = (route, marker, routingControlRef, map) => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < route.length) {
				const { lat, lng } = route[i];
				lastKnownPosition.current = [lat, lng];
				marker.setLatLng([lat, lng]);
				updateMarkerPosition(marker.id, [lat, lng]);
				i++;
			} else {
				clearInterval(interval);

				const [lat, lng] = lastKnownPosition.current;

				if (destination) {
					initializeRoute(
						[lat, lng],
						destination,
						marker,
						routingControlRef,
						map
					);
					setDestination(null);
				} else if (currentStatus === 'A') {
					const newEnd = getRandomCoordinates([lat, lng]);
					initializeRoute([lat, lng], newEnd, marker, routingControlRef, map);
				}
			}
		}, 1000);
	};

	return null;
});

export default MovingMarkerLogic;