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

export const updateVehicleStatus = async (vehicleId, newStatus) => {
	if (!vehicleId || typeof vehicleId !== "string") {
		console.error("Invalid vehicleId:", vehicleId);
		return;
	}

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
		await axios.patch(url, newStatus, {
			headers: { "Content-Type": "application/json" },
		});
		console.log(`Status of ${vehicleId} updated to ${newStatus}`);
	} catch (error) {
		console.error(`Failed to update status for ${vehicleId}:`, error);
	}
};

const MovingMarkerLogic = forwardRef(({ marker }, ref) => {
	const { updateMarkerPosition } = useContext(MarkersContext);
	const { t } = useTranslation();
	const map = useMap();
	const markerRef = useRef(null);
	const routingControlRef = useRef(null);
	const debugPolylineRef = useRef(null);
	const [destination, setDestination] = useState(null);
	const lastKnownPosition = useRef(marker.position);
	const [currentStatus, setCurrentStatus] = useState(marker.status);

	useImperativeHandle(ref, () => ({
		handleNewReport: (coordinates) => {
			setDestination(coordinates);
			setCurrentStatus("Z");
			initializeRoute(lastKnownPosition.current, coordinates);
		},
	}));

	const clearRouting = () => {
		if (routingControlRef.current) {
			try {
				if (map.hasLayer(routingControlRef.current)) {
					map.removeControl(routingControlRef.current);
				}
			} catch (error) {
				console.error("Failed to remove routing control:", error);
			}
			routingControlRef.current = null;
		}
		if (debugPolylineRef.current) {
			try {
				if (map.hasLayer(debugPolylineRef.current)) {
					map.removeLayer(debugPolylineRef.current);
				}
			} catch (error) {
				console.error("Failed to remove debug polyline:", error);
			}
			debugPolylineRef.current = null;
		}
	};

	useEffect(() => {
		if (!marker || !map) return;

		if (!markerRef.current) {
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
                </div>`
				);
		} else {
			markerRef.current.setLatLng(marker.position);
			markerRef.current.setPopupContent(
				`<div>
                <h2>${t("Jednostka")}: ${marker.number}</h2>
                <p>${t("Stan")}: ${t(currentStatus)}</p>
            </div>`
			);
		}

		const intervalId = setInterval(() => {
			if (currentStatus === "Z" && destination) {
				initializeRoute(lastKnownPosition.current, destination);
			} else if (currentStatus === "A") {
				const newEnd = getRandomCoordinates(lastKnownPosition.current);
				setDestination(newEnd);
				initializeRoute(lastKnownPosition.current, newEnd);
			}
		}, 2000);

		return () => {
			clearInterval(intervalId);
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
			clearRouting();
		};
	}, [map, marker, destination, currentStatus, t]);

	const getRandomCoordinates = (center, range = 50) => {
		const latOffset = ((Math.random() - 0.5) * range) / 111320;
		const lngOffset =
			((Math.random() - 0.5) * range) /
			((40075000 * Math.cos((center[0] * Math.PI) / 180)) / 360);
		return [center[0] + latOffset, center[1] + lngOffset];
	};

	const initializeRoute = (start, end) => {
		clearRouting();

		routingControlRef.current = L.Routing.control({
			waypoints: [L.latLng(start), L.latLng(end)],
			router: L.Routing.mapbox(
				"pk.eyJ1IjoiczIyNTQwIiwiYSI6ImNsdXpwZnVvczB6dzYyam1vMzQ4NnpqZ2sifQ.FUOF_cGUdMx6zorMIiYaQg"
			),
			routeWhileDragging: false,
			show: false,
			addWaypoints: false,
			fitSelectedRoutes: false,
			lineOptions: {
				styles: [
					{
						color: "blue",
						opacity: currentStatus === "Z" ? 1.0 : 0.0,
						weight: 4,
					},
				],
			},
			createMarker: () => null,
		})
			.on("routesfound", (e) => {
				const routes = e.routes[0].coordinates;
				if (currentStatus === "Z") {
					debugPolylineRef.current = L.polyline(routes, { color: "red" }).addTo(
						map
					);
				}

				animateMarker(routes);
			})
			.on("routingerror", (err) => {
				console.error("Routing error occurred:", err);
				setDestination(null);
			})
			.addTo(map);
	};

	const animateMarker = (route) => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < route.length) {
				const { lat, lng } = route[i];
				lastKnownPosition.current = [lat, lng];
				markerRef.current.setLatLng([lat, lng]);
				updateMarkerPosition(marker.id, [lat, lng]);
				i++;
			} else {
				clearInterval(interval);
				if (currentStatus === "Z") {
					console.log(`Pojazd ${marker.id} dotar� na miejsce zg�oszenia.`);
					setDestination(null);
					updateVehicleStatus(marker.id, "A");
					setCurrentStatus("A");
					const newEnd = getRandomCoordinates(lastKnownPosition.current);
					setDestination(newEnd);
				}
			}
		}, 1000);
	};

	return null;
});

export default MovingMarkerLogic;
