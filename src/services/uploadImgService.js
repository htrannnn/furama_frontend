import axios from "axios";

export async function uploadImg(file) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "upload-HTimg");
	formData.append("cloud_name", "dnkwhutve");
	try {
		const response = await fetch(`https://api.cloudinary.com/v1_1/dnkwhutve/image/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		return data.secure_url; // Trả về URL ảnh từ Cloudinary
	} catch (error) {
		console.error("Lỗi tải ảnh lên Cloudinary:", error);
		return null;
	}
}
