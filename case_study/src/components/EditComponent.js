import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllTypes } from "../services/typesService";
import { getFacilitiesById, updateFacilities } from "../services/facilitiesServices";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function EditComponent(props) {
	const [facilities, setFacilities] = useState(null);
	//null để lấy lại dữ liệu

	const [types, setTypes] = useState([]);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			console.log(await getFacilitiesById(id));
			setFacilities(await getFacilitiesById(id));
			setTypes(await getAllTypes());
		};
		fetchData();
	}, [id]);

	const handleSubmit = async (values) => {
		await updateFacilities(values.id, values);
		props.handleClose();
		props.handleUpdate();
		navigate(`/facilities/detail/${values.id}`);
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

	if (facilities == null) {
		return "";
	}
	return (
		<div className="container">
			<Modal show={props.showEdit} onHide={props.handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
				<Modal.Header closeButton>
					<Modal.Title className="w-100 text-center">
						<h2 className="mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>
							EDIT {facilities?.name}
						</h2>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={handleValidate}>
						<Form>
							<Container className="container mt-3">
								<Row>
									<Col>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Type:</label>
											<div className="col-sm-6">
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
											<label className="col-sm-3 me-2 fw-semibold">Name:</label>
											<div className="col-sm-6">
												<Field type="text" name="name" className="form-control" placeholder="Enter facilities name" />
												<ErrorMessage name="name" style={{ color: "red" }} component="div" />
											</div>
										</div>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Bedroom(s):</label>
											<div className="col-sm-6">
												<Field type="text" name="information.bedroom" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.bedroom" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Bed(s):</label>
											<div className="col-sm-6">
												<Field type="text" name="information.bed" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.bed" style={{ color: "red" }} component="div" />
											</div>
										</div>
									</Col>

									<Col>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Bathroom(s):</label>
											<div className="col-sm-6">
												<Field type="text" name="information.bathroom" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.bathroom" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Kitchen(s):</label>
											<div className="col-sm-6">
												<Field type="text" name="information.kitchen" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.kitchen" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Guests:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.customer" className="form-control" placeholder="Enter max customer" />
												<ErrorMessage name="information.customer" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-3 me-2 fw-semibold">Price:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.price" className="form-control" placeholder="Enter price" />
												<ErrorMessage name="information.price" style={{ color: "red" }} component="div" />
											</div>
										</div>
									</Col>
								</Row>
							</Container>

							<button type="submit" className="btn btn mt-3 mb-3 ms-4" id="buttonSubmit">
								Submit
							</button>
						</Form>
					</Formik>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default EditComponent;
