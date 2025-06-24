import { useEffect } from "react";

function calculateTotalPrice(startDate, endDate, pricePerDay) {
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (!isNaN(start) && !isNaN(end) && end > start && !isNaN(pricePerDay)) {
		const days = Math.ceil((end - start) / (1000 * 3600 * 24));
		const total = days * pricePerDay;

		return total;
	}

	return 0;
}

const PriceComponent = ({ startDate, endDate, selectedFacility, setFieldValue }) => {
	useEffect(() => {
		const pricePerDay = selectedFacility?.information?.price;

		if (typeof pricePerDay === "number" && !isNaN(pricePerDay)) {
			setFieldValue("pricePerDay", pricePerDay);
		}
	}, [selectedFacility, setFieldValue]);

	useEffect(() => {
		const pricePerDay = selectedFacility?.information?.price;

		if (startDate && endDate && typeof pricePerDay === "number" && !isNaN(pricePerDay)) {
			const total = calculateTotalPrice(startDate, endDate, pricePerDay);
			setFieldValue("totalPrice", total);
		}
	}, [startDate, endDate, selectedFacility, setFieldValue]);

	return null;
};

export default PriceComponent;
