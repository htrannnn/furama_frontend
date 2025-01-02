import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities() {
	try {
		const response = await axios.get(`${BASE_URL}/facilities?_expand=type`);
		return response.data;
	} catch (error) {}
}

export async function searchFacilitiesByName(name, typeId) {
	try {
		let response = [];
		if (name && typeId) {
			response = await axios.get(`${BASE_URL}/facilities?typeId=${typeId}&name_like=${name}`);
		} else if (name) {
			response = await axios.get(`${BASE_URL}/facilities?name_like=${name}`);
		} else if (typeId) {
			response = await axios.get(`${BASE_URL}/facilities?typeId=${typeId}`);
		} else {
			response = await axios.get(`${BASE_URL}/facilities`);
		}

		return response.data;
	} catch (error) {}
}
