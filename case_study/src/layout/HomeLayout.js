import { Outlet } from "react-router-dom";
import FooterComponent from "../mains/FooterComponent";
import HeaderComponent from "../mains/HeaderComponent";
import NavigationComponent from "../mains/NavigationComponent";

const HomeLayout = () => {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Outlet />
			<FooterComponent />
		</>
	);
};

export default HomeLayout;
