import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/facilities?_page=${page}&_limit=${limit}&_expand=type`);
		// x-total-count mình lấy được ở trong header do API trả về, cái này xem tài liệu hoặc bài anh Chánh làm mới biết
		return [response.data, response.headers["x-total-count"]];
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

export async function getFacilitiesById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/facilities/${id}`);
		return response.data;
	} catch (error) {}
}

export async function updateFacilities(id, facilities) {
	try {
		const response = await axios.put(`${BASE_URL}/facilities/${id}`, facilities);
		return response.data;
	} catch (error) {}
}
