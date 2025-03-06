import React, { useEffect, useState } from "react";
import AutoSlider from "./AutoSlider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Ratio from "react-bootstrap/Ratio";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FaKey } from "react-icons/fa";
import { FaCocktail } from "react-icons/fa";

function Introduce() {
	const [lgShow, setLgShow] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div>
				<AutoSlider />
			</div>

			<div className="mx-5 mt-5">
				<Row>
					<Col>
						<h2 className="fw-bold" style={{ fontSize: "22px", lineHeight: "35px", fontFamily: "serif", color: "#cbbe73" }}>
							THIS WORLD CLASS RESORT, FURAMA DANANG, REPUTABLE FOR BEING A CULINARY RESORT IN VIETNAM
						</h2>
					</Col>
					<Col>
						<div className="hover-wrapper" onClick={() => setLgShow(true)}>
							<img src="/images/exterior-beach.jpg" alt="video" className="hover-image" />

							<button className="play-button">
								<FaPlayCircle />
							</button>
						</div>

						<Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} centered>
							<Modal.Body className="p-0">
								<Ratio aspectRatio="16x9">
									<embed type="image/svg+xml" src="https://www.youtube.com/embed/Z6_JZ8Ao6-c?si=bM9PTpXKQ8M27mRd?autoplay=1" />
								</Ratio>
							</Modal.Body>
						</Modal>
					</Col>
					<Col>
						<p className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
							Overlooking the long stretch of wide white sand on Danang Beach, Furama Resort Danang is a gateway to three World Heritage Sites of Hoi
							An (20 minutes), My Son (90 minutes) and Hue (2 hours). The 198 rooms and suites plus 70 two to four bedroom pool villas feature
							tasteful décor, designed with traditional Vietnamese style and a touch of French colonial architecture and guarantee the Vietnam’s the
							most prestigious resort -counting royalty, presidents, movie stars and international business leaders among its celebrity guests.
						</p>
					</Col>
				</Row>
			</div>

			<div className="mt-4 pb-5" style={{ backgroundColor: "#f3f3f3" }}>
				<div className="pt-5">
					<h3 className="text-center" style={{ color: "#cbbe73" }}>
						OFFERS & DEAL
					</h3>
				</div>
				<div className="d-flex justify-content-center mt-4" style={{ gap: "60px" }}>
					<Card style={{ width: "40%", backgroundColor: "transparent", border: "none" }}>
						<Card.Img variant="top" src="/images/room-promotion.jpg" className="rounded-2" />
						<div className="border-top mt-3"></div>
						<div className="mt-3">
							<Card.Text className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								Being Vietnam’s most prestigious resort, Furama Resort Danang is proud to serve thousands of visitors every year. Explore our
								promotion offers for resort room and plan your vacation with us!
							</Card.Text>
							<Link
								className="btn d-flex align-items-center justify-content-center"
								id="btnRoom"
								style={{ width: "100%", height: "50px" }}
								to="/rooms"
							>
								<FaKey className="me-2 mt-1" /> Resort Room Promotion
							</Link>
						</div>
					</Card>

					<Card style={{ width: "40%", backgroundColor: "transparent", border: "none" }}>
						<Card.Img variant="top" src="/images/culinary-promotion.jpg" className="rounded-2" />
						<div className="border-top mt-3"></div>
						<div className="mt-3">
							<Card.Text className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								The resort presents guests with varied gastronomic venues – Don Cipriani’s Italian Restaurant, Café Indochine, Hai Van Lounge… Excite
								your taste buds with our sumptuous cuisine experience!
							</Card.Text>
							<Link
								className="btn d-flex align-items-center justify-content-center"
								id="btnCulinary"
								style={{ width: "100%", height: "50px" }}
								to="/culinary"
							>
								<FaCocktail className="me-2" />
								Food & Beverage Promotion
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</>
	);
}

export default Introduce;
