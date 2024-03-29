/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./userCard.modules.css";

const baseUrl = "https://dummyapi.io/data/v1";

export function UserCard({ user, onDeleteSuccess, setModal, setSelectedUser }) {
	const deleteUser = (id) => {
		fetch(`${baseUrl}/user/${id}`, {
			method: "DELETE",
			headers: {
				"app-id": "65fe32f389ba614599da8014",
				"content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(() => {
				onDeleteSuccess(user.id);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="contactCard">
			<div className="personalContent">
				<div>
					<img
						src={user.picture}
						alt="contactImage"
						loading="lazy"
						title={`${user.firstName}`}
					/>
				</div>
				<div>
					<h3>{user.firstName}</h3>
					<h4>{user.lastName}</h4>
				</div>
			</div>
			<div className="icons">
				<FaEdit
					className="edit"
					title="edit"
					onClick={() => {
						setSelectedUser(user);
						setModal("EDIT");
					}}
				/>
				<RiDeleteBin6Line
					className="delete"
					title="delete"
					onClick={() => {
						deleteUser(user.id);
					}}
				/>
			</div>
		</div>
	);
}
