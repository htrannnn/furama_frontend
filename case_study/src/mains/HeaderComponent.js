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
		<div className="container">
			<header className="d-flex flex-wrap justify-content-center py-3 border-bottom">
				<NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
					<svg className="bi me-2" width={40} height={32}>
						<use xlinkHref="#bootstrap" />
					</svg>
					<span className="fs-4">
						<img src="/images/Logo.png" alt="logo" className="imgLogo" />
					</span>
				</NavLink>

				<ul className="nav nav-pills mt-3">
					<li className="nav-item">
						<Link className="nav-link" id="headerSupport">
							Support
						</Link>
					</li>
					{!account && (
						<li className="nav-item">
							<Link className="btn btn" id="headerButton" to="/login">
								Sign in
							</Link>
						</li>
					)}
				</ul>

				{account && (
					<ul className="nav nav-pills mt-3">
						<li className="nav-item me-3">
							<img src={account?.avatar} alt="avatar" roundedCircle width={40} height={40}></img>
						</li>
						<li className="nav-item">
							<div className="btn btn" id="logoutButton" onClick={handleLogout}>
								Logout
							</div>
						</li>
					</ul>
				)}
			</header>
		</div>
	);
}

export default HeaderComponent;
