import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { PiNumberCircleOne } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { getAllFacilities } from "../../services/facilitiesServices";

function AddBooking() {
	const [booking, setBooking] = useState({
		id: "",
		customer: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
		},
		facilityId: "",
		guests: "",
		startDate: "",
		endDate: "",
		note: "",
		pricePerDay: "",
		totalPrice: "",
	});

	const [facilities, setFacilities] = useState([]);
	const [focusedFields, setFocusedFields] = useState({});
	const [selectedFacility, setSelectedFacility] = useState(null);
	const { facilityId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const [facilities] = await getAllFacilities();
			const found = facilities.find((f) => f.id === Number(facilityId));

			if (found) {
				setSelectedFacility(found);
			}
		};

		window.scrollTo(0, 0);
		fetchData();
	}, [facilityId]);

	const handleInputChange = (field, value) => {
		setBooking((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleFocus = (field) => {
		setFocusedFields((prev) => ({
			...prev,
			[field]: true,
		}));
	};

	const handleBlur = (field) => {
		setFocusedFields((prev) => ({
			...prev,
			[field]: false,
		}));
	};

	const isFloating = (field) => {
		const value = booking.customer[field];
		return focusedFields[field] || (value && value.length > 0);
	};

	return (
		<div style={{ backgroundColor: "#f3f3f3", padding: "10px 0px" }}>
			<div className="text-center">
				<p>facilityId: {facilityId}</p>
				<p>Facilities count: {facilities.length}</p>
				<p>selectedFacility: {selectedFacility ? "Found" : "Not Found"}</p>
			</div>
			<div>
				{selectedFacility ? (
					<Card className="container d-flex flex-row align-items-center p-3 mb-4 shadow-sm" style={{ borderRadius: "10px", backgroundColor: "#fff" }}>
						<div style={{ flex: "0 0 150px", marginRight: "15px" }}>
							<img
								src={selectedFacility.image}
								alt={selectedFacility.name}
								style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
							/>
						</div>
						<div style={{ flex: 1 }}>
							<h5 className="mb-1">{selectedFacility.name}</h5>
							<p className="mb-1 text-muted">
								Sleeps {selectedFacility?.information?.bedroom ?? "?"} · {selectedFacility.information?.bed ?? "?"} beds ·{" "}
								{selectedFacility.information?.bathroom ?? "?"} bathrooms
							</p>
							<p className="mb-1 text-muted">
								{selectedFacility?.view ?? "?"} · {selectedFacility?.area ?? "?"}
							</p>
							<div className="d-flex justify-content-between align-items-center mt-2">
								<span className="text-muted">Non-refundable | Pay today</span>
								<strong style={{ color: "#046056", fontSize: "1.1rem" }}>VND {selectedFacility.information?.price ?? 0}</strong>
							</div>
						</div>
					</Card>
				) : (
					<p className="text-center text-muted">Loading room information...</p>
				)}
			</div>

			<div id="addCustomerCard" className="rounded-2">
				<div>
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<h3 className="ms-3 pt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
									<PiNumberCircleOne id="iconCustomer" /> Customer Information
								</h3>
							</Accordion.Header>
							<Accordion.Body>
								<div className="row">
									<div className="col-md-6">
										<div className="floating-input-container">
											<input
												type="text"
												value={booking?.customer.firstName}
												onChange={(e) => handleInputChange("firstName", e.target.value)}
												onFocus={() => handleFocus("firstName")}
												onBlur={() => handleBlur("firstName")}
												className={`floating-input ${isFloating("firstName") ? "floating" : ""}`}
											/>
											<label
												className={`floating-label ${isFloating("firstName") ? "floating" : "normal"} ${focusedFields.firstName ? "focused" : ""}`}
											>
												First name
											</label>
										</div>
									</div>

									<div className="col-md-6">
										<div className="floating-input-container">
											<input
												type="text"
												value={booking?.customer.lastName}
												onChange={(e) => handleInputChange("lastName", e.target.value)}
												onFocus={() => handleFocus("lastName")}
												onBlur={() => handleBlur("lastName")}
												className={`floating-input ${isFloating("lastName") ? "floating" : ""}`}
											/>
											<label
												className={`floating-label ${isFloating("lastName") ? "floating" : "normal"} ${focusedFields.lastName ? "focused" : ""}`}
											>
												Last name
											</label>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="floating-input-container">
											<input
												type="tel"
												value={booking?.customer.phone}
												onChange={(e) => handleInputChange("phone", e.target.value)}
												onFocus={() => handleFocus("phone")}
												onBlur={() => handleBlur("phone")}
												className={`floating-input ${isFloating("phone") ? "floating" : ""}`}
											/>
											<label className={`floating-label ${isFloating("phone") ? "floating" : "normal"} ${focusedFields.phone ? "focused" : ""}`}>
												Phone number
											</label>
										</div>
									</div>

									<div className="col-md-6">
										<div className="floating-input-container">
											<input
												type="email"
												value={booking?.customer.email}
												onChange={(e) => handleInputChange("email", e.target.value)}
												onFocus={() => handleFocus("email")}
												onBlur={() => handleBlur("email")}
												className={`floating-input ${isFloating("email") ? "floating" : ""}`}
											/>
											<label className={`floating-label ${isFloating("email") ? "floating" : "normal"} ${focusedFields.email ? "focused" : ""}`}>
												Email address
											</label>
										</div>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default AddBooking;
