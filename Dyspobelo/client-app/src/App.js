import "./App.css";
import "./i18n";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/mainScreen";
import AddAnnouncement from "./screens/AddAnnouncement";
import EditAnnouncement from "./screens/EditAnnouncement";
import ShowAnnouncement from "./screens/ShowAnnouncement";
import Settings from "./screens/Settings";
import { MapProvider } from "./context/MapContext";
import "leaflet/dist/leaflet.css";
import { MarkersProvider } from "./context/MarkersContext";
import LoginScreenAnalityk from "./screens/LoginScreenAnalityk";
import AnalitykSettings from "./screens/AnalitykSettings";
import RaportZgloszen from "./components/RaportZgloszen";
import RaportUlic from "./components/RaportUlic";
import Layout from "./components/Layout";

function App() {
	return (
		<MapProvider>
			<MarkersProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/login-analityk" element={<LoginScreenAnalityk />} />
						<Route
							path="/main/*"
							element={
								<Layout mode={"main"}>
									<MainScreen />
								</Layout>
							}
						/>
						<Route
							path="/add-announcement/*"
							element={
								<Layout mode={"add"}>
									<AddAnnouncement />
								</Layout>
							}
						/>
						<Route
							path="/edit-announcement/*"
							element={<Layout mode={"edit"} />}
						/>
						<Route
							path="/show-announcement/*"
							element={<Layout mode={"show"}></Layout>}
						/>
						<Route
							path="/settings/*"
							element={
								<Layout mode={"settings"}>
									<Settings />
								</Layout>
							}
						/>
						<Route path="/" element={<Navigate to="/login" replace />} />
					</Routes>
				</BrowserRouter>
			</MarkersProvider>
		</MapProvider>
	);
}

export default App;
