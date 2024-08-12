import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { MarkersContext } from "../context/MarkersContext";

const MovingMarkerLogic = ({ marker }) => {
    const { updateMarkerPosition } = useContext(MarkersContext);
    const map = useMap();
    const markerRef = useRef(null);
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!marker || !map) return;

        console.log('Marker Data:', marker);

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
                        <h2>Jednostka: ${marker.number}</h2>
                        <p>Status: ${marker.status}</p>
                        <p>Uwagi: ${marker.remarks}</p>
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

        const end = getRandomCoordinates(marker.position);
        initializeRoute(
            marker.position,
            end,
            markerRef.current,
            routingControlRef,
            map
        );

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
    }, [map, marker]);

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
                styles: [{ color: "transparent", opacity: 0 }],
            },
            createMarker: () => null,
        })
            .on("routesfound", (e) => {
                const routes = e.routes[0].coordinates;
                animateMarker(routes, marker, routingControlRef, map);
            })
            .addTo(map);
    };

    const animateMarker = (route, marker, routingControlRef, map) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < route.length) {
                const { lat, lng } = route[i];
                marker.setLatLng([lat, lng]);
                updateMarkerPosition(marker.id, [lat, lng]);
                if (i === route.length - 1) {
                    const newEnd = getRandomCoordinates([lat, lng]);
                    initializeRoute([lat, lng], newEnd, marker, routingControlRef, map);
                }
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    return null;
};

export default MovingMarkerLogic;