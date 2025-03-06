import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { deleteById, getAllFacilities, searchFacilities } from "../services/facilitiesServices";
import { getAllTypes } from "../services/typesService";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../services/constants";
import DeleteComponent from "./DeleteComponent";
import { Bounce, toast } from "react-toastify";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

function RoomsComponent() {
	const [allFacilities, setAllFacilities] = useState([]);
	const [type, setType] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE); //tổng bản ghi muốn lấy. Hiện tại constant cho PAGE_SIZE = 3
	const [page, setPage] = useState(1); //(1) là trang đầu tiên
	const [totalPage, setTotalPage] = useState(0); //tổng bản ghi trong db chia tổng bản ghi muốn lấy (làm tròn đến số nguyên, nếu không kết quả chia sẽ là số thực)
	const [selectedFacilities, setSelectedFacilities] = useState(null);
	const [show, setShow] = useState(false);
	const [deleteFacilities, setDeleteFacilities] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllFacilities(page, totalSize); //có thể hiểu là (1,3)
			//data: dữ liệu từng mảng trong facilities
			//total: tổng số bản ghi trong facilities

			setAllFacilities(data);
			setTotalPage(Math.ceil(total / PAGE_SIZE));
			setType(await getAllTypes());
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [page, show]);
	//truyền page vào để fetch lại dữ liệu mỗi khi page thay đổi

	const account = useSelector((state) => state?.account?.account);

	const searchTypeRef = useRef();

	const handleSearch = async () => {
		let id = selectedFacilities?.value;
		let typeId = searchTypeRef.current.value;

		const [data, total] = await searchFacilities(id, typeId, page, PAGE_SIZE);
		setTotalPage(Math.ceil(total / PAGE_SIZE));
		setAllFacilities(data);
	};

	const handleFirst = () => {
		setPage(1); //page đầu tiên luôn là 1
	};
	const handlePrev = () => {
		setPage(page - 1); //page hiện tại -1, trở về trước
	};
	const handleNext = () => {
		setPage(page + 1); //page hiện tại +1, tiến 1
	};
	const handleLast = () => {
		setPage(totalPage); //không thể biết trước được trang cuối nên Last sẽ bằng totalPage
	};

	const handleShow = (facilities) => {
		setShow(true);
		setDeleteFacilities(facilities);
	};

	const handleClose = (facilities) => {
		setShow(false);
		setDeleteFacilities({});
	};

	const handleDelete = async () => {
		try {
			await deleteById(deleteFacilities.id);
			handleClose();
			toast.success("Deleted successfully!", {
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
		} catch (error) {}
	};

	return (
		<>
			<div className="mb-4" id="roomsPageImg">
				<h1 className="text-center shadow p-3 mt-5 mb-5" id="roomsPageText" style={{ fontFamily: "serif" }}>
					ROOMS & SUITES
				</h1>
			</div>
			<div className="mx-5 mb-2">
				<div className="d-flex flex-row-reverse">
					<div className="input-group mb-4 w-50">
						{/* <input name="searchName" className="form-control" placeholder="Enter name" ref={searchNameRef} /> */}
						<CustomSelect
							options={allFacilities.map((event) => ({ value: event.id, label: event.name }))}
							value={selectedFacilities}
							onSelect={(option) => setSelectedFacilities(option)}
						/>
						<select className="form-select" name="searchType" id="type" ref={searchTypeRef}>
							<option value="">All</option>
							{type.map((event) => (
								<option key={event.id} value={event.id}>
									{event.name}
								</option>
							))}
						</select>
						<button className="btn btn-outline-secondary me-2 rounded-1" type="button" onClick={handleSearch} id="buttonSearch">
							<BiSearchAlt2 style={{ fontSize: "25px" }} title="Search" />
						</button>
						{account && (
							<Link className="btn btn-outline-secondary rounded-1" type="button" id="buttonAdd" to="/room/add">
								<IoMdAdd style={{ fontSize: "18px" }} className="mb-1" /> Add Facilities
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="mx-5 mb-5">
				<Row xs={1} md={3} className="g-4">
					{allFacilities?.length > 0 ? (
						allFacilities &&
						allFacilities.map((facilities) => (
							<Col key={facilities.id} handleShow={handleShow} facilities={facilities}>
								<Card>
									<Card.Img variant="top" src={facilities.image} alt={facilities.imgAlt} style={{ height: 250 }} />
									<Card.Body>
										<Card.Title>
											<Link to={"/room/detail/" + facilities.id} className="cardDetail">
												{facilities.name}
											</Link>
										</Card.Title>

										<Card.Text>
											<span>{facilities.information.bedroom} bedroom(s)</span> · <span>{facilities.information.bed} bed(s)</span> ·{" "}
											<span>{facilities.information.bathroom} bathroom(s)</span>
										</Card.Text>

										{account && (
											<button type="button" className="btn btn rounded-1 mt-2" id="buttonDelete" onClick={() => handleShow(facilities)}>
												Delete
											</button>
										)}
									</Card.Body>
								</Card>
							</Col>
						))
					) : (
						<p className="fw-semibold" style={{ fontSize: "24px" }}>
							Không có dữ liệu
						</p>
					)}
				</Row>
			</div>
			<Pagination className="container my-4 d-flex justify-content-center" id="pagination">
				<Pagination.First onClick={handleFirst} disabled={page === 1} />
				<Pagination.Prev onClick={handlePrev} disabled={page === 1} />

				{/* tạo một mảng có totalPage phần tử. Duyệt qua từng phần tử của mảng, mỗi index đại diện cho số thứ tự của trang. */}
				{[...new Array(totalPage)].map((e, index) => (
					<Pagination.Item active={page === index + 1} onClick={() => setPage(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}

				<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
				<Pagination.Last onClick={handleLast} disabled={page === totalPage} />
			</Pagination>

			<DeleteComponent show={show} facilities={deleteFacilities} handleClose={handleClose} handleDelete={handleDelete} />
		</>
	);
}

export default RoomsComponent;
