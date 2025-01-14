import React, { useState } from 'react';
import { useUsers } from '../context/userContext';
import { Link } from 'react-router-dom';

const UserListPage = () => {
    const { users, currentPage, totalPages, setCurrentPage, removeUser, handleSearchChange, searchQuery } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const openModal = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const confirmDelete = () => {
        if (userToDelete) removeUser(userToDelete.id);
        closeModal();
    };

    return (
        <div className="container mt-4">
            <h2>User List</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td>
                                <Link to={`/user/${user.id}`} className="btn btn-info btn-sm">Edit</Link>
                                <button onClick={() => openModal(user)} className="btn btn-danger btn-sm ms-2">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No users found</td>
                    </tr>
                )}
                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} onClick={closeModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this user?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserListPage;
