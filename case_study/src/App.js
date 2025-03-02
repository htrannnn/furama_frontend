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
import LoginComponent from "./mains/LoginComponent";
import AdminComponent from "./components/AdminComponent";
import HomeLayout from "./layout/HomeLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route element={<HomeLayout />}>
					<Route index element={<Introduce />} />
					<Route path={"/homepage"} element={<Homepage />} />
					<Route path={"/admin"} element={<AdminComponent />} />
					<Route path={"/rooms"} element={<RoomsComponent />} />
					<Route path={"/culinary"} element={<CulinaryComponent />} />
					<Route path={"/room/detail/:id"} element={<DetailComponent />} />
					<Route path={"/room/edit/:id"} element={<EditComponent />} />
					<Route path={"/room/add"} element={<AddComponent />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path={"/login"} element={<LoginComponent />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
