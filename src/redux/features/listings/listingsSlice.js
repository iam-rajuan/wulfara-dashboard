import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingsService from "./listingsService";

const initialState = {
  listings: [],
  listing: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all listings
export const getListings = createAsyncThunk(
  "listings/getAll",
  async (_, thunkAPI) => {
    try {
      return await listingsService.getListings();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single listing
export const getListing = createAsyncThunk(
  "listings/get",
  async (id, thunkAPI) => {
    try {
      return await listingsService.getListing(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Review listing (Approve/Reject)
export const reviewListing = createAsyncThunk(
  "listings/review",
  async (data, thunkAPI) => {
    try {
      return await listingsService.reviewListing(data.id, data.listingStatus);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reviewListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviewListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedListing = action.payload;
        // Update in list
        const index = state.listings.findIndex((l) => l._id === updatedListing._id);
        if (index !== -1) {
          state.listings[index] = updatedListing;
        }
        // Update single listing if currently viewing
        if (state.listing && state.listing._id === updatedListing._id) {
          state.listing = updatedListing;
        }
      })
      .addCase(reviewListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listingsSlice.actions;
export default listingsSlice.reducer;
