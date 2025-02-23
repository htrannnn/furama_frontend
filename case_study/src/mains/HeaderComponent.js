//đã import react-router, bootstrap, axios
import React from "react";
import { Link } from "react-router-dom";

function HeaderComponent() {
	return (
		<div className="container">
			<header className="d-flex flex-wrap justify-content-center py-3 border-bottom">
				<a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
					<svg className="bi me-2" width={40} height={32}>
						<use xlinkHref="#bootstrap" />
					</svg>
					<span className="fs-4">
						<img src="/images/Logo.png" alt="logo" className="imgLogo" />
					</span>
				</a>

				<ul className="nav nav-pills mt-3">
					<li className="nav-item">
						<Link className="nav-link" id="headerSupport">
							Support
						</Link>
					</li>
					<li className="nav-item">
						<Link className="btn btn" id="headerButton">
							Sign in
						</Link>
					</li>
				</ul>
			</header>
		</div>
	);
}

export default HeaderComponent;
