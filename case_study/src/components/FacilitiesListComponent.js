import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { getAllFacilities, searchFacilitiesByName } from "../services/facilitiesServices";
import { getAllTypes } from "../services/typesService";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../services/constants";

function FacilitiesListComponent() {
	const [allFacilities, setAllFacilities] = useState([]);
	const [type, setType] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE); //tổng bản ghi muốn lấy. Hiện tại constant cho PAGE_SIZE = 3
	const [page, setPage] = useState(1); //(1) là trang đầu tiên
	const [totalPage, setTotalPage] = useState(0); //tổng bản ghi trong db chia tổng bản ghi muốn lấy (làm tròn đến số nguyên, nếu không kết quả chia sẽ là số thực)

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllFacilities(page, totalSize); //có thể hiểu là (1,3)
			//data: dữ liệu từng mảng trong facilities
			//total:s tổng số bản ghi trong facilities

			setAllFacilities(data);
			setTotalPage(Math.ceil(total / totalSize));
			setType(await getAllTypes());
		};
		fetchData();
	}, [page]);
	//truyền page vào để fetch lại dữ liệu mỗi khi page thay đổi

	const searchNameRef = useRef();
	const searchTypeRef = useRef();

	const handleSearch = async () => {
		let name = searchNameRef.current.value.trim();
		let typeId = searchTypeRef.current.value;

		setAllFacilities(await searchFacilitiesByName(name, typeId));
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

	return (
		<div>
			<div className="mb-4" id="titleImg">
				<h1 className="text-center shadow p-3 mb-5" id="titleText">
					WELCOME TO FURAMA RESORT
				</h1>
			</div>
			<div className="container">
				<div className="d-flex align-items-center mb-4">
					<div className="flex-grow-1 text-center">
						<h2>FACILITIES</h2>
					</div>
					<div className="flex-shrink-0">
						<div className="input-group mb-3">
							<input name="searchName" className="form-control" placeholder="Enter name" ref={searchNameRef} />
							<select className="form-select" name="searchType" id="type" ref={searchTypeRef}>
								<option value="">All</option>
								{type.map((event) => (
									<option key={event.id} value={event.id}>
										{event.name}
									</option>
								))}
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
					{allFacilities &&
						allFacilities.map((villa) => (
							<Col key={villa.id}>
								<Link to={"/facilitiesList/detail/" + villa.id} className="cardDetail">
									<Card>
										<Card.Img variant="top" src={villa.imgSrc} alt={villa.imgAlt} style={{ height: 250 }} />
										<Card.Body>
											<Card.Title>{villa.name}</Card.Title>
											<Card.Text>
												<span>{villa.information.bedroom} bedroom(s)</span> · <span>{villa.information.bed} bed(s)</span> ·{" "}
												<span>{villa.information.bathroom} bathroom(s)</span>
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))}
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
		</div>
	);
}

export default FacilitiesListComponent;
