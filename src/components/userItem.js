import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user, onDelete }) => {
    return (
        <li>
            <Link to={`/user/${user.id}`}>{user.name}</Link> ({user.username}) - {user.email}
            <button onClick={() => onDelete(user.id)}>Remove</button>
        </li>
    );
};

export default UserItem;