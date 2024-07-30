// import { createSlice } from "@reduxjs/toolkit";

// const markersSlice = createSlice({
// 	name: "markers",
// 	initialState: {
// 		markers: [],
// 		selectedMarker: null,
// 	},
// 	reducers: {
// 		setMarkers: (state, action) => {
// 			state.markers = action.payload;
// 		},
// 		updateMarkerPosition: (state, action) => {
// 			const { id, newPosition } = action.payload;
// 			const marker = state.markers.find((marker) => marker.id === id);
// 			if (marker) {
// 				marker.position = newPosition;
// 			}
// 		},
// 		selectMarker: (state, action) => {
// 			state.selectedMarker = action.payload;
// 		},
// 	},
// });

// export const { setMarkers, updateMarkerPosition, selectMarker } =
// 	markersSlice.actions;

// export default markersSlice.reducer;
