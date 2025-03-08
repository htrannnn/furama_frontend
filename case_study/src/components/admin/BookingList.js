import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../services/constants";
import { getAllBooking } from "../../services/bookingsService";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

function BookingList() {
	const [booking, setBooking] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllBooking(page, totalSize);

			setBooking(data);
			setTotalPage(Math.ceil(total / PAGE_SIZE));
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [page]);

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
		<>
			<div className="mb-4" id="bookingPageImg">
				<h1 className="text-center p-3 mt-5 mb-5" id="bookingPageText" style={{ fontFamily: "serif" }}>
					BOOKING
				</h1>
			</div>
			<div className="mx-5 mb-2">
				<table className="table table-bordered table-hover" id="bookingTable">
					<thead className="" style={{ borderBottom: "3px solid #a7b9b1" }}>
						<tr className="table-success">
							<th className="text-center">ID</th>
							<th className="text-center">First Name</th>
							<th className="text-center">Last Name</th>
							<th className="text-center">Phone Number</th>
							<th className="text-center">Guests</th>
							<th className="text-center">Start Date</th>
							<th className="text-center">End Date</th>
							<th className="text-center"></th>
						</tr>
					</thead>
					<tbody>
						{booking.length === 0 ? (
							<tr>
								<td colSpan="8" className="text-center">
									No data
								</td>
							</tr>
						) : (
							booking.map((booking, i) => (
								<tr className="align-middle">
									<td className="text-center">{+i + 1}</td>
									<td className="text-left">{booking?.customer?.firstName}</td>
									<td className="text-left">{booking?.customer?.lastName}</td>
									<td className="text-left">{booking?.customer?.phone}</td>
									<td className="text-center">{booking?.guests}</td>
									<td className="text-left">{booking?.startDate}</td>
									<td className="text-left">{booking?.endDate}</td>
									<td className="text-center d-flex justify-content-center gap-2">
										<Link type="button" className="btn btn" id="btnDetailBooking">
											Chi tiết
										</Link>
										<Link type="button" className="btn btn" id="btnEditBooking">
											Sửa
										</Link>
										<button type="button" className="btn btn-danger">
											Xóa
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<Pagination className="container my-4 d-flex justify-content-center" id="pagination">
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
		</>
	);
}

export default BookingList;
