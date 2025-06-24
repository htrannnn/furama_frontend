import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteBooking(props) {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Booking</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Sure to delete booking of{" "}
					<strong>
						{props.booking?.customer?.firstName} {props.booking?.customer?.lastName}{" "}
					</strong>
					?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Close
					</Button>
					<Button variant="danger" onClick={props.handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteBooking;
