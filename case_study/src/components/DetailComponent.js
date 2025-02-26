import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getFacilitiesById } from "../services/facilitiesServices";
import { Link, useParams } from "react-router-dom";
import { getTypeById } from "../services/typesService";
import Carousel from "react-bootstrap/Carousel";
import { IoPricetags } from "react-icons/io5";
import { TfiArrowCircleRight } from "react-icons/tfi";
import EditComponent from "./EditComponent";

function DetailComponent() {
	const [facilitiesDetail, setFacilitiesDetail] = useState({
		id: null,
		information: {
			name: "",
			bedroom: "",
			bed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
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
		fetchData();
	}, [id, showEdit]);

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
				<Row className="text-center">
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
						<h5>{facilitiesDetail?.information.bed} bed(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Bathrooms</h6>
						<h5>{facilitiesDetail?.information.bathroom} bathroom(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 style={{ color: "#046056" }}>Kitchen</h6>
						<h5>{facilitiesDetail?.information.kitchen} kitchen</h5>
					</Col>
					<Col>
						<h6 style={{ color: "#046056" }}>Guests</h6>
						<h5>{facilitiesDetail?.information.customer} guests</h5>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<div>
							<h3 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>Room Details</h3>
						</div>
					</Col>

					<Col className="d-flex justify-content-end">
						<div style={{ width: "60%", backgroundColor: "#046056 ", padding: "20px 20px 40px" }}>
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
						</div>
					</Col>
				</Row>
				<Row className="mt-3">
					<div className="w-25 shadow" id="priceDetail">
						<h5>
							<IoPricetags className="me-2" />
							{facilitiesDetail?.information.price} VNĐ
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
						<li className="nav-item">
							<button type="button" className="btn btn" id="buttonEdit" onClick={() => handleShow()}>
								Edit
							</button>
						</li>
					</ul>
				</Row>
				<EditComponent showEdit={showEdit} handleClose={handleClose} handleUpdate={handleUpdate} />
			</Container>
		</div>
	);
}

export default DetailComponent;
