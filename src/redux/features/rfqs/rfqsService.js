import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/rfqs/";

const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all RFQs (Admin global)
const getRfqs = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data.data;
};

// Get single RFQ by ID
const getRfq = async (id) => {
  const response = await axios.get(API_URL + id, getConfig());
  return response.data.data;
};

// Create new RFQ (Admin manual entry)
const createRfq = async (rfqData) => {
  const response = await axios.post(API_URL, rfqData, getConfig());
  return response.data.data;
};

// Update RFQ status
const updateRfqStatus = async (id, status) => {
  const response = await axios.put(API_URL + id + "/status", { status }, getConfig());
  return response.data.data;
};

// Get RFQ messages
const getRfqMessages = async (id) => {
  const response = await axios.get(API_URL + id + "/messages", getConfig());
  return response.data.data;
};

const rfqsService = {
  getRfqs,
  getRfq,
  createRfq,
  updateRfqStatus,
  getRfqMessages,
};

export default rfqsService;
