import "./App.css";
import { Routes, Route } from "react-router-dom";
import DetailComponent from "./components/DetailComponent";
import EditComponent from "./components/EditComponent";
import AddComponent from "./components/AddComponent";
import HeaderComponent from "./mains/HeaderComponent";
import FooterComponent from "./mains/FooterComponent";
import NavigationComponent from "./mains/NavigationComponent";
import Homepage from "./components/Homepage";
import Introduce from "./components/Introduce";
import RoomsComponent from "./components/RoomsComponent";
import CulinaryComponent from "./components/CulinaryComponent";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<ToastContainer />
			<Routes>
				<Route path={"/"} element={<Introduce />} />
				<Route path={"/homepage"} element={<Homepage />} />
				<Route path={"/rooms"} element={<RoomsComponent />} />
				<Route path={"/culinary"} element={<CulinaryComponent />} />
				<Route path={"/room/detail/:id"} element={<DetailComponent />} />
				<Route path={"/room/edit/:id"} element={<EditComponent />} />
				<Route path={"/room/add"} element={<AddComponent />} />
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
