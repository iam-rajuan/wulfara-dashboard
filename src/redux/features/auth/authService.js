import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    // Fetch user details immediately after registration
    const userResponse = await axios.get(API_URL + 'me', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    const user = userResponse.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return { token: response.data.token, user };
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    // Fetch user details immediately after login
    const userResponse = await axios.get(API_URL + 'me', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    const user = userResponse.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return { token: response.data.token, user };
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
