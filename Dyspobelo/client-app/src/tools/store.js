import { configureStore } from "@reduxjs/toolkit";
import markersReducer from "./markersSlice";

export const store = configureStore({
	reducer: {
		markers: markersReducer,
	},
});
