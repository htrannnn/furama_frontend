import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import NavigationComponent from "./components/NavigationComponent";
import { Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import FacilitiesListComponent from "./components/FacilitiesListComponent";

function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Routes>
				<Route path={"/homepage_facilitiesList"} element={<FacilitiesListComponent />} />
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
