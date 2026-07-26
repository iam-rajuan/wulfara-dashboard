import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/categories/';

// Helper to get auth token
const getConfig = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

// Create new category
const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, getConfig());
  return response.data;
};

// Get S3 Upload URL
const getUploadUrl = async (contentType) => {
  const response = await axios.post(API_URL + 'upload-url', { contentType }, getConfig());
  return response.data;
};

// Upload file to S3
const uploadFileToS3 = async (uploadUrl, file) => {
  const response = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type
    }
  });
  return response;
};

const categoryService = {
  createCategory,
  getUploadUrl,
  uploadFileToS3
};

export default categoryService;
