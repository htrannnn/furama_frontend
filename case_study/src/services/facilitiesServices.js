import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/facilities?_page=${page}&_limit=${limit}&_expand=type`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}
//Header này chứa tổng số bản ghi trong database, bất kể giới hạn trang.
//Ví dụ: Nếu có 50 bản ghi trong database, x-total-count = 50.

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

export async function addNewFacilities(facilities) {
	try {
		console.log("Data sent to database:", facilities);
		const response = await axios.post(`${BASE_URL}/facilities`, facilities);
		return response.data;
	} catch (error) {}
}

export async function deleteById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/facilities/${id}`);
		return response.data;
	} catch (error) {}
}
