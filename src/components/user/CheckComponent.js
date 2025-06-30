import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookingById } from "../../services/bookingsService";
import Card from "react-bootstrap/Card";
import { getAllFacilities } from "../../services/facilitiesServices";

function CheckComponent() {
	const [checkInBooking, setCheckInBooking] = useState(null);
	const [bookingRoom, setBookingRoom] = useState(null);
	const [facilityList, setFacilityList] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const booking = await getBookingById(id);
			setCheckInBooking(booking);

			const [facilities] = await getAllFacilities();
			setFacilityList(facilities);

			const found = facilities.find((f) => f.id === Number(booking.facilityId));
			if (found) {
				setBookingRoom(found);
			}
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [id]);

	if (!checkInBooking) return <p>Your Booking Is Loading...</p>;

	return (
		<div className="mx-5 mb-5" style={{ marginTop: "100px" }}>
			<div className="text-center mb-4 ">
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>Thank you for choosing Furama Resort</h2>
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#046056" }}>Your booking is ready!</h2>
			</div>

			<div style={{ margin: "0px 150px" }}>
				<div className="row">
					{bookingRoom ? (
						<Card className="d-flex flex-row align-items-center p-3 shadow-sm rounded-3 col-md-5" style={{ width: "60%" }}>
							<div style={{ flex: "0 0 150px", marginRight: "20px" }}>
								<img src={bookingRoom.image} alt={bookingRoom.name} style={{ height: "130px", objectFit: "cover", borderRadius: "8px" }} />
							</div>
							<div style={{ flex: 1 }}>
								<h5 className="mb-1">{bookingRoom.name}</h5>
								<p className="mb-1 text-muted">
									{bookingRoom?.information?.bedroom ?? "?"} Bedrooms ·{" "}
									{(bookingRoom?.information.kingBed || 0) + (bookingRoom?.information.queenBed || 0) + (bookingRoom?.information.singleBed || 0)}{" "}
									Bed(s) · {bookingRoom.information?.bathroom ?? "?"} Bathrooms
								</p>
								<p className="mb-1 text-muted">{bookingRoom?.area ?? "?"}</p>
								<p className="mb-1 text-muted">{bookingRoom?.view ?? "?"} view</p>
							</div>
						</Card>
					) : (
						<p className="text-center text-muted">Loading room information...</p>
					)}
					<Card className="d-flex flex-row align-items-center p-3 shadow-sm rounded-3 col-md-5 ms-2" style={{ width: "38%" }}>
						<div style={{ fontSize: "16px" }}>
							<h5 className="mb-1">Guest Information</h5>
							<p className="mb-1 text-muted">
								Name: {checkInBooking?.customer.firstName} {checkInBooking?.customer.lastName}
							</p>
							<p className="mb-1 text-muted">Email: {checkInBooking?.customer.email}</p>
							<p className="mb-1 text-muted">
								Guest: {checkInBooking.adult} adult, {checkInBooking.children} children
							</p>
							<p className="mb-1 text-muted">Special request: {checkInBooking.note ? <span>{checkInBooking.note}</span> : "none"}</p>
						</div>
					</Card>
				</div>

				<div>
					<Card className="d-flex flex-row align-items-center p-3 shadow-sm rounded-3 mt-2" style={{ marginLeft: "-10px" }}>
						<div style={{ flex: 1, fontSize: "16px" }}>
							<h5 className="mb-1">
								<p className="d-inline">
									{checkInBooking?.startDate && checkInBooking?.endDate
										? `${Math.ceil((new Date(checkInBooking.endDate) - new Date(checkInBooking.startDate)) / (1000 * 60 * 60 * 24))} nights`
										: "Nights: -"}
								</p>
								, {new Date(checkInBooking.startDate).toLocaleDateString("vi-VN")} - {new Date(checkInBooking.endDate).toLocaleDateString("vi-VN")}
							</h5>

							<p className="mb-1 text-muted">Check in: 02:00 PM </p>
							<p className="mb-1 text-muted">Check out: 12:00 PM </p>
							<p className="mb-1 text-muted">Address: 103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang City, Vietnam. </p>
						</div>
					</Card>
				</div>

				<div className="mt-2">
					<h5 className="text-center">Please capture this so you can check in upon arrival at the hotel.</h5>
				</div>
			</div>
		</div>
	);
}

export default CheckComponent;
