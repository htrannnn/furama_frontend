import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Ratio from "react-bootstrap/Ratio";
import { FaLocationDot } from "react-icons/fa6";

function FooterComponent() {
	const [showMap, setShowMap] = useState(false);

	return (
		<>
			<div className="d-flex " id="footerContainer" style={{ width: "100%", backgroundColor: " #addccf" }}>
				<div
					className="pb-3"
					style={{ width: "35%", backgroundColor: "#f3f3f3", marginLeft: "40px", paddingTop: "60px", paddingLeft: "40px" }}
					id="footerLeft"
				>
					<div>
						<h2 className=" fw-bold" style={{ color: "#cbbe73", fontFamily: "serif" }}>
							How to Get to Us
						</h2>
						<p className="fw-semibold" style={{ width: "80%", fontSize: "14px", lineHeight: "25px" }}>
							Furama is a premier base for exploring one of Asia’s most exciting new destinations. Just a short drive from Danang lay four
							UNESCO-listed World Heritage Sites:
						</p>

						<div>
							<button className="btn rounded-0" id="btnMap" onClick={() => setShowMap(true)}>
								<FaLocationDot className="mb-1" /> View us on Map
							</button>
						</div>
						<Modal size="lg" show={showMap} onHide={() => setShowMap(false)} centered>
							<Modal.Body className="p-0">
								<Ratio aspectRatio="16x9">
									<embed
										type="image/svg+xml"
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.491772899406!2d108.24849317328083!3d16.039950740224743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420fdbc8cc38ef%3A0x9a6a3e31121225d2!2sFurama%20Resort%20Danang!5e0!3m2!1svi!2s!4v1740303501831!5m2!1svi!2s"
									/>
								</Ratio>
							</Modal.Body>
						</Modal>
					</div>

					<div className="mt-4">
						<h5 className="fw-semibold" style={{ lineHeight: "25px", fontFamily: "serif", color: "#cbbe73" }}>
							Local Places
						</h5>
						<table className="localTableFooter">
							<tbody className="fw-semibold" style={{ fontSize: "15px", lineHeight: "22px" }}>
								<tr>
									<td>1. The former imperial city of HUE</td>
									<td className="text-end" style={{ color: "#949494" }}>
										<span>2 hours</span>
									</td>
								</tr>
								<tr>
									<td>2. The ancient Hoi An </td>
									<td className="text-end" style={{ color: "#949494" }}>
										<span>30 minutes</span>
									</td>
								</tr>
								<tr>
									<td>3. Champa civilization, My Son</td>
									<td className="text-end" style={{ color: "#949494" }}>
										<span>90 minutes</span>
									</td>
								</tr>
								<tr>
									<td>4. Phong Nha Caves</td>
									<td className="text-end" style={{ color: "#949494" }}>
										<span>3 hours</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div id="footerRight" style={{ width: "65%", paddingTop: "60px", paddingLeft: "30px" }}>
					<div className="d-flex justify-content-around">
						<div className="footer-column">
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

						<div className="footer-column">
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

						<div className="footer-column">
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
					</div>

					<div className="py-4 mx-4 my-4 border-top">
						<div className="mb-5">
							<img src="/images/Logo.png" alt="logo" className="mt-4" style={{ width: 250 }} id="footerLogo" />
						</div>
						<p>© 28/01/2024 The Furama, Inc. All rights reserved.</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default FooterComponent;
