import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getFacilitiesById } from "../services/facilitiesServices";
import { Link, useParams } from "react-router-dom";
import { getTypeById } from "../services/typesService";
import Carousel from "react-bootstrap/Carousel";

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
		<>
			<div className="text-center mt-4 mb-4">
				<h2>DETAIL {facilitiesDetail?.name}</h2>
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

			<Container className="container mt-4 mb-4">
				<Row>
					<Col>
						<div className="detailInformation">
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
			</Container>
		</>
	);
}

export default DetailComponent;
