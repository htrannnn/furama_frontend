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
import { Value } from "sass";

function BookingDetail() {
	const [bookingDetail, setBookingDetail] = useState({
		id: null,
		customer: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
		},
		facilityId: undefined,
		guests: "",
		startDate: "",
		endDate: "",
		note: "",
		pricePerDay: "",
		totalPrice: "",
	});

	const [facilities, setFacilities] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const bookingData = await getBookingById(id);
			setBookingDetail(bookingData);

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
		<div style={{ marginTop: "100px" }}>
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
							<label className="col-sm-5 me-2 fw-semibold">Note (kids, special request):</label>
							<div className="col-sm-6 form-control">{bookingDetail?.note}</div>
						</div>
					</Col>

					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Guests:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.guests}</div>
						</div>

						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">End Date:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.endDate}</div>
						</div>
					</Col>
				</Row>

				<h3 className="ms-3 mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>
					<PiNumberCircleThree id="iconPay" /> Payment Information
				</h3>
				<Row style={{ width: "51%" }}>
					<Col>
						<div className="row mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Price/day:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.pricePerDay}</div>
						</div>

						<div className="row  mb-3 ms-1 align-items-center">
							<label className="col-sm-3 me-2 fw-semibold">Total Price:</label>
							<div className="col-sm-6 form-control">{bookingDetail?.totalPrice}</div>
						</div>
					</Col>
				</Row>

				<Row className="ms-1">
					<ul className="nav nav-pills mt-3">
						<li className="nav-item">
							<Link type="button" className="btn btn me-2" id="buttonBack" to="/booking">
								Back
							</Link>
						</li>

						<li className="nav-item">
							<button type="button" className="btn btn" id="buttonEdit">
								Edit
							</button>
						</li>
					</ul>
				</Row>
			</Container>
		</div>
	);
}

export default BookingDetail;
