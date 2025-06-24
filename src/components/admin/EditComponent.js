import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllTypes } from "../../services/typesService";
import { getFacilitiesById, updateFacilities } from "../../services/facilitiesServices";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Bounce, toast } from "react-toastify";

function EditComponent(props) {
	const [facilities, setFacilities] = useState(null);
	//null để lấy lại dữ liệu

	const [types, setTypes] = useState([]);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setFacilities(await getFacilitiesById(id));
			setTypes(await getAllTypes());
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [id]);

	const handleSubmit = async (values) => {
		await updateFacilities(values.id, values);
		toast.success("Modified successfully!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Bounce,
		});
		props.handleClose();
		props.handleUpdate();
		navigate(`/room/detail/${values.id}`);
	};

	const notificationSchema = Yup.object().shape({
		bedroom: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bedroom not valid"),

		kingBed: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bed not valid"),

		queenBed: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bed not valid"),

		singleBed: Yup.string()
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

		price: Yup.string().required("Empty").min(0, "Greater than or equal to 0"),
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
								<h3 className="ms-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>
									Facilities Information
								</h3>
								<Row>
									<Col>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Type:</label>
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
											<label className="col-sm-4 fw-semibold">Name:</label>
											<div className="col-sm-6">
												<Field type="text" name="name" className="form-control" placeholder="Enter facilities name" />
												<ErrorMessage name="name" style={{ color: "red" }} component="div" />
											</div>
										</div>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Bedrooms:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.bedroom" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.bedroom" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">King Beds:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.kingBed" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.kingBed" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Queen Beds:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.queenBed" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.queenBed" style={{ color: "red" }} component="div" />
											</div>
										</div>
									</Col>

									<Col>
										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Single Beds:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.singleBed" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.singleBed" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Bathrooms:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.bathroom" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.bathroom" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Kitchens:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.kitchen" className="form-control" placeholder="Enter number" />
												<ErrorMessage name="information.kitchen" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Guests:</label>
											<div className="col-sm-6">
												<Field type="text" name="information.customer" className="form-control" placeholder="Enter max customer" />
												<ErrorMessage name="information.customer" style={{ color: "red" }} component="div" />
											</div>
										</div>

										<div className="row mb-3 ms-1 align-items-center">
											<label className="col-sm-4 fw-semibold">Price:</label>
											<div className="col-sm-6">
												<Field name="information.price">
													{({ field, form }) => {
														const rawValue = field.value;
														const formattedValue =
															rawValue !== undefined && rawValue !== null && rawValue !== "" ? Number(rawValue).toLocaleString("en-US") : "";

														return (
															<input
																type="text"
																className="form-control"
																placeholder="Enter price"
																value={formattedValue}
																onChange={(e) => {
																	const noComma = e.target.value.replace(/,/g, "");
																	if (!isNaN(noComma)) {
																		form.setFieldValue("information.price", Number(noComma));
																	}
																}}
															/>
														);
													}}
												</Field>
												<ErrorMessage name="information.price" style={{ color: "red" }} component="div" />
											</div>
										</div>
									</Col>
								</Row>

								<h3 className="ms-3 mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>
									Facilities Describe
								</h3>
								<Row className="ms-1">
									<label className="col-sm-1 fw-semibold" style={{ marginRight: "38px" }}>
										Area:
									</label>
									<div className="col-sm-6">
										<Field type="text" name="area" className="form-control" placeholder="Enter area" />
									</div>
								</Row>
								<Row className="ms-1 mt-3">
									<label className="col-sm-1 fw-semibold" style={{ marginRight: "38px" }}>
										Describe:
									</label>
									<div className="col-sm-9">
										<Field as="textarea" rows="3" name="describe" className="form-control" placeholder="Enter description" />
									</div>
								</Row>
								<Row className="ms-1 mt-3">
									<label className="col-sm-1 fw-semibold" style={{ marginRight: "38px" }}>
										Detail:
									</label>
									<div className="col-sm-9">
										<Field as="textarea" rows="3" name="detail" className="form-control" placeholder="Enter detail" />
									</div>
								</Row>
								<Row className="ms-1 mt-3">
									<label className="col-sm-1 fw-semibold" style={{ marginRight: "38px" }}>
										View:
									</label>
									<div className="col-sm-9">
										<Field as="textarea" rows="3" name="view" className="form-control" placeholder="Enter view describe" />
									</div>
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
