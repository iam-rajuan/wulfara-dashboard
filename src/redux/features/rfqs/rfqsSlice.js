import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rfqsService from "./rfqsService";

const initialState = {
  rfqs: [],
  rfq: null,
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getRfqs = createAsyncThunk(
  "rfqs/getAll",
  async (_, thunkAPI) => {
    try {
      return await rfqsService.getRfqs();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRfq = createAsyncThunk(
  "rfqs/get",
  async (id, thunkAPI) => {
    try {
      return await rfqsService.getRfq(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createRfq = createAsyncThunk(
  "rfqs/create",
  async (rfqData, thunkAPI) => {
    try {
      return await rfqsService.createRfq(rfqData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRfqStatus = createAsyncThunk(
  "rfqs/updateStatus",
  async (data, thunkAPI) => {
    try {
      return await rfqsService.updateRfqStatus(data.id, data.status);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRfqMessages = createAsyncThunk(
  "rfqs/getMessages",
  async (id, thunkAPI) => {
    try {
      return await rfqsService.getRfqMessages(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rfqsSlice = createSlice({
  name: "rfqs",
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
      .addCase(getRfqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRfqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rfqs = action.payload;
      })
      .addCase(getRfqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRfq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRfq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rfq = action.payload;
      })
      .addCase(getRfq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRfq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRfq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rfqs.unshift(action.payload);
      })
      .addCase(createRfq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRfqStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRfqStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedRfq = action.payload;
        if (state.rfq && state.rfq._id === updatedRfq._id) {
          state.rfq = updatedRfq;
        }
        const index = state.rfqs.findIndex(r => r._id === updatedRfq._id);
        if (index !== -1) {
          state.rfqs[index] = updatedRfq;
        }
      })
      .addCase(updateRfqStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRfqMessages.pending, (state) => {
        // don't set loading state to avoid ui jitter if reloading
      })
      .addCase(getRfqMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getRfqMessages.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { reset } = rfqsSlice.actions;
export default rfqsSlice.reducer;
