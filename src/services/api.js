// services/api.js

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response;  // Return the response from the API
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Function to fetch a single user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        return response;  // Return the single user data from the response
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

// Function to create a new user
export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_URL}/users`, newUser);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to update an existing user
export const updateUser = async (id, updatedUser) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, updatedUser);
        return response; // Return the updated user from the response
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Function to delete a user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
