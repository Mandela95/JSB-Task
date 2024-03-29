/* eslint-disable react/prop-types */
import "./search.modules.css";
export function Search({ value, onChange }) {
	return (
		<>
			<div className="search">
				<input
					value={value}
					className="searchInput"
					type="text"
					placeholder="Search by Name"
					onChange={onChange}
				/>
			</div>
		</>
	);
}
