import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PiNumberCircleOne } from "react-icons/pi";
import { PiNumberCircleTwo } from "react-icons/pi";
import { PiNumberCircleThree } from "react-icons/pi";
import { getBookingById } from "../../services/bookingsService";
import { Link, useParams } from "react-router-dom";
import { getAllFacilities } from "../../services/facilitiesServices";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

function BookingDetail() {
	const [bookingDetail, setBookingDetail] = useState({
		id: null,
		customer: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			country: "",
		},
		facilityId: undefined,
		adult: "",
		children: "",
		startDate: "",
		endDate: "",
		arrivedTime: "",
		note: "",
		pricePerDay: "",
		totalPrice: "",
	});

	const [facilities, setFacilities] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const bookingData = await getBookingById(id);
			const formattedData = {
				...bookingData,
				startDate: bookingData.startDate ? new Date(bookingData.startDate).toLocaleDateString("vi-VN") : "",
				endDate: bookingData.endDate ? new Date(bookingData.endDate).toLocaleDateString("vi-VN") : "",
				customer: {
					...bookingData.customer,
					countryName: bookingData.customer?.country ? countries.getName(bookingData.customer.country, "en") : "",
				},
			};
			setBookingDetail(formattedData);

			const facilitiesData = await getAllFacilities();
			setFacilities(
				facilitiesData.map((facilities) => ({
					value: facilities.id,
					label: facilities.name,
				}))
			);
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [id]);

	return (
		<div style={{ marginTop: "100px" }} id="detailBookingMain">
			<div className="text-center mb-4 ">
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
					{bookingDetail?.customer.firstName} {bookingDetail?.customer.lastName}'s Booking Detail
				</h2>
			</div>

			<Container className="container mt-3 mb-4">
				<h3 className="ms-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
					<PiNumberCircleOne id="iconCustomer" /> Customer Information
				</h3>
				<Row>
					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">First Name:</label>
							<div className="col-sm-3 form-control">{bookingDetail?.customer.firstName}</div>
						</div>

						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Phone:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.customer.phone}</div>
						</div>

						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Country:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.customer.countryName}</div>
						</div>
					</Col>

					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Last Name:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.customer.lastName}</div>
						</div>

						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Email:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.customer.email}</div>
						</div>
					</Col>
				</Row>

				<h3 className="ms-3 mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
					<PiNumberCircleTwo id="iconBooking" /> Booking Information
				</h3>
				<Row>
					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Type Room:</label>
							<div className="col-sm-6 form-control">
								<Link className="bookingRoomDetail" to={`/room/detail/${bookingDetail?.facility?.id}`}>
									{bookingDetail?.facility?.name}
								</Link>
							</div>
						</div>

						<div className="row  mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Start Date:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.startDate}</div>
						</div>

						<div className="row  mb-3 ms-1 align-items-center">
							<label className="col-sm-5 me-2 fw-semibold">Arrived Time:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.arrivedTime}</div>
						</div>
					</Col>

					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Guests:</label>
							<div className="col-sm-6 form-control">
								{bookingDetail?.adult} adults{bookingDetail?.children > 0 && `, ${bookingDetail.children} children`}
							</div>
						</div>

						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">End Date:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.endDate}</div>
						</div>

						<div className="row  mb-3 ms-1 align-items-center">
							<label className="col-sm-5 me-2 fw-semibold">Note (kids, special request):</label>
							<div className="col-sm-6 form-control">{bookingDetail?.note}</div>
						</div>
					</Col>
				</Row>

				<h3 className="ms-3 mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
					<PiNumberCircleThree id="iconPay" /> Payment Information
				</h3>
				<Row style={{ width: "51%" }}>
					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-4 me-2 fw-semibold">Price/day (VND):</label>
							<div className="col-sm-6 form-control">{bookingDetail?.pricePerDay.toLocaleString("vi-VN")} </div>
						</div>

						<div className="row  mb-3 ms-1 align-items-center">
							<label className="col-sm-4 me-2 fw-semibold">Total Price (VND):</label>
							<div className="col-sm-6 form-control">{bookingDetail?.totalPrice.toLocaleString("vi-VN")}</div>
						</div>
					</Col>
				</Row>

				<Row className="ms-1">
					<ul className="nav nav-pills mt-3">
						<li className="nav-item">
							<Link type="button" className="btn btn me-2" id="buttonBackBooking" to="/booking">
								Back
							</Link>
						</li>

						<li className="nav-item">
							<Link type="button" className="btn btn" id="buttonEditBooking" to={"/booking/edit/" + bookingDetail.id}>
								Edit
							</Link>
						</li>
					</ul>
				</Row>
			</Container>
		</div>
	);
}

export default BookingDetail;
