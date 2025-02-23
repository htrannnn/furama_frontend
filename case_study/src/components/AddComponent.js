import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllTypes } from "../services/typesService";
import { Link, useNavigate } from "react-router-dom";
import { addNewFacilities } from "../services/facilitiesServices";

function AddComponent() {
	const [facilities, setFacilities] = useState({
		id: "",
		typeId: "",
		name: "",
		information: {
			bedroom: "",
			bed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
	});

	const [types, setTypes] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setTypes(await getAllTypes());
		};
		fetchData();
	}, []);

	const handleSubmit = async (value) => {
		await addNewFacilities(value);
		navigate("/homepage/facilitiesList");
	};

	const notificationSchema = Yup.object().shape({
		bedroom: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bedroom not valid"),

		bed: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bed not valid"),

		bathroom: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bathroom not valid"),

		kitchen: Yup.string()
			.required("Empty")
			.min(0, "Greater than or equal to 0")
			.matches(/^\d{1,2}$/, "Number of kitchen not valid"),

		customer: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of customer not valid"),

		price: Yup.string()
			.required("Empty")
			.min(0, "Greater than or equal to 0")
			.matches(/^\d{1,3}(\.\d{3})*$/, "Enter correct currency format. Ex: 6.000.000 VNĐ"),
	});

	const handleValidate = Yup.object({
		name: Yup.string()
			.required("Empty")
			.matches(/^([A-Z]+(?:\s[A-Z]+)*)\s?(\d{1,2})?$/, "Name is not valid"),
		information: notificationSchema,
	});

	return (
		<div className="container">
			<h2 className="text-center mt-4 mb-4">ADD NEW FACILITIES</h2>
			<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={handleValidate}>
				<Form className="mt-3">
					<h3 className="mt-4 mb-4">Facilities Information</h3>

					<Container className="container mt-4">
						<Row>
							<Col>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Type:</label>
									<div className="col-sm-5">
										<Field as="select" name="typeId" className="form-select">
											<option value="">-- Select type --</option>
											{types.map((e) => (
												<option key={e.id} value={e.id}>
													{e.name}
												</option>
											))}
										</Field>
									</div>
								</div>

								<div className="row  mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Name:</label>
									<div className="col-sm-5">
										<Field type="text" name="name" className="form-control" placeholder="Enter facilities name" />
										<ErrorMessage name="name" style={{ color: "red" }} component="div" />
									</div>
								</div>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Bedroom(s):</label>
									<div className="col-sm-5">
										<Field type="text" name="information.bedroom" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bedroom" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Bed(s):</label>
									<div className="col-sm-5">
										<Field type="text" name="information.bed" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bed" style={{ color: "red" }} component="div" />
									</div>
								</div>
							</Col>

							<Col>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Bathroom(s):</label>
									<div className="col-sm-5">
										<Field type="text" name="information.bathroom" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bathroom" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Kitchen(s):</label>
									<div className="col-sm-5">
										<Field type="text" name="information.kitchen" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.kitchen" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Customer(s):</label>
									<div className="col-sm-5">
										<Field type="text" name="information.customer" className="form-control" placeholder="Enter max customer" />
										<ErrorMessage name="information.customer" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2">Price:</label>
									<div className="col-sm-5">
										<Field type="text" name="information.price" className="form-control" placeholder="Enter price" />
										<ErrorMessage name="information.price" style={{ color: "red" }} component="div" />
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<div className="ms-3 align-items-center">
								<label className="col-sm-2 mb-2 me-2">Upload photo:</label>
								<div className="col">
									<input type="file" className="form-control" />
								</div>
							</div>
						</Row>
					</Container>
					<ul className="nav nav-pills mt-3">
						<li className="nav-item">
							<Link type="button" className="btn btn me-2" id="buttonBack" to="/homepage/facilitiesList">
								Back
							</Link>
						</li>
						<button type="submit" className="btn btn mb-3 ms-2" id="buttonSubmit">
							Submit
						</button>
					</ul>
				</Form>
			</Formik>
		</div>
	);
}

export default AddComponent;
