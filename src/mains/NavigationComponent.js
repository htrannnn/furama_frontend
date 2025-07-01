import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavigationComponent() {
	const [isSticky, setIsSticky] = useState(false);

	const account = useSelector((state) => state?.account?.account);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 95) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div>
			<nav className={`d-flex justify-content-center w-100 py-3 ${isSticky ? "navbar-sticky" : "navbar-normal"}`}>
				<ul className="nav fw-semibold" id="navbar">
					{account && (
						<li className="nav-item">
							<Link className="nav-link text-white" to="/admin">
								Admin
							</Link>
						</li>
					)}
					{account?.role !== "ADMIN" && (
						<>
							<li className="nav-item">
								<Link className="nav-link text-white" to="/homepage">
									The Furama
								</Link>
							</li>
						</>
					)}
					<li className="nav-item">
						<Link className="nav-link text-white" to="/rooms">
							Rooms & suites
						</Link>
					</li>
					{account?.role !== "ADMIN" && (
						<>
							<li className="nav-item">
								<Link className="nav-link text-white" to="/culinary">
									Culinary
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-white" to="/about">
									About Us
								</Link>
							</li>
						</>
					)}
					{account && (
						<li className="nav-item">
							<Link className="nav-link text-white" to="/booking">
								Booking
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

export default NavigationComponent;
