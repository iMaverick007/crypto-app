import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch historical data
export const fetchHistoricalData = createAsyncThunk(
  "prediction/fetchHistoricalData",
  async (coinId) => {
    console.log("API Call Initiated...");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Data (Prices):", data.prices);
    return data.prices.map((price) => price[1]); // Extract price values
  }
);

const predictionSlice = createSlice({
  name: "prediction",
  initialState: {
    historicalData: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        console.log("Fetching data...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        console.log("Data fetched successfully:", action.payload);
        state.historicalData = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        console.error("Error fetching data:", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default predictionSlice.reducer;