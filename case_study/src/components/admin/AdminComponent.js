import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MdBedroomParent } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

function AdminComponent() {
	const account = useSelector((state) => state?.account?.account);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{account && (
				<div>
					<div>
						<h1 className="text-center mt-5 mb-5">WELCOME ADMIN</h1>
					</div>
					<div className="mx-5 mb-5">
						<Row>
							<Col>
								<Card className="border-0">
									<Card.Body>
										<Card.Text>
											<Link
												style={{ textDecoration: "none" }}
												to="/rooms"
												className="d-flex flex-column justify-content-center align-items-center"
												id="managingRooms"
											>
												<MdBedroomParent style={{ fontSize: "8em" }} />
												<p>MANAGING ROOMS & SUITES</p>
											</Link>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>

							<Col>
								<Card className="border-0">
									<Card.Body className="managing">
										<Card.Text>
											<Link
												className="d-flex flex-column justify-content-center align-items-center"
												to="/booking"
												style={{ textDecoration: "none" }}
												id="managingBooking"
											>
												<MdManageAccounts style={{ fontSize: "8em" }} />
												<p>MANAGING CUSTOMER BOOKING</p>
											</Link>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</div>
			)}
		</>
	);
}

export default AdminComponent;
