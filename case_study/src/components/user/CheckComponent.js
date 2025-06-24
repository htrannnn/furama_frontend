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

			const formattedData = {
				...booking,
				startDate: booking.startDate ? new Date(booking.startDate).toLocaleDateString("vi-VN") : "",
				endDate: booking.endDate ? new Date(booking.endDate).toLocaleDateString("vi-VN") : "",
			};
			setCheckInBooking(formattedData);

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
								<img src={bookingRoom.image} alt={bookingRoom.name} style={{ height: "140px", objectFit: "cover", borderRadius: "8px" }} />
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
						<div style={{ flex: 1, fontSize: "16px" }}>
							<h5 className="mb-1">
								{checkInBooking.startDate} - {checkInBooking.endDate}
							</h5>
							<p className="mb-1 text-muted">Check in: 02:00 PM </p>
							<p className="mb-1 text-muted">Check out: 12:00 PM </p>
							<p className="mb-1 text-muted">Address: 103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang City, Vietnam. </p>
						</div>
					</Card>
				</div>

				<div>
					<Card className="d-flex flex-row align-items-center p-3 shadow-sm rounded-3 mt-2">
						<div style={{ fontSize: "16px" }}>
							<h5 className="mb-1">
								{checkInBooking.startDate} - {checkInBooking.endDate}
							</h5>
							<p className="mb-1 text-muted">Check in: 02:00 PM </p>
							<p className="mb-1 text-muted">Check out: 12:00 PM </p>
							<p className="mb-1 text-muted">Address: 103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang City, Vietnam. </p>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default CheckComponent;
