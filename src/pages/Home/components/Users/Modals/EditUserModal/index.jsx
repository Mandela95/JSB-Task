import React, { useState } from "react";
import "./editUserModal.modules.css";

const baseUrl = "https://dummyapi.io/data/v1";

export function EditUserModal({ onClose, isShown }) {
	const [picture, setPicture] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	function editUser(id) {
		fetch(`${baseUrl}/user/${id}`, {
			method: "PUT",
			headers: {
				"app-id": "65fe32f389ba614599da8014",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				picture,
				firstName,
				lastName,
				email,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				onClose();
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			{isShown && (
				<form className="modal">
					<div className="modalContent">
						<div className="modalHeader">
							<img src={picture} alt="userImage" />
							<input
								type="file"
								title="Upload"
								onChange={(e) => {
									setPicture(URL.createObjectURL(e.target.files[0]));
									// local image search
								}}
							/>
						</div>
						<div className="formInputs">
							<input
								required
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								required
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<button title="Close" className="closeModal" onClick={onClose}>
							X
						</button>
						<div className="buttonsContainer">
							<button className="cancel addBtn" onClick={onClose}>
								Cancel
							</button>
							<button
								className="save update addBtn"
								onClick={(user) => editUser(user.id)}
							>
								Update
							</button>
						</div>
					</div>
				</form>
			)}
		</>
	);
}
