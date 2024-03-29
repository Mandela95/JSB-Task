/* eslint-disable react/prop-types */
import { IoMdAdd } from "react-icons/io";
import "./button.modules.css";

function Button({ color, backgroundColor, title, showIcon, onClick }) {
	return (
		<div className="btnContainer">
			{showIcon && <IoMdAdd className="addIcon" onClick={onClick} />}
			<button
				className="addBtn"
				title={title}
				style={{ color, backgroundColor }}
				onClick={onClick}
			>
				{title}
			</button>
		</div>
	);
}

export default Button;
