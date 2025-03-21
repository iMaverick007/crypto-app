import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch coin details
export const fetchCoinDetails = createAsyncThunk(
  "coinDetails/fetchCoinDetails",
  async (coinId) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details: ${response.statusText}`);
    }
    return response.json(); // Returns detailed coin information
  }
);

const coinDetailsSlice = createSlice({
  name: "coinDetails",
  initialState: {
    coinDetails: null, // Stores detailed data for the selected coin
    status: "idle", // Tracks the async process (idle | loading | succeeded | failed)
    error: null, // Holds error message, if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.status = "loading"; // Set state to loading
        state.error = null; // Clear previous error, if any
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mark status as succeeded
        state.coinDetails = action.payload; // Store the fetched coin details
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.status = "failed"; // Mark status as failed
        state.error = action.error.message; // Save error message
      });
  },
});

export default coinDetailsSlice.reducer;