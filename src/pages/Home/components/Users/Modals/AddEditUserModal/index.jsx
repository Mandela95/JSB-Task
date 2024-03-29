/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./addUserModal.modules.css";
// import { UsersList } from "../../UsersList";

const baseUrl = "https://dummyapi.io/data/v1";

export function AddEditUserModal({
	onClose,
	isShown,
	user,
	modal = "ADD",
	onEditSuccess,
}) {
	const [picture, setPicture] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState("");

	console.log(picture);
	function createUser() {
		fetch(`${baseUrl}/user/create`, {
			method: "POST",
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

	const editUser = (id) => {
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
				console.log("data", data);
				onEditSuccess(data);
				onClose();
			})
			.catch((err) => console.log(err));

		// fetch("https://dummyapi.io/data/v1/user/6607425867375e64911b97e5", {
		// 	method: "PUT",
		// 	headers: {
		// 		"app-id": "65fe32f389ba614599da8014",
		// 		"content-type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		firstName: "lolo",
		// 		lastName: "lool",
		// 		email: "dotdottt@dummy.com",
		// 	}),
		// })
		// 	.then((res) => res.json())
		// 	.then((d) => console.log(d))
		// 	.catch((e) => console.log(e));
	};

	const onSubmit = (e) => {
		console.log("before");
		e.preventDefault();
		console.log("after");
		const validationErrors = {};

		if (!firstName.trim()) {
			validationErrors.firstName = "firstName is required";
		}
		if (!lastName.trim()) {
			validationErrors.lastName = "lastName is required";
		}

		if (!email.trim()) {
			validationErrors.email = "email is required";
		}

		if (modal === "ADD") {
			createUser();
		} else {
			editUser(user.id);
		}
	};

	useEffect(() => {
		setPicture(user?.picture || "");
		setFirstName(user?.firstName || "");
		setLastName(user?.lastName || "");
		setEmail(user?.email || "");
	}, [user]);

	return (
		<>
			{isShown && (
				<div className="modal">
					<div className="overlay" onClick={onClose}>
						<div className="modalContent" onClick={(e) => e.stopPropagation()}>
							<div className="modalHeader">
								<img src={picture} alt="userImage" />
								<input
									type="file"
									title="Upload"
									onChange={(e) => {
										console.log(e.target.files[0]);
										setPicture(URL.createObjectURL(e.target.files[0]));
										// local image search
									}}
								/>
							</div>
							<button title="Close" className="closeModal" onClick={onClose}>
								X
							</button>
							<div className="formInputs">
								<input
									required
									type="text"
									placeholder="First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								{errors.firstName && <span>first name is required</span>}
								<input
									required
									type="text"
									placeholder="Last Name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
								{errors.lastName && <span>last name is required</span>}
								<input
									required
									type="text"
									placeholder="Phone Number"
									disabled
									// value={phoneNumber}
									// onChange={(e) => setLastName(e.target.value)}
								/>
								<input
									required
									type="text"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								{errors.email && <span>email is required</span>}
							</div>

							<div className="buttonsContainer">
								<button className="save addBtn" onClick={onSubmit}>
									{modal === "ADD" ? "Save" : "Update"}
								</button>
								<button className="cancel addBtn" onClick={onClose}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
