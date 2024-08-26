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

const MovingMarkerLogic = forwardRef(({ marker }, ref) => {
	const { updateMarkerPosition } = useContext(MarkersContext);
	const { t } = useTranslation();
	const map = useMap();
	const markerRef = useRef(null);
	const routingControlRef = useRef(null);
	const [destination, setDestination] = useState(null);
	const lastKnownPosition = useRef(marker.position);

	useImperativeHandle(ref, () => ({
		handleNewReport: (coordinates, vehicleId) => {
			setDestination(coordinates);
		},
	}));

	useEffect(() => {
		if (!marker || !map) return;

		if (!markerRef.current) {
			const remarks =
				marker.remarks === "Brak uwag" ? t("Brak uwag") : marker.remarks;

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
                        <p>${t("Stan")}: ${t(marker.status)}</p>
                        <p>${t("Uwagi")}: ${remarks}</p>
                    </div>`
				)
				.on("mouseover", (event) => {
					const leafletMarker = event.target;
					if (!leafletMarker.getPopup().isOpen()) {
						leafletMarker.openPopup();
					}
				})
				.on("mouseout", (event) => {
					const leafletMarker = event.target;
					if (leafletMarker.getPopup().isOpen()) {
						leafletMarker.closePopup();
					}
				});
		} else {
			markerRef.current.setLatLng(marker.position);
		}

		if (destination) {
			initializeRoute(
				lastKnownPosition.current,
				destination,
				markerRef.current,
				routingControlRef,
				map
			);
		} else {
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
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
			if (routingControlRef.current) {
				map.removeControl(routingControlRef.current);
				routingControlRef.current = null;
			}
		};
	}, [map, marker, destination, t]);

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
				} else {
					const newEnd = getRandomCoordinates([lat, lng]);
					initializeRoute([lat, lng], newEnd, marker, routingControlRef, map);
				}
			}
		}, 1000);
	};

	return null;
});

export default MovingMarkerLogic;
