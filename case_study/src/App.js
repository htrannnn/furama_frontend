import "./App.css";
import { Routes, Route } from "react-router-dom";
import FacilitiesListComponent from "./components/FacilitiesListComponent";
import DetailComponent from "./components/DetailComponent";
import EditComponent from "./components/EditComponent";
import AddComponent from "./components/AddComponent";
import HeaderComponent from "./mains/HeaderComponent";
import FooterComponent from "./mains/FooterComponent";
import NavigationComponent from "./mains/NavigationComponent";
import Homepage from "./components/Homepage";
import Introduce from "./components/Introduce";

function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Routes>
				<Route path={"/"} element={<Introduce />} />
				<Route path={"/homepage"} element={<Homepage />} />
				<Route path={"/rooms"} element={<FacilitiesListComponent />} />
				<Route path={"/facilities/detail/:id"} element={<DetailComponent />} />
				<Route path={"/facilities/edit/:id"} element={<EditComponent />} />
				<Route path={"/facilities/addFacilities"} element={<AddComponent />} />
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
