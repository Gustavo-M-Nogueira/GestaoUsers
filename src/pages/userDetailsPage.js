// pages/userDetailsPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Adicionar o useNavigate aqui
import { useUsers } from '../context/userContext';

const UserDetailsPage = () => {
    const { id } = useParams();
    const { users } = useUsers(); // Get users from context
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Usar o hook useNavigate aqui

    useEffect(() => {
        const user = users.find((user) => user.id === parseInt(id));
        if (user) {
            setUser(user);
        }
    }, [id, users]); // Re-run when users or id change

    if (!user) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="container">
            <h2>User Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">Username: {user.username}</p>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Phone: {user.phone}</p>
                    <p className="card-text">Website: {user.website}</p>
                    <p className="card-text">Company: {user.company.name}</p>
                    <p className="card-text">Address: {user.address.street}, {user.address.city}</p>
                    <button className="btn btn-primary" onClick={() => navigate(`/user/${user.id}/edit`)}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
