/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./usersList.modules.css";
import { UserCard } from "../UserCard";
import Button from "../../../../../components/Button";
import { AddEditUserModal } from "../Modals/AddEditUserModal";
import { Search } from "../../../../../components/Search";

export const baseUrl = "https://dummyapi.io/data/v1/user";

export function UsersList() {
	const [users, setUsers] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const [filteredUsers, setFilteredUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	// to be done
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const [modal, setModal] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

	const limit = 5;

	useEffect(() => {
		setIsLoading(true);
		fetch(`${baseUrl}?limit=${limit}&page=${page - 1}`, {
			method: "GET",
			headers: {
				"app-id": "65fe32f389ba614599da8014",
			},
		})
			.then((res) => {
				setIsLoading(false);
				if (!res.ok) {
					throw new Error("couldn't fetch data");
				}
				return res.json();
			})
			.then((result) => {
				setUsers(result.data);
				setTotalPages(Math.ceil(result.total / limit));
			})
			.catch(() => {
				setIsLoading(true);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [page]);

	useEffect(() => {
		setFilteredUsers(
			users.filter((user) => {
				return user.firstName
					.toLowerCase()
					.includes(searchValue.trim().toLowerCase());
			})
		);
	}, [searchValue, users]);

	const onPreviousPage = () => {
		setPage(page - 1);
		setSearchValue("");
	};

	const onNextPage = () => {
		setPage(page + 1);
		setSearchValue("");
	};

	return (
		<>
			<div className="content">
				<div className="contentContainer">
					<Search
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<Button
						color="#fff"
						title="Add New Contact"
						showIcon={true}
						onClick={() => setModal("ADD")}
					/>
					{/* ? in case of null or undefined */}
					{users?.length > 0 && (
						<div className="container">
							{filteredUsers
								// .slice(page * 2 - 2, page * 2)
								.map((user) => {
									return (
										<UserCard
											key={user.id}
											user={user}
											setModal={setModal}
											setSelectedUser={setSelectedUser}
											onDeleteSuccess={(id) =>
												setFilteredUsers(
													filteredUsers.filter((u) => u.id !== id)
												)
											}
										/>
									);
								})}
						</div>
					)}
					{users?.length > 0 && (
						<div className="pagination">
							<button
								disabled={page === 1}
								onClick={onPreviousPage}
								className="previous"
								title="Previous Page"
							>
								&lt;
							</button>
							<div>
								{page} / {totalPages}
							</div>
							<button
								disabled={page === totalPages}
								onClick={onNextPage}
								className="next"
								title="Next page"
							>
								&gt;
							</button>
						</div>
					)}

					<AddEditUserModal
						modal={modal}
						user={selectedUser}
						onEditSuccess={(updatedUser) => {
							const userIndex = filteredUsers.findIndex(
								(user) => user.id === updatedUser.id
							);
							const newFilteredUsers = [
								...filteredUsers.slice(0, userIndex),
								updatedUser,
								...filteredUsers.slice(userIndex, filteredUsers.length - 1),
							];
							setFilteredUsers(newFilteredUsers);
						}}
						onClose={() => {
							setModal(null);
							setSelectedUser(null);
						}}
						isShown={modal}
					/>
				</div>
			</div>
		</>
	);
}
