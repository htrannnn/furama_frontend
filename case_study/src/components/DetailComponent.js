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
import { getTypeById } from "../services/typesService";

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

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const facilityData = await getFacilitiesById(id);
			setFacilitiesDetail(facilityData);

			if (facilityData.typeId) {
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
							<p>{typeDetail?.name}</p>
							<p>{facilitiesDetail?.information.bedroom} bedroom(s)</p>
							<p>{facilitiesDetail?.information.bed} bed(s)</p>
							<p>Price: {facilitiesDetail?.information.price} VNĐ</p>
							<ul className="nav nav-pills mt-3">
								<li className="nav-item">
									<Link type="button" className="btn btn me-2" id="buttonBack" to="/homepage/facilitiesList">
										Back
									</Link>
								</li>
								<li className="nav-item">
									<Link type="button" className="btn btn" id="buttonEdit" to={"/facilitiesList/detail/edit/" + id}>
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
							{/* ?. là optional chaining operator. Sử dụng để truy cập thuộc tính của một đối tượng mà không gây ra lỗi nếu đối tượng hoặc thuộc tính trước đó là undefined hoặc null. Đây là một cách an toàn để kiểm tra và truy cập dữ liệu sâu bên trong một cấu trúc dữ liệu phức tạp. */}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default DetailComponent;
