import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Ratio from "react-bootstrap/Ratio";
import { FaPlayCircle } from "react-icons/fa";

function Homepage() {
	const [lgShow, setLgShow] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div id="titleImg">
				<h1 className="text-center shadow p-3 mt-5 mb-5" id="titleText" style={{ fontFamily: "serif" }}>
					WELCOME TO FURAMA RESORT
				</h1>
			</div>

			<div className="mx-5 mb-5" style={{ marginTop: "100px" }}>
				<Row>
					<Col>
						<h2 className="mb-4 fw-bold" style={{ fontSize: "22px", lineHeight: "35px", fontFamily: "serif", color: "#cbbe73" }}>
							THIS WORLD CLASS RESORT, FURAMA DANANG, REPUTABLE AS THE CULINARY BEACH RESORT IN VIETNAM
						</h2>
						<div className="fw-semibold " style={{ fontSize: "13.5px", lineHeight: "24px", textAlign: "justify" }}>
							<p>
								Overlooking the long stretch of wide white sand on Danang Beach, Furama Resort Danang is a gateway to three World Heritage Sites of
								Hoi An (20 minutes), My Son (90 minutes) and Hue (2 hours). The 196 rooms and suites plus 70 two to four bedroom pool villas feature
								tasteful décor, designed with traditional Vietnamese style and a touch of French colonial architecture and guarantee the Vietnam’s the
								most prestigious resort -counting royalty, presidents, movie stars and international business leaders among its celebrity guests.
							</p>
						</div>

						<div>
							<img src="/images/hpbody.jpg" alt="pool" style={{ width: "100%" }} className="mt-3" />
							<img src="/images/hpcave.jpg" alt="pool" style={{ width: "100%" }} className="mt-3" />
						</div>
					</Col>

					<Col>
						<div className="hover-wrapper" onClick={() => setLgShow(true)}>
							<img src="/images/courtyard.jpg" alt="video" className="hover-image" />

							<button className="play-button">
								<FaPlayCircle />
							</button>
						</div>

						<Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} centered>
							<Modal.Body className="p-0">
								<Ratio aspectRatio="16x9">
									<embed type="image/svg+xml" src="https://www.youtube.com/embed/MzwSoM9EQl4?si=q6YjO8hKGK_YA-x3?autoplay=1" />
								</Ratio>
							</Modal.Body>
						</Modal>

						<div className="fw-semibold mt-3" style={{ fontSize: "13.5px", lineHeight: "24px", textAlign: "justify" }}>
							<p>
								The resort’s culinary experience features a mixture of authentic and locally inspired Vietnamese, Asian, Italian, and other European
								cuisines plus the best-imported steaks. The resort presents guests with varied gastronomic venues – the hip and breezy bar overlooking
								the beach, the exclusive Lagoon pool surrounded by a tropical garden, the true Italian flare offered at the Don Cipriani’s, the
								refined Asian touch at Café Indochine, or the authentic central Vietnam cuisine at the Danaksara. Furama Resort Danang also impresses
								and amuses guests with various fun and exciting programs such as excursions, water sports, diving as well as Spa & Wellness services.
							</p>

							<p>
								With the prime location near the center of Da Nang and convenient international connection to Singapore, Bangkok, Siem Reap, Kuala
								Lumpur, Taiwan, Tokyo, Osaka, Seoul, Busan, Hong Kong – Macau, and China including Beijing, Shanghai, Hangzhou, Guangzhou, Chengdu… by
								direct flights, Furama Resort Danang is the ideal venue for travel agents, enterprises, event organizations. A well-appointed
								Convention Palace can accommodate up to 3,000 people in style, with another ten function rooms for 50 to 300 people. Ariyana
								Convention Centre Danang (ACC) has been built to host the APEC 2017 and connected with Furama Danang’s International Convention Palace
								(ICP) to make it the largest of its kind in Vietnam that can accommodate up to 5,000 guests.
							</p>

							<p>
								A variety of cultural-themed parties on the beach or around the lagoon, in the ballrooms or outside the resort, plus exciting team
								building activities and water sports, pioneering international-standard scuba diving – “Diving Base”, as well as health and beauty
								service, make the Furama Danang the ideal venue for MICE groups.
							</p>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Homepage;
