import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllBooking(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/bookings?_page=${page}&_limit=${limit}`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}
