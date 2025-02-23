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

	const images = [facilitiesDetail.imgCarousel1, facilitiesDetail.imgCarousel2, facilitiesDetail.imgCarousel3];

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	const { id } = useParams();

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
	}, [id]);

	return (
		<div style={{ marginTop: "100px" }}>
			<div className="text-center mb-4 ">
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>DETAIL {facilitiesDetail?.name}</h2>
			</div>

			{images.length > 0 && (
				<Carousel activeIndex={index} onSelect={handleSelect}>
					{images.map((imgSrc, idx) => (
						<Carousel.Item key={idx}>
							<img className="d-block w-100" src={imgSrc} alt={`Slide ${idx + 1}`} />
							<Carousel.Caption>
								<h3>Slide {idx + 1}</h3>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
			)}

			{/* <Container className="container mt-4 mb-4">
				<Row>
					<Col>
						<div>
							<p>{typeDetail?.name}</p>
							<p>{facilitiesDetail?.information.bedroom} bedroom(s)</p>
							<p>{facilitiesDetail?.information.bed} bed(s)</p>
							<p>Price: {facilitiesDetail?.information.price} VNĐ</p>
							<ul className="nav nav-pills mt-3">
								<li className="nav-item">
									<Link type="button" className="btn btn me-2" id="buttonBack" to="/rooms">
										Back
									</Link>
								</li>
								<li className="nav-item">
									<Link type="button" className="btn btn" id="buttonEdit" to={"/facilities/edit/" + id}>
										Edit
									</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col>
						<div className="detailInformation">
							<p>{facilitiesDetail?.information.bathroom} bathroom(s)</p>
							<p>{facilitiesDetail?.information.kitchen} kitchen</p>
							<p>{facilitiesDetail?.information.customer} customer(s)</p>
						</div>
					</Col>
				</Row>
			</Container> */}
			<Container className="border-top pt-3 mt-4 mb-4">
				<Row className="text-center">
					<Col className="border-end">
						<h6 className="text-teal">Type</h6>
						<h5>{typeDetail?.name}</h5>
					</Col>
					<Col className="border-end">
						<h6 className="text-teal">Bedrooms</h6>
						<h5>{facilitiesDetail?.information.bedroom} bedroom(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 className="text-teal">Sleeps</h6>
						<h5>{facilitiesDetail?.information.bed} bed(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 className="text-teal">Bathrooms</h6>
						<h5>{facilitiesDetail?.information.bathroom} bathroom(s)</h5>
					</Col>
					<Col className="border-end">
						<h6 className="text-teal">Kitchen</h6>
						<h5>{facilitiesDetail?.information.kitchen} kitchen</h5>
					</Col>
					<Col className="border-end">
						<h6 className="text-teal">Guests</h6>
						<h5>{facilitiesDetail?.information.customer} guests</h5>
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
							<Link type="button" className="btn btn" id="buttonEdit" to={"/facilities/edit/" + id}>
								Edit
							</Link>
						</li>
					</ul>
				</Row>
			</Container>
		</div>
	);
}

export default DetailComponent;
