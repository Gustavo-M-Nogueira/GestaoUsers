import React from 'react';
import { Link } from 'react-router-dom';
import UserItem from './userItem';

function UserList({ users, onDelete }) {
    return (
        <div>
            <h1>User List</h1>
            <Link to="/user/new">Add New User</Link>
            <ul>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    );
}

export default UserList;
