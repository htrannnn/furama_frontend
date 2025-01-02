import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import NavigationComponent from "./components/NavigationComponent";
import { Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import FacilitiesListComponent from "./components/FacilitiesListComponent";
import DetailComponent from "./components/DetailComponent";

function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Routes>
				<Route path={"/homepage_facilitiesList"} element={<FacilitiesListComponent />} />
				<Route path={"/facilitiesList/detail/:id"} element={<DetailComponent />} />
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
