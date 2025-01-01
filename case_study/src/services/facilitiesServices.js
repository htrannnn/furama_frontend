import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities(search) {
	try {
		let response = [];
		if (search.type && search.query) {
			response = await axios.get(`${BASE_URL}/facilities?typeId=${search.type}&name_like=${search.query}`);
		} else if (search.type) {
			response = await axios.get(`${BASE_URL}/facilities?typeId=${search.type}`);
		} else if (search.query) {
			response = await axios.get(`${BASE_URL}/facilities?name_like=${search.query}`);
		} else {
			response = await axios.get(`${BASE_URL}/facilities`);
		}
		return response.data;
	} catch (error) {}
}
