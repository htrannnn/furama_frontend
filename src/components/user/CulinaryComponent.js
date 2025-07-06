import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CulinaryComponent() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div id="culinaryImg" className="mb-4"></div>
			<div className="mx-5 mb-5">
				<div className="fw-semibold " style={{ fontSize: "13.5px", lineHeight: "24px", textAlign: "justify" }}>
					<p>
						The resort’s culinary experience features a mixture of the authentic and locally inspired Vietnamese, Asian, Italian and other European
						cuisines plus the best imported steaks.
					</p>
					<p>
						The resort presents guests with varied gastronomic venues – the hip and breezy bar overlooking the beach, the exclusive Lagoon pool
						surrounded by a tropical garden, the true Italian flare offered at the Don Cipriani’s, the refined Asian touch at Café Indochine or the
						authentic central Vietnam cuisine at the Danaksara.
					</p>
				</div>

				<div className="d-flex mt-4 card-responsive-wrapper" style={{ gap: "40px" }}>
					<Card style={{ width: "50%", backgroundColor: "transparent", border: "none" }}>
						<Card.Img variant="top" src="/images/seafood-steak.jpg" className="rounded-0" />
						<div className="mt-3">
							<Card.Title>
								<h2 className="fw-bold" style={{ fontSize: "24px", lineHeight: "35px", fontFamily: "serif", color: "#056055" }}>
									Seafood & Steak Buffet Dinner
								</h2>
							</Card.Title>
							<Link
								className="btn d-flex align-items-center justify-content-center mt-3 mb-3"
								id="btnCulinarySf"
								style={{ width: "60%", height: "50px" }}
							>
								Only from VND 888,000 ++/ guest | Daily
							</Link>
							<div className="fw-semibold " style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								The culinary heritage Furama Resort Danang will bring back our sumptuous Seafood & Steak Buffet dinner, serving half of Nha Trang
								Lobster per guest, unlimited “Ocean to table” Danang Seafood, premium Steak in Teppanyaki style, and a vast array of more than 70
								signature dishes in a show kitchen.
							</div>

							<div className="fw-semibold " style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								<ul style={{ paddingLeft: "0" }}>
									<li>Only VND 888,000++/ adult | VND 588,000++++/ child (4-12 years old)</li>
									<li>Only VND 1,068,000++/ adult (Enjoy 2 hours of free-flow beer)</li>
									<li>Only VND 1,268,000++/ adult (Enjoy 2 hours of free-flow house wine)</li>
									<li>Champa dance performances | 19:00 – 19:30 Every night.</li>
									<li>15% discount when booking 48 hours in advance.</li>
								</ul>
							</div>
							<div className="border-top mt-3"></div>
							<Card.Text className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								<span> Opening hours: From 18:30 – 22:00 every day</span>
								<br />
								<span>Hotline: +84 012 345 6789 | Email: fb@furamavietnam.com</span>
							</Card.Text>
						</div>
					</Card>

					<Card style={{ width: "50%", backgroundColor: "transparent", border: "none" }}>
						<Card.Img variant="top" src="/images/vietnamese-meal.jpg" className="rounded-0" />
						<div className="mt-3">
							<Card.Title>
								<h2 className="fw-bold" style={{ fontSize: "24px", lineHeight: "35px", fontFamily: "serif", color: "#056055" }}>
									Vietnamese Copper Tray Meal
								</h2>
							</Card.Title>
							<Link
								className="btn d-flex align-items-center justify-content-center mt-3 mb-3"
								id="btnCulinaryVnMeal"
								style={{ width: "60%", height: "50px" }}
							>
								Only from VND 390,000 net/ guest
							</Link>
							<div className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								Vietnamese cuisine is always fascinating. There are many reasons why you have to try our delicious traditional food. The thousand-year
								culinary historical story with the blend of distinct freshness of spices and herbs are in perfect harmony. Our Chefs will serve their
								signature Vietnamese flavors like Beef salad with young banana, Sweet and sour fish broth, Caramelized white prawns in fish sauce
								reduction,… Come and enjoy now!
							</div>
							<div className="fw-semibold " style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								<ul style={{ paddingLeft: "0" }}>
									<li>Price: VND 390,000 net/ guest</li>
									<li>Serving for at least two guests</li>
									<li>Vietnamese traditional dishes (Appetizer, Broth, Stir Fried, Main Courses, Side Dishes & Desserts)</li>
								</ul>
							</div>
							<div className="border-top mt-3"></div>
							<Card.Text className="fw-semibold" style={{ fontSize: "14px", lineHeight: "25px", textAlign: "justify" }}>
								<span> Lunch from 11:30 – 14:00 | Dinner upon request</span>
								<br />
								<span>Hotline: +84 012 345 6789 | Email: fb@furamavietnam.com</span>
							</Card.Text>
						</div>
					</Card>
				</div>
			</div>
		</>
	);
}

export default CulinaryComponent;
