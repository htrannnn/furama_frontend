import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getFacilitiesById } from "../../services/facilitiesServices";
import { Link, useParams } from "react-router-dom";
import { getTypeById } from "../../services/typesService";
import Carousel from "react-bootstrap/Carousel";
import { IoPricetags } from "react-icons/io5";
import { TfiArrowCircleRight } from "react-icons/tfi";
import EditComponent from "./EditComponent";
import { useSelector } from "react-redux";

function DetailComponent() {
	const [facilitiesDetail, setFacilitiesDetail] = useState({
		id: null,
		information: {
			name: "",
			bedroom: "",
			kingBed: "",
			queenBed: "",
			singleBed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
		view: "",
		describe: "",
		detail: "",
		area: "",
	});

	const [typeDetail, setTypeDetail] = useState({
		name: "",
	});

	const [index, setIndex] = useState(0);

	const [showEdit, setShowEdit] = useState(false);

	const { id } = useParams();

	const images = [facilitiesDetail.imgCarousel1, facilitiesDetail.imgCarousel2, facilitiesDetail.imgCarousel3];

	useEffect(() => {
		const fetchData = async () => {
			const facilityData = await getFacilitiesById(id);
			setFacilitiesDetail(facilityData);

			if (facilityData?.typeId) {
				const typeData = await getTypeById(facilityData.typeId);
				setTypeDetail(typeData);
			}
		};
		// window.scrollTo(0, 0);
		fetchData();
	}, [id, showEdit]);

	const account = useSelector((state) => state?.account.account);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	const handleShow = (rooms) => {
		setShowEdit(true);
	};

	const handleClose = (rooms) => {
		setShowEdit(false);
	};

	const handleUpdate = () => {
		setShowEdit(false); // Đóng modal edit
	};

	return (
		<div style={{ marginTop: "100px" }}>
			<div className="text-center mb-4 ">
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>{facilitiesDetail?.name}</h2>
			</div>

			{images.length > 0 && (
				<Carousel activeIndex={index} onSelect={handleSelect}>
					{images.map((imgSrc, idx) => (
						<Carousel.Item key={idx}>
							<img className="d-block w-100" src={imgSrc} alt={`Slide ${idx + 1}`} />
						</Carousel.Item>
					))}
				</Carousel>
			)}

			<Container className="border-top pt-3 mt-4 mb-4">
				<Row className="text-center" id="detailItem-1">
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Type</h6>
						<h5>{typeDetail?.name}</h5>
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Bedrooms</h6>
						<h5>{facilitiesDetail?.information.bedroom} bedroom(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Sleeps</h6>
						{facilitiesDetail?.information.kingBed > 0 && <h5>{facilitiesDetail.information.kingBed} king bed(s)</h5>}

						{facilitiesDetail?.information.queenBed > 0 && <h5>{facilitiesDetail.information.queenBed} queen bed(s)</h5>}

						{facilitiesDetail?.information.singleBed > 0 && <h5>{facilitiesDetail.information.singleBed} single bed(s)</h5>}
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Bathrooms</h6>
						<h5>{facilitiesDetail?.information.bathroom} bathroom(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Kitchen</h6>
						{facilitiesDetail?.information.kitchen > 0 ? <h5>{facilitiesDetail.information.kitchen} kitchen</h5> : "no kitchen"}
					</Col>
					<Col>
						<h6 style={{ color: "#046056" }}>Guests</h6>
						<h5>{facilitiesDetail?.information.customer} guests</h5>
					</Col>
				</Row>
				<div className="row mt-5">
					<div className="col-8">
						<div>
							<h3 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>Room Details</h3>
							<div className="fw-semibold" style={{ fontSize: "14px", textAlign: "justify", lineHeight: "22px" }}>
								<p>{facilitiesDetail?.describe}</p>
								<p>{facilitiesDetail?.detail}</p>
								<p>{facilitiesDetail?.area}</p>
							</div>
						</div>
						<div className="mt-5">
							<h3 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>Room Features</h3>
							<ul className="list-unstyled fw-semibold" style={{ fontSize: "16px", lineHeight: "40px" }}>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" style={{ color: "#046056" }} />
									Breakfast:
									<span className="ms-2" style={{ color: "#046056" }}>
										Available
									</span>
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" style={{ color: "#046056" }} />
									Safe:
									<span className="ms-2" style={{ color: "#046056" }}>
										YES
									</span>
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" style={{ color: "#046056" }} />
									Lift:
									<span className="ms-2" style={{ color: "#046056" }}>
										YES
									</span>
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" style={{ color: "#046056" }} />
									TV:
									<span className="ms-2" style={{ color: "#046056" }}>
										YES
									</span>
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" style={{ color: "#046056" }} />
									View:
									<span className="ms-2" style={{ color: "#046056" }}>
										{facilitiesDetail?.view}
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-4">
						<div style={{ backgroundColor: "#046056 ", padding: "20px 20px 15px" }}>
							<ul className="list-unstyled fw-semibold" style={{ fontSize: "16px", lineHeight: "40px", color: "white" }}>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" />
									Check in: 02:00 PM
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" />
									Check out: 11:00 AM
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" />
									Transfer Service
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" />
									Facilities for the Disabled
								</li>
								<li>
									<TfiArrowCircleRight className="mb-1 me-3" />
									In-Room Dining
								</li>
							</ul>
							<Link className="btn rounded-0" id="btnBooking" to={"/booking/add/" + facilitiesDetail?.id}>
								BOOK NOW
							</Link>
							<p className="fw-semibold mt-4 text-center" style={{ fontSize: "14px", color: "white" }}>
								Best Choice - Low Price Guarantee
							</p>
						</div>
					</div>
				</div>
				<Row className="mt-2">
					<div className="w-25 shadow" id="priceDetail">
						<h5>
							<IoPricetags className="me-2" />
							{facilitiesDetail?.information.price.toLocaleString("vi-VN")} VNĐ/night
						</h5>
					</div>
				</Row>
				<Row>
					<ul className="nav nav-pills mt-3">
						<li className="nav-item">
							<Link type="button" className="btn btn me-2" id="buttonBack" to="/rooms">
								Back
							</Link>
						</li>

						{account && (
							<li className="nav-item">
								<button type="button" className="btn btn" id="buttonEdit" onClick={() => handleShow()}>
									Edit
								</button>
							</li>
						)}
					</ul>
				</Row>
				<EditComponent showEdit={showEdit} handleClose={handleClose} handleUpdate={handleUpdate} />
			</Container>
		</div>
	);
}

export default DetailComponent;
