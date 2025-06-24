import "./App.css";
import { Routes, Route } from "react-router-dom";
import DetailComponent from "./components/admin/DetailComponent";
import EditComponent from "./components/admin/EditComponent";
import AddComponent from "./components/admin/AddComponent";
import Homepage from "./components/user/Homepage";
import Introduce from "./components/user/Introduce";
import RoomsComponent from "./components/user/RoomsComponent";
import CulinaryComponent from "./components/user/CulinaryComponent";
import { ToastContainer } from "react-toastify";
import LoginComponent from "./mains/LoginComponent";
import AdminComponent from "./components/admin/AdminComponent";
import HomeLayout from "./layout/HomeLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import BookingList from "./components/admin/BookingList";
import BookingDetail from "./components/admin/BookingDetail";
import AddBooking from "./components/admin/AddBooking";
import EditBooking from "./components/admin/EditBooking";
import CheckComponent from "./components/user/CheckComponent";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route element={<HomeLayout />}>
					<Route index element={<Introduce />} />
					<Route path={"/homepage"} element={<Homepage />} />
					<Route path={"/rooms"} element={<RoomsComponent />} />
					<Route path={"/culinary"} element={<CulinaryComponent />} />
					<Route path={"/room/detail/:id"} element={<DetailComponent />} />
					<Route path={"/room/edit/:id"} element={<EditComponent />} />
					<Route path={"/room/add"} element={<AddComponent />} />
					<Route path={"/booking"} element={<BookingList />} />
					<Route path={"/booking/add/:facilityId"} element={<AddBooking />} />
					<Route path={"/booking/edit/:id"} element={<EditBooking />} />
					<Route path={"/booking/detail/:id"} element={<BookingDetail />} />
					<Route path={"/check_in/:id"} element={<CheckComponent />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path={"/login"} element={<LoginComponent />} />
				</Route>
				<Route element={<AdminLayout />}>
					<Route path={"/admin"} element={<AdminComponent />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
