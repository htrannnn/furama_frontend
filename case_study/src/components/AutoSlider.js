import React, { useState, useEffect } from "react";
import sliderData, { sliderText } from "../data/introduceData";

function AutoSlider() {
	const [index, setIndex] = useState(0);

	// Xử lý vòng lặp ảnh
	useEffect(() => {
		const lastIndex = sliderData.length - 1;
		if (index < 0) {
			setIndex(lastIndex);
		}
		if (index > lastIndex) {
			setIndex(0);
		}
	}, [index]);

	// Auto slide mỗi 5s
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="slider-container">
			<div className="slider-wrapper">
				{sliderData.map((item, imageIndex) => {
					return (
						<div
							key={item.id}
							className={`slide ${imageIndex === index ? "activeSlide" : "inactiveSlide"}`}
							style={{ backgroundImage: `url(${item.image})` }}
						>
							<div className="text-overlay ms-5">
								<strong>{sliderText.line_1}</strong>
								<br />
								<strong>{sliderText.line_2}</strong>
								<br />
								<strong>{sliderText.line_3}</strong>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default AutoSlider;
