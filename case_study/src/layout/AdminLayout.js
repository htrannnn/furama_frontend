import { Outlet } from "react-router-dom";
import HeaderComponent from "../mains/HeaderComponent";
import FooterComponent from "../mains/FooterComponent";

const AdminLayout = () => {
	return (
		<>
			<HeaderComponent />
			<Outlet />
			<FooterComponent />
		</>
	);
};

export default AdminLayout;
