import React, { Children, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { PiNumberCircleOne } from "react-icons/pi";
import { PiNumberCircleTwo } from "react-icons/pi";
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
			country: "",
		},
		facilityId: "",
		adult: "",
		children: "",
		startDate: "",
		endDate: "",
		arrivedTime: "",
		note: "",
		pricePerDay: "",
		totalPrice: "",
	});

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

	const notificationSchema = Yup.object().shape({
		adult: Yup.string().required("The field is required").min(1),
		children: Yup.string().required("The field is required").min(0, "Greater than or equal to 0"),
	});

	const handleValidate = Yup.object({
		firstName: Yup.string()
			.required("The field is required")
			.matches(/^([A-Z]+(?:\s[A-Z]+)*)\s?(\d{1,2})?$/, "Name is not valid"),
		information: notificationSchema,
	});

	return (
		<div style={{ backgroundColor: "#f3f3f3", padding: "100px 0px" }}>
			<div>
				{selectedFacility ? (
					<Card className="d-flex flex-row align-items-center p-3 shadow-sm rounded-3" id="cardDetailRoomBooking">
						<div style={{ flex: "0 0 150px", marginRight: "20px" }}>
							<img src={selectedFacility.image} alt={selectedFacility.name} style={{ height: "140px", objectFit: "cover", borderRadius: "8px" }} />
						</div>
						<div style={{ flex: 1 }}>
							<h5 className="mb-1">{selectedFacility.name}</h5>
							<p className="mb-1 text-muted">
								{selectedFacility?.information?.bedroom ?? "?"} Bedrooms ·{" "}
								{(selectedFacility?.information.kingBed || 0) +
									(selectedFacility?.information.queenBed || 0) +
									(selectedFacility?.information.singleBed || 0)}{" "}
								Bed(s) · {selectedFacility.information?.bathroom ?? "?"} Bathrooms
							</p>
							<p className="mb-1 text-muted">{selectedFacility?.area ?? "?"}</p>
							<p className="mb-1 text-muted">{selectedFacility?.view ?? "?"} view</p>
							<div className="d-flex justify-content-between align-items-center">
								<strong style={{ color: "#046056", fontSize: "1.1rem" }}>VND {selectedFacility.information?.price ?? 0}</strong>
							</div>
						</div>
					</Card>
				) : (
					<p className="text-center text-muted">Loading room information...</p>
				)}
			</div>

			<Formik initialValues={booking} validationSchema={handleValidate}>
				<Form>
					<div id="addCustomerCard" className="shadow-sm rounded-3">
						<Accordion defaultActiveKey="0">
							<Accordion.Item eventKey="0">
								<Accordion.Header>
									<h3 className="pt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
										<PiNumberCircleOne id="iconCustomer" /> Customer Information
									</h3>
								</Accordion.Header>
								<Accordion.Body>
									<div className="row">
										<div className="col-md-6">
											<div className="floating-input-container">
												<Field
													type="text"
													name="firstName"
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
												<Field
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
												<Field
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
												<Field
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

										<div className="col-md-6">
											<div className="floating-input-container">
												<Field
													type="country"
													value={booking?.customer.country}
													onChange={(e) => handleInputChange("country", e.target.value)}
													onFocus={() => handleFocus("country")}
													onBlur={() => handleBlur("country")}
													className={`floating-input ${isFloating("country") ? "floating" : ""}`}
												/>
												<label
													className={`floating-label ${isFloating("country") ? "floating" : "normal"} ${focusedFields.country ? "focused" : ""}`}
												>
													Country
												</label>
											</div>
										</div>
									</div>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</div>

					<div id="addBookingCard" className="shadow-sm rounded-3">
						<Accordion className="mt-2">
							<Accordion.Item eventKey="0">
								<Accordion.Header>
									<h3 className="pt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
										<PiNumberCircleTwo id="iconCustomer" /> Booking Information
									</h3>
								</Accordion.Header>
								<Accordion.Body>
									<div className="row">
										<div className="col-md-6">
											<div className="floating-input-container">
												<Field
													type="number"
													value={booking?.adult}
													onChange={(e) => handleInputChange("adult", e.target.value)}
													onFocus={() => handleFocus("adult")}
													onBlur={() => handleBlur("adult")}
													className={`floating-input ${isFloating("adult") ? "floating" : ""}`}
												/>
												<label className={`floating-label ${isFloating("adult") ? "floating" : "normal"} ${focusedFields.adult ? "focused" : ""}`}>
													Select Guest (Adult)
												</label>
												<ErrorMessage name="information.adult" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="col-md-6">
											<div className="floating-input-container">
												<Field
													type="number"
													value={booking?.children}
													onChange={(e) => handleInputChange("children", e.target.value)}
													onFocus={() => handleFocus("children")}
													onBlur={() => handleBlur("children")}
													className={`floating-input ${isFloating("children") ? "floating" : ""}`}
												/>
												<label
													className={`floating-label ${isFloating("children") ? "floating" : "normal"} ${focusedFields.children ? "focused" : ""}`}
												>
													Select Guest (Children)
												</label>
												<p className="text-muted">Any children above 10, we will considered as adult</p>
												<ErrorMessage name="information.children" style={{ color: "red" }} component="div" />
											</div>
										</div>
									</div>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

export default AddBooking;
