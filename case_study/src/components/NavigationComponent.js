import React from "react";
import { Link } from "react-router-dom";

function NavigationComponent() {
	return (
		<div id="container">
			<nav className="d-flex justify-content-center py-3" style={{ height: 543 }}>
				<ul className="nav">
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page" to="/homepage_facilitiesList">
							The Furama
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page">
							Villa
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">House</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">Room</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">Services</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">About Us</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavigationComponent;
