import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
	const [mapState, setMapState] = useState({
		//center: [52.237049, 21.017532],
		//zoom: 13,
		markers: [],
		routes: [],
	});

	const updateMarkerPosition = (id, newPosition) => {
		setMapState((prevState) => ({
			...prevState,
			markers: prevState.markers.map((marker) =>
				marker.id === id ? { ...marker, position: newPosition } : marker
			),
		}));
	};

	return (
		<MapContext.Provider
			value={{ mapState, setMapState, updateMarkerPosition }}
		>
			{children}
		</MapContext.Provider>
	);
};

export const useMap = () => useContext(MapContext);
