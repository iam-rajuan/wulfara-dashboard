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

// Get all categories
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a category
const deleteCategory = async (categoryId) => {
  const response = await axios.delete(API_URL + categoryId, getConfig());
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

// Get single category
const getCategory = async (categoryId) => {
  const response = await axios.get(API_URL + categoryId);
  return response.data;
};

// Update a category
const updateCategory = async (categoryId, categoryData) => {
  const response = await axios.put(API_URL + categoryId, categoryData, getConfig());
  return response.data;
};

const categoryService = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getUploadUrl,
  uploadFileToS3
};

export default categoryService;
