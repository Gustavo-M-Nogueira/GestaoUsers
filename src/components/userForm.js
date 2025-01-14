// pages/UserFormPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/userContext';

const UserFormPage = () => {
    const { id } = useParams(); // Get user ID from URL
    const { users, updateUserState } = useUsers(); // Access user context
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        company: { name: '' },
        address: { street: '', suite: '', city: '', zipcode: '' },
    });
    const navigate = useNavigate();

    // Load user data for editing when user ID is present
    useEffect(() => {
        if (id) {
            const user = users.find((user) => user.id === parseInt(id));
            if (user) {
                setUserData(user); // Populate form with user data
            }
        }
    }, [id, users]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if updateUserState is being called properly
            if (updateUserState) {
                await updateUserState(id, userData); // Update user in API and context
                navigate('/'); // Redirect to user list
            } else {
                console.error("updateUserState is not a function");
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">{id ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for user data */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        value={userData.website}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserFormPage;
