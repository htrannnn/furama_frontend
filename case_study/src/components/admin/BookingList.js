import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../services/constants";
import { deleteBookingByID, getAllBooking, searchBooking } from "../../services/bookingsService";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import CustomSelect from "../user/CustomSelect";
import { BiSearchAlt2 } from "react-icons/bi";
import { RxReload } from "react-icons/rx";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Bounce, toast } from "react-toastify";
import DeleteBooking from "./DeleteBooking";

function BookingList() {
	const [allBooking, setAllBooking] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [selectedFirstName, setSelectedFirstName] = useState(null);
	const [selectedLastName, setSelectedLastName] = useState(null);
	const [reload, setReload] = useState(true);
	const [show, setShow] = useState(false);
	const [deleteBooking, setDeleteBooking] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllBooking(page, totalSize);

			setAllBooking(data);
			setTotalPage(Math.ceil(total / PAGE_SIZE));
		};
		window.scrollTo(0, 0);
		fetchData();
	}, [page, reload, show]);

	const reloadData = () => {
		setReload(!reload);
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

	const handleShow = (booking) => {
		setShow(true);
		setDeleteBooking(booking);
	};

	const handleClose = (booking) => {
		setShow(false);
		setDeleteBooking({});
	};

	const handleDelete = async () => {
		try {
			await deleteBookingByID(deleteBooking.id);
			handleClose();
			toast.success("Booking deleted successfully!", {
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

	const handleSearch = async () => {
		let firstName = selectedFirstName?.label;
		let lastName = selectedLastName?.label;

		const [data, total] = await searchBooking(firstName, lastName, page, PAGE_SIZE);
		setTotalPage(Math.ceil(total / PAGE_SIZE));
		setAllBooking(data);
	};

	return (
		<>
			<div className="mb-4" id="bookingPageImg">
				<h1 className="text-center p-3 mt-5 mb-5" id="bookingPageText" style={{ fontFamily: "serif" }}>
					BOOKING MANAGEMENT
				</h1>
			</div>
			<div className="mx-5 mb-2">
				<div className="d-flex mb-4">
					<div className="w-50 justify-content-start">
						<Link className="btn btn-outline-secondary me-2 rounded-1" type="button" id="buttonAddBooking">
							<AiOutlineUsergroupAdd style={{ fontSize: "25px" }} title="AddBooking" />
							New Booking
						</Link>
					</div>

					<div className="input-group justify-content-end">
						<CustomSelect
							options={allBooking.map((event) => ({ value: event.id, label: event?.customer?.firstName }))}
							value={selectedFirstName}
							placeholder="Enter First Name"
							onSelect={(option) => setSelectedFirstName(option)}
						/>
						<CustomSelect
							options={allBooking.map((e) => ({ value: e.id, label: e?.customer?.lastName }))}
							value={selectedLastName}
							placeholder="Enter Last Name"
							onSelect={(option) => setSelectedLastName(option)}
						/>
						<button className="btn btn-outline-secondary me-2 rounded-1" type="button" onClick={handleSearch} id="buttonSearch">
							<BiSearchAlt2 style={{ fontSize: "25px" }} title="Search" />
						</button>

						<button className="btn btn-outline-secondary me-2 rounded-1" type="button" id="buttonReload" onClick={reloadData}>
							<RxReload style={{ fontSize: "25px" }} title="Reload" />
						</button>
					</div>
				</div>

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
						{allBooking.length === 0 ? (
							<tr>
								<td colSpan="8" className="text-center">
									No data
								</td>
							</tr>
						) : (
							allBooking.map((booking, i) => (
								<tr className="align-middle">
									<td className="text-center">{+i + 1}</td>
									<td className="text-left">{booking?.customer?.firstName}</td>
									<td className="text-left">{booking?.customer?.lastName}</td>
									<td className="text-left">{booking?.customer?.phone}</td>
									<td className="text-center">{booking?.adult + booking?.children}</td>
									<td className="text-left">{booking?.startDate}</td>
									<td className="text-left">{booking?.endDate}</td>
									<td className="text-center d-flex justify-content-center gap-2">
										<Link type="button" className="btn btn" id="btnDetailBooking" to={"/booking/detail/" + booking.id}>
											Detail
										</Link>
										<Link type="button" className="btn btn" id="btnEditBooking">
											Edit
										</Link>
										<button type="button" className="btn btn-danger pb-2" onClick={() => handleShow(booking)}>
											<MdDelete />
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

			<DeleteBooking show={show} booking={deleteBooking} handleClose={handleClose} handleDelete={handleDelete} />
		</>
	);
}

export default BookingList;
