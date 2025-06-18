import React, { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { PiNumberCircleOne, PiNumberCircleThree } from "react-icons/pi";
import { PiNumberCircleTwo } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { getAllFacilities } from "../../services/facilitiesServices";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Select from "react-select";
import PriceComponent from "./PriceComponent";

countries.registerLocale(enLocale);

function AddBooking() {
	const initialValues = {
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
	};

	const [focusedFields, setFocusedFields] = useState({});
	const [selectedFacility, setSelectedFacility] = useState(null);
	const { facilityId } = useParams();
	const [finalPrice, setFinalPrice] = useState(0);
	const [finalStartDate, setFinalStartDate] = useState();
	const [finalEndDate, setFinalEndDate] = useState();
	const [finalGuest, setFinalGuest] = useState();

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

		const interval = setInterval(() => {
			const totalPrice = formikRef.current?.values?.totalPrice;
			if (totalPrice && !isNaN(totalPrice)) {
				setFinalPrice(totalPrice);
			}

			const startDate = formikRef.current?.values?.startDate;
			if (startDate !== finalStartDate) setFinalStartDate(startDate);

			const endDate = formikRef.current?.values?.endDate;
			if (endDate !== finalEndDate) setFinalEndDate(endDate);

			const adultGuest = formikRef.current?.values?.adult;
			const childrenGuest = formikRef.current?.values.children;
			if (adultGuest !== finalGuest) setFinalGuest(adultGuest + childrenGuest);
		}, 300); //đọc giá trị từ Formik ra bên ngoài, dùng useRef

		return () => clearInterval(interval); //hàm dọn dẹp
	}, [facilityId]);

	const formikRef = useRef();

	const countryOptions = Object.entries(countries.getNames("en", { select: "official" })).map(([code, name]) => ({ value: code, label: name }));

	const renderFloatingField = (
		{ name, label, type = "text", hint },
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
		focusedFields,
		setFocusedFields
	) => {
		const getNestedValue = (obj, path) => path.split(".").reduce((acc, part) => acc?.[part], obj);
		const fieldValue = getNestedValue(values, name);
		const fieldError = getNestedValue(errors, name);
		const fieldTouched = getNestedValue(touched, name);
		const focused = focusedFields[name] || false;
		const floating = focused || (fieldValue !== "" && fieldValue !== null && fieldValue !== undefined);

		const handleFocus = () => {
			setFocusedFields((prev) => ({ ...prev, [name]: true }));
		};

		const handleFieldBlur = (e) => {
			setFocusedFields((prev) => ({ ...prev, [name]: false }));
			handleBlur(e);
		};

		if (name === "customer.country") {
			return (
				<div className="floating-input-container">
					<Select
						options={countryOptions}
						value={countryOptions.find((option) => option.value === fieldValue) || null}
						onChange={(selected) => setFieldValue(name, selected?.value)}
						onFocus={handleFocus}
						onBlur={() => setFocusedFields((prev) => ({ ...prev, [name]: false }))}
						classNamePrefix="react-select"
						className={`floating-select ${floating ? "floating" : ""}`}
					/>
					<label className={`floating-label ${floating ? "floating" : "normal"} ${focused ? "focused" : ""}`}>{label}</label>
					{fieldTouched && fieldError && <div className="text-danger">{fieldError}</div>}
				</div>
			);
		}

		if (name === "pricePerDay" || name === "totalPrice") {
			return (
				<div className="floating-input-container">
					<input
						type="text"
						name={name}
						value={fieldValue ? Number(fieldValue).toLocaleString("vi-VN") : ""}
						readOnly
						className="floating-input floating"
					/>
					<label className="floating-label floating">{name === "pricePerDay" ? "Price per Day (VND)" : "Total Price (VND)"}</label>
				</div>
			);
		}

		return (
			<div className="floating-input-container">
				<input
					type={type}
					name={name}
					value={fieldValue ?? ""}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleFieldBlur}
					className={`floating-input ${floating ? "floating" : ""}`}
				/>
				<label className={`floating-label ${floating ? "floating" : "normal"} ${focused ? "focused" : ""}`}>{label}</label>
				{hint && <p className="text-muted">{hint}</p>}
				{fieldTouched && fieldError && <div className="text-danger">{fieldError}</div>}
			</div>
		);
	};

	const validationSchema = Yup.object({
		customer: Yup.object({
			firstName: Yup.string().required("The field is required"),
			lastName: Yup.string().required("The field is required"),
			phone: Yup.string().required("The field is required"),
			email: Yup.string().required("The field is required"),
		}),
		adult: Yup.number().required("The field is required").min(1),
		startDate: Yup.date().required("The field is required"),
		endDate: Yup.date()
			.required("The field is required")
			.test("is-after-start-date", "End date must be after start date", function (value) {
				const { startDate } = this.parent;
				if (!startDate || !value) return true; // bỏ qua nếu chưa có đủ dữ liệu
				return new Date(value) > new Date(startDate);
			}),
		arrivedTime: Yup.string().required("The field is required"),
	});

	return (
		<div style={{ backgroundColor: "#f3f3f3", padding: "100px 0px", width: "100%" }} className="d-flex">
			<div id="cardInformation">
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
									<strong style={{ color: "#046056", fontSize: "1.1rem" }}>
										VND {selectedFacility.information?.price.toLocaleString("vi-VN") ?? 0}
									</strong>
								</div>
							</div>
						</Card>
					) : (
						<p className="text-center text-muted">Loading room information...</p>
					)}
				</div>

				<Formik initialValues={initialValues} validationSchema={validationSchema} innerRef={formikRef}>
					{({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
						<>
							<PriceComponent
								startDate={values.startDate}
								endDate={values.endDate}
								selectedFacility={selectedFacility}
								setFieldValue={setFieldValue}
							/>

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
														{renderFloatingField(
															{
																name: "customer.firstName",
																label: "First name",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>

													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "customer.lastName",
																label: "Last name",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "customer.phone",
																label: "Phone number",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "customer.email",
																label: "Email address",
																type: "email",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "customer.country",
																label: "Country",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
												</div>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>

								<div id="addBookingCard" className="shadow-sm rounded-3 mt-2">
									<Accordion>
										<Accordion.Item eventKey="0">
											<Accordion.Header>
												<h3 className="pt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
													<PiNumberCircleTwo id="iconCustomer" /> Booking Information
												</h3>
											</Accordion.Header>
											<Accordion.Body>
												<div className="row">
													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "adult",
																label: "Select Guest (Adult)",
																type: "number",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
													<div className="col-md-6">
														<div id="inputFloatingChildren">
															{renderFloatingField(
																{
																	name: "children",
																	label: "Children (Optional)",
																	type: "number",
																},
																values,
																errors,
																touched,
																handleChange,
																handleBlur,
																setFieldValue,
																focusedFields,
																setFocusedFields
															)}
														</div>
														<p className="text-muted ms-1">Any children above 10, we will consider as adult</p>
													</div>

													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "startDate",
																label: "Your Start Date",
																type: "date",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>

													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "endDate",
																label: "Your End Date",
																type: "date",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>

													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "arrivedTime",
																label: "Your Arrival Time",
																type: "time",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>

													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "note",
																label: "Special Request (Optional)",
																type: "textarea",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
												</div>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>

								<div id="addPaymentCard" className="shadow-sm rounded-3 mt-2">
									<Accordion>
										<Accordion.Item eventKey="0">
											<Accordion.Header>
												<h3 className="pt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
													<PiNumberCircleThree id="iconCustomer" /> Payment Information
												</h3>
											</Accordion.Header>
											<Accordion.Body>
												<div className="row">
													<div className="col-md-6">
														{renderFloatingField(
															{
																name: "pricePerDay",
																label: "",
																type: "number",
															},
															values,
															errors,
															touched,
															handleChange,
															handleBlur,
															setFieldValue,
															focusedFields,
															setFocusedFields
														)}
													</div>
													<div className="col-md-6">
														<div id="inputFloatingChildren">
															{renderFloatingField(
																{
																	name: "totalPrice",
																	label: "",
																	type: "number",
																},
																values,
																errors,
																touched,
																handleChange,
																handleBlur,
																setFieldValue,
																focusedFields,
																setFocusedFields
															)}
														</div>
													</div>
												</div>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</Form>
						</>
					)}
				</Formik>
			</div>

			<div id="cardOverallInformation">
				<Card className="p-3 shadow-sm rounded-3">
					<h3 style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>Check</h3>
					<h5>VND {finalPrice.toLocaleString("vi-VN")} total</h5>
					{finalStartDate && finalEndDate && (
						<p>
							{new Date(finalStartDate).toLocaleDateString("vi-VN")} to {new Date(finalEndDate).toLocaleDateString("vi-VN")}
						</p>
					)}
					<p>{finalGuest} guests</p>
				</Card>
			</div>
		</div>
	);
}

export default AddBooking;
