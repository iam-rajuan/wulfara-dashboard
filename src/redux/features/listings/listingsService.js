import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/suppliers/";

const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all listings (suppliers)
const getListings = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data.data;
};

// Get a single listing (supplier) by ID
const getListing = async (id) => {
  const response = await axios.get(API_URL + id, getConfig());
  return response.data.data;
};

// Review a listing (Approve, Reject, Pending)
const reviewListing = async (id, listingStatus) => {
  const response = await axios.put(API_URL + id + "/review", { listingStatus }, getConfig());
  return response.data.data;
};

const listingsService = {
  getListings,
  getListing,
  reviewListing,
};

export default listingsService;
