import React, { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImgFirst from "../carousel1.jpg";
import ImgFirst2 from "../carousel2.jpg";
import ImgFirst3 from "../carousel3.jpg";
import { getFacilitiesById } from "../services/facilitiesServices";
import { Link, useParams } from "react-router-dom";
import { gerTypeById } from "../services/typesService";

function DetailComponent() {
	const [facilitiesDetail, setFacilitiesDetail] = useState({
		id: "",
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

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setFacilitiesDetail(await getFacilitiesById(id));
			setTypeDetail(await gerTypeById(id));
		};
		fetchData();
	}, [id]);

	return (
		<>
			<div className="text-center mt-4 mb-4">
				<h2>DETAIL</h2>
			</div>

			<Carousel>
				<Carousel.Item>
					<img src={ImgFirst} alt="firstSlide" />
					<Carousel.Caption>
						<h3>Living room and Kitchen</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src={ImgFirst2} alt="secondSlide" />
					<Carousel.Caption>
						<h3>Bedroom</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src={ImgFirst3} alt="thirdSlide" />
					<Carousel.Caption>
						<h3>Pool and outdoor</h3>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>

			<Container className="container mt-4">
				<Row>
					<Col>
						<div className="detailInformation">
							<p>{typeDetail.name}</p>
							<p>{facilitiesDetail.information.bedroom}</p>
							<p>{facilitiesDetail.information.bed}</p>
							<p>Price: {facilitiesDetail.information.price}</p>
							<Link type="button" className="btn btn" id="buttonEdit">
								Edit
							</Link>
						</div>
					</Col>
					<Col>
						<div className="detailInformation">
							<p>{facilitiesDetail.information.bathroom}</p>
							<p>{facilitiesDetail.information.kitchen}</p>
							<p>{facilitiesDetail.information.customer}</p>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default DetailComponent;
