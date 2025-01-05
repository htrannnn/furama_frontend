import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllTypes() {
	try {
		const response = await axios.get(`${BASE_URL}/types`);
		return response.data;
	} catch (error) {}
}

export async function getTypeById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/types/${id}`);
		return response.data;
	} catch (error) {}
}
