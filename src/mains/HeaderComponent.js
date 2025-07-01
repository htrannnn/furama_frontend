import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/accountAction";

function HeaderComponent() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const account = useSelector((state) => state?.account?.account);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<div className="container" id="header">
			<header className="d-flex justify-content-between align-items-center py-3 border-bottom flex-wrap">
				<div className="d-flex align-items-center">
					<NavLink to="/" className="text-dark text-decoration-none">
						<img src="/images/Logo.png" alt="logo" className="imgLogo" />
					</NavLink>
				</div>

				<div className="d-flex align-items-center gap-3" id="headerControls">
					<Link className="nav-link" id="headerSupport">
						Support
					</Link>
					{!account ? (
						<Link className="btn btn-outline-dark" id="headerButton" to="/login">
							Login
						</Link>
					) : (
						<>
							<img src={account?.avatar} alt="avatar" width={40} height={40} className="rounded-circle" />
							<div className="btn btn-outline-dark" id="logoutButton" onClick={handleLogout}>
								Logout
							</div>
						</>
					)}
				</div>
			</header>
		</div>
	);
}

export default HeaderComponent;
