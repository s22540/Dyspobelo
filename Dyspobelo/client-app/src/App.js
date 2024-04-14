import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/login";
import MainScreen from "./screens/mainScreen";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/main" element={<MainScreen />} />
				<Route path="/" element={<Navigate to="/login" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
