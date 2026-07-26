import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/users/';

// Get config with token
const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all users
const getUsers = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data.data;
};

// Create a user
const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData, getConfig());
  return response.data.data;
};

// Update a user (e.g., status, isVerified)
const updateUser = async (id, userData) => {
  const response = await axios.put(API_URL + id, userData, getConfig());
  return response.data.data;
};

// Delete a user
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id, getConfig());
  return response.data;
};

const usersService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default usersService;
