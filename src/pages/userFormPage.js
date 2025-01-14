import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/userContext';

const UserFormPage = () => {
    const { id } = useParams(); // Get user ID from URL
    const { users, updateUserDetails, addUser } = useUsers(); // Access user context
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        company: { name: '' },
        address: { street: '', suite: '', city: '', zipcode: '' },
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

    const validateForm = () => {
        const newErrors = {};
        if (!userData.name.trim()) newErrors.name = 'Name is required.';
        if (!userData.username.trim()) newErrors.username = 'Username is required.';
        if (!userData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!userData.phone.trim()) newErrors.phone = 'Phone is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (id) {
                    await updateUserDetails(id, userData); // Update existing user
                } else {
                    await addUser(userData); // Add new user
                }
                navigate('/'); // Redirect to user list
            } catch (error) {
                console.error('Error saving user:', error);
            }
        }
    };

    return (
        <div className="container mt-5 mb-5"> {/* Added mb-5 for bottom margin */}
            <h2 className="text-center mb-4">{id ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name *</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username *</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone *</label>
                        <input
                            type="text"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <label htmlFor="companyName" className="form-label">Company</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            name="companyName"
                            value={userData.company.name}
                            onChange={(e) =>
                                setUserData((prevState) => ({
                                    ...prevState,
                                    company: {...prevState.company, name: e.target.value},
                                }))
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={userData.address.street}
                            onChange={(e) =>
                                setUserData((prevState) => ({
                                    ...prevState,
                                    address: {...prevState.address, street: e.target.value},
                                }))
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={userData.address.city}
                            onChange={(e) =>
                                setUserData((prevState) => ({
                                    ...prevState,
                                    address: {...prevState.address, city: e.target.value},
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Update User' : 'Add User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserFormPage;
