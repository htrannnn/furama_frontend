import React from "react";
import Logo from "../Logo.png";

function FooterComponent() {
	return (
		<div className="container border-top mt-4">
			<footer className="py-5">
				<div className="row">
					<div className="col-2">
						<h5>Company</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Travel Guides
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Resort
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									FAQs
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									About Us
								</a>
							</li>
						</ul>
					</div>
					<div className="col-2">
						<h5>Contact</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Phone
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Email
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Social Media
								</a>
							</li>
						</ul>
					</div>
					<div className="col-2">
						<h5>Support</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Privacy Policy
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Terms & Condition
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Features
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Careers
								</a>
							</li>
						</ul>
					</div>
					<div className="col-4 offset-1">
						<img src={Logo} alt="logo" className="mt-4 float-end" style={{ width: 250 }} />
					</div>
				</div>
				<div className="d-flex justify-content-between py-4 my-4 border-top">
					<p>© 28/01/2024 The Furama, Inc. All rights reserved.</p>
					<ul className="list-unstyled d-flex">
						<li className="ms-3">
							<a className="link-dark" href="#">
								<svg className="bi" width={24} height={24}>
									<use xlinkHref="#twitter" />
								</svg>
							</a>
						</li>
						<li className="ms-3">
							<a className="link-dark" href="#">
								<svg className="bi" width={24} height={24}>
									<use xlinkHref="#instagram" />
								</svg>
							</a>
						</li>
						<li className="ms-3">
							<a className="link-dark" href="#">
								<svg className="bi" width={24} height={24}>
									<use xlinkHref="#facebook" />
								</svg>
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	);
}

export default FooterComponent;
