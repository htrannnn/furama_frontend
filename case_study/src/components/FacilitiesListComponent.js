import React, { useEffect, useState } from "react";
import ImgVilla from "../villa.jpg";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllFacilities } from "../services/facilitiesServices";

function FacilitiesListComponent() {
	const [villas, setVillas] = useState([]);
	const [formSearch, setFormSearch] = useState({
		query: "",
		type: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setVillas(await getAllFacilities(formSearch));
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		setFormSearch({
			[e.target.name]: e.target.value,
		});
	};

	const handleSearch = (e) => {
		e.preventDefault();

		const fetchData = async () => {
			setVillas(await getAllFacilities(formSearch));
		};
		fetchData();
	};

	return (
		<div>
			<div className="mb-4" id="titleImg">
				<h1 className="text-center shadow p-3 mb-5" id="titleText">
					WELCOME TO FURAMA RESORT
				</h1>
			</div>
			<div className="container">
				<div class="d-flex align-items-center mb-4">
					<div class="flex-grow-1 text-center">
						<h4>FACILITIES</h4>
					</div>
					<div class="flex-shrink-0">
						<div className="input-group mb-3">
							<input name="query" type="text" className="form-control" placeholder="Search" onChange={handleChange} />
							<select className="form-select" name="type" id="type" onChange={handleChange}>
								<option value="1">All</option>
								<option value="1">Villa</option>
								<option value="2">House</option>
								<option value="3">Room</option>
							</select>
							<button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<Row xs={1} md={3} className="g-4">
					{villas.map((villa) => (
						<Col key={villa.id}>
							<Card>
								<Card.Img variant="top" src={ImgVilla} style={{ height: 250 }} />
								<Card.Body>
									<Card.Title>{villa.name}</Card.Title>
									<Card.Text>{villa.information}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
}

export default FacilitiesListComponent;
