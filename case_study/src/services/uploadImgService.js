import axios from "axios";

export async function uploadImg(file) {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "upload-HTimg");

		const response = await axios.post("https://api.cloudinary.com/v1_1/dnkwhutve/image/upload", formData);
		return response.data.secure_url;
	} catch (error) {
		console.error("Upload failed:", error);
		return null;
	}
}
