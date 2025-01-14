import { createContext, useState, useContext, useEffect } from 'react';
import { getUsers } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsersByName();
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            const allUsers = response.data;
            const usersPerPage = 10;
            setTotalPages(Math.ceil(allUsers.length / usersPerPage));
            const paginatedUsers = allUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
            setUsers(paginatedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (newUser) => {
        try {
            const newUserWithId = { ...newUser, id: Date.now() }; // Temporary ID
            setUsers((prevUsers) => [...prevUsers, newUserWithId]);
            setTotalPages(Math.ceil(users.length / 10)); // Recalculate total pages
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUserDetails = async (id, updatedUser) => {
        try {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, ...updatedUser } : user
                )
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const removeUser = async (id) => {
        try {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            setTotalPages(Math.ceil(users.length / 10)); // Recalculate total pages
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterUsersByName = () => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <UserContext.Provider value={{
            users: filteredUsers,
            currentPage,
            totalPages,
            setCurrentPage,
            addUser,
            updateUserDetails,
            removeUser,
            handleSearchChange,
            searchQuery
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);
