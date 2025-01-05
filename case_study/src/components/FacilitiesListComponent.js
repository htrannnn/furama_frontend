import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { getAllFacilities, searchFacilitiesByName } from "../services/facilitiesServices";
import { getAllTypes } from "../services/typesService";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../constants";

function FacilitiesListComponent() {
	const [allFacilities, setAllFacilities] = useState([]);
	const [type, setType] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE); // PAGE_SIZE anh đang để là 3: tổng số bản ghi muốn lấy
	const [page, setPage] = useState(1); // trang (1) là trang đầu tiên
	const [totalPage, setTotalPage] = useState(0); // Biến này sẽ phải tính toán từ tổng số bản ghi đang có trong db chia cho tổng số bản ghi muốn lấy (Nhưng phải làm tròn lên thành số nguyên (Nếu không kết quả của biểu thức chia sẽ là số thực))

	useEffect(() => {
		const fetchData = async () => {
			// getAllFacilities trả về một mảng có 2 phần tử là mảng bản ghi và tổng số bản ghi có trong db
			// ở dưới sử dụng kỹ thuật destructuring array để tách thành 2 biến
			const [data, total] = await getAllFacilities(page, totalSize);
			setAllFacilities(data);
			setTotalPage(Math.ceil(total / totalSize));
			setType(await getAllTypes());
		};
		fetchData();
	}, [page]); // lưu ý phải có dependency là page để khi mà page cập nhật thì nó gọi lại cái hàm trong này

	const searchNameRef = useRef();
	const searchTypeRef = useRef();

	const handleSearch = async () => {
		let name = searchNameRef.current.value.trim();
		let typeId = searchTypeRef.current.value;

		setAllFacilities(await searchFacilitiesByName(name, typeId));
	};

	const handleFirst = () => {
		setPage(1); // cập nhật lại page về 1 là trang đầu tiên
	};

	const handleLast = () => {
		setPage(totalPage); // cập nhật lại page về cuối
	};

	const handlePrev = () => {
		setPage(page - 1); // giảm page hiện tại
	};

	const handleNext = () => {
		setPage(page + 1); // tăng page hiện tại
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
			{/* Chỗ này có thể tách riêng component cũng được để tái sử dụng, thì phải truyền 4 cái hàm xử lý sự kiện vào props của component con, xem lại code anh Chánh */}
			<div className="container my-4 d-flex justify-content-center">
				<Pagination>
					<Pagination.First onClick={handleFirst} disabled={page === 1} />
					<Pagination.Prev onClick={handlePrev} disabled={page === 1} />
					{[...new Array(totalPage)].map((e, index) => (
						<Pagination.Item active={page === index + 1} onClick={() => setPage(index + 1)}>
							{index + 1}
						</Pagination.Item>
					))}
					<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
					<Pagination.Last onClick={handleLast} disabled={page === totalPage} />
				</Pagination>
			</div>
		</div>
	);
}

export default FacilitiesListComponent;
