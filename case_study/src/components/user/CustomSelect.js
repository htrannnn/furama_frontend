import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

function CustomSelect({ options, onSelect, placeholder = "Enter name", value }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		setSearchTerm(value ? value.label : "");
	}, [value]);

	const handleSearchChange = (e) => {
		const value = e.target.value.toLowerCase();
		setSearchTerm(value);

		setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(value)));
	};

	const handleOptionSelect = (option) => {
		onSelect(option);
		setSearchTerm(option.label);
		setIsDropdownOpen(false);
	};

	return (
		<Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen}>
			<Dropdown.Toggle
				as={FormControl}
				type="text"
				value={searchTerm}
				onChange={handleSearchChange}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				placeholder={placeholder}
			/>

			<Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
				{filteredOptions.length > 0 ? (
					filteredOptions.map((option) => (
						<Dropdown.Item key={option.value} onClick={() => handleOptionSelect(option)}>
							{option.label}
						</Dropdown.Item>
					))
				) : (
					<Dropdown.Item disabled>No result</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default CustomSelect;
