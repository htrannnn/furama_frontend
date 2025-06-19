import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllBooking(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}

export async function searchBooking(firstName, lastName, page, limit) {
	try {
		let response = [];
		if (firstName && lastName) {
			response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}&customer.firstName=${firstName}&customer.lastName=${lastName}`);
		} else if (firstName) {
			response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}&customer.firstName=${firstName}`);
		} else if (lastName) {
			response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}&customer.lastName=${lastName}`);
		} else {
			response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}`);
		}

		return [response.data, response.headers["x-total-count"]];
	} catch (error) {
		console.error(error);
		return [[], 0];
	}
}

export async function getBookingById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/bookings/${id}?_expand=facility`);
		return response.data;
	} catch (error) {}
}

export async function addNewBooking(booking) {
	try {
		const response = await axios.post(`${BASE_URL}/bookings`, booking);
		return response.data;
	} catch (error) {}
}

export async function deleteBookingByID(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/bookings/${id}`);
		return response.data;
	} catch (error) {}
}
