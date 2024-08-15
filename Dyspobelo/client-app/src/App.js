import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/mainScreen";
import AddAnnouncement from "./screens/AddAnnouncement";
import EditAnnouncement from "./screens/EditAnnouncement";
import ShowAnnouncement from "./screens/ShowAnnouncement";
import Settings from "./screens/Settings";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import { store } from "../src/tools/store";
import { MarkersProvider } from "./context/MarkersContext";
import Layout from "./components/Layout";
import LoginScreenAnalityk from "./screens/LoginScreenAnalityk";

function App() {
	return (
		<Provider store={store}>
			<MarkersProvider>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path="/login" element={<LoginScreen />} />
							<Route path="/login-analityk" element={<LoginScreenAnalityk />} />
							<Route path="/main/*" element={<MainScreen />} />
							<Route path="/add-announcement" element={<AddAnnouncement />} />
							<Route path="/edit-announcement" element={<EditAnnouncement />} />
							<Route path="/show-announcement" element={<ShowAnnouncement />} />
							<Route path="/settings/*" element={<Settings />} />
							<Route path="/" element={<Navigate to="/login" replace />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</MarkersProvider>
		</Provider>
	);
}
export default App;
