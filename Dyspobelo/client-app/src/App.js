import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/login";
import MainScreen from "./screens/mainScreen";
import AddAnnouncement from "./screens/AddAnnouncement";
import EditAnnouncement from "./screens/EditAnnouncement";
// import ShowAnnouncement from "./screens/ShowAnnouncement";
import Settings from "./screens/Settings";
import 'leaflet/dist/leaflet.css';
import { MarkersProvider } from "./context/MarkersContext";

function App() {
	return (
		<BrowserRouter>
			<MarkersProvider>
			<Routes>
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/main" element={<MainScreen />} />
				<Route path="/add-announcement" element={<AddAnnouncement />} />
				<Route path="/edit-announcement" element={<EditAnnouncement />} />
				{/*<Route path="/show-announcement" element={<ShowAnnouncement />} />*/}
				<Route path="/settings" element={<Settings />} /> 
				<Route path="/" element={<Navigate to="/login" replace />} />
				</Routes>
			</MarkersProvider>
		</BrowserRouter>
	);
}
export default App;
