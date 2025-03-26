import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch historical price data
export const fetchHistoricalData = createAsyncThunk(
  "charts/fetchHistoricalData",
  async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`);
    }
    const data = await response.json();

    // Transform API response to cleaned array
    return data.prices.map((price) => ({
      date: price[0], // Timestamp
      value: price[1], // Price
    }));
  }
);

const chartSlice = createSlice({
  name: "charts",
  initialState: {
    historicalData: {}, // Store data for each coin by its ID
    status: "idle", // idle | loading | succeeded | failed
    error: null, // Store error message if API call fails
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        state.status = "loading"; // Update status to loading
        state.error = null; // Reset error state
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mark status as succeeded
        state.historicalData[action.meta.arg] = action.payload; // Save data under the coinId key
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.status = "failed"; // Mark status as failed
        state.error = action.error.message; // Save error message
      });
  },
});

export default chartSlice.reducer;