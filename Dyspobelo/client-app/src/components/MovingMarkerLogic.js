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
import EventEmitter from "eventemitter3";

const emitter = new EventEmitter();

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
		emitter.emit(
			"log",
			`Status pojazdu ${vehicleId} zaktualizowano na: ${newStatus}`
		);
	} catch (error) {
		console.error(`Failed to update status for ${vehicleId}:`, error);
		emitter.emit(
			"log",
			`Nie udało się zaktualizować statusu dla: ${vehicleId}:`,
			error
		);
	}
};

export const LogDisplay = () => {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const handleNewLog = (message) => {
			setLogs((prevLogs) => [...prevLogs, message]);
		};

		emitter.on("log", handleNewLog);

		return () => {
			emitter.off("log", handleNewLog);
		};
	}, []);

	return (
		<div
			style={{
				height: "150px",
				width: "100%",
				backgroundColor: "#f0f0f0",
				marginTop: "20px",
				marginRight: "10px",
				marginLeft: "10px",
				padding: "10px",
				overflowY: "scroll",
			}}
		>
			{logs.map((log, index) => (
				<div key={index}>{log}</div>
			))}
		</div>
	);
};

const fetchVehicleStatus = async (vehicleId) => {
	if (!vehicleId || typeof vehicleId !== "string") {
		console.error("Invalid vehicleId:", vehicleId);
		return;
	}

	const [type, id] = vehicleId.split("-");
	let url;

	switch (type) {
		case "policja":
			url = `https://dyspobeloapi.azurewebsites.net/api/Policja/${id}`;
			break;
		case "straz":
			url = `https://dyspobeloapi.azurewebsites.net/api/StrazPozarna/${id}`;
			break;
		case "pogotowie":
			url = `https://dyspobeloapi.azurewebsites.net/api/Pogotowie/${id}`;
			break;
		default:
			return;
	}

	try {
		const response = await axios.get(url);
		const updatedStatus =
			response.data.status_Patrolu ||
			response.data.status_Wozu ||
			response.data.status_Karetki;
		return updatedStatus;
	} catch (error) {
		return null;
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
			clearRouting();
			setDestination(coordinates);
			setCurrentStatus("Z");
			initializeRoute(lastKnownPosition.current, coordinates, true);
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

		const intervalIdFetch = setInterval(async () => {
			const updatedStatus = await fetchVehicleStatus(marker.id);
			if (updatedStatus) {
				setCurrentStatus(updatedStatus);
			}
		}, 5000);

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
				initializeRoute(lastKnownPosition.current, destination, false);
				map.invalidateSize();
			} else if (currentStatus === "A") {
				const newEnd = getRandomCoordinates(lastKnownPosition.current);
				setDestination(newEnd);
				initializeRoute(lastKnownPosition.current, newEnd, false);
				map.invalidateSize();
			}
		}, 2000);

		return () => {
			clearInterval(intervalId);
			clearInterval(intervalIdFetch);
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

	const initializeRoute = async (start, end, report) => {
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
						opacity: report === true ? 0.0 : 0.0,
						weight: 0,
						addWaypoints: false,
					},
				],
				missingRouteStyles: [
					{
						color: "transparent"
					}
				]
			},
			createMarker: () => null,
		})
			.on("routesfound", (e) => {
				const routes = e.routes[0].coordinates;
				if (report === true) {
					animateIncidentMarker(routes);
				} else {
					animateMarker(routes);
				}
			})
			.on("routingerror", (err) => {
				console.error("Routing error occurred:", err);
				setDestination(null);
			})
			.addTo(map);

		map.invalidateSize();
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
					console.log(`Pojazd ${marker.id} dotarł na miejsce zgłoszenia.`);
					emitter.emit(
						"log",
						`Pojazd ${marker.id} dotarł na miejsce zgłoszenia.`
					);
					setDestination(null);
					updateVehicleStatus(marker.id, "A");
					setCurrentStatus("A");
					const newEnd = getRandomCoordinates(lastKnownPosition.current);
					setDestination(newEnd);
				}
			}
		}, 1000);
	};

	const animateIncidentMarker = (route) => {
		let i = 0;
		let remainingRoute = [...route];

		let polyline = L.polyline(route, {
			color: "red",
			weight: 2,
			opacity: 0.8,
		}).addTo(map);

		const interval = setInterval(() => {
			if (i < route.length) {
				const { lat, lng } = route[i];
				lastKnownPosition.current = [lat, lng];
				markerRef.current.setLatLng([lat, lng]);
				updateMarkerPosition(marker.id, [lat, lng]);

				remainingRoute = remainingRoute.slice(1);
				polyline.setLatLngs(remainingRoute);

				i++;
			} else {
				clearInterval(interval);
				if (currentStatus === "Z") {
					console.log(`Pojazd ${marker.id} dotarł na miejsce zgłoszenia.`);
					emitter.emit(
						"log",
						`Pojazd ${marker.id} dotarł na miejsce zgłoszenia.`
					);
					setDestination(null);
					updateVehicleStatus(marker.id, "A");
					emitter.emit("log", `Pojazd ${marker.id} zmienił status na Aktywny.`);
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
