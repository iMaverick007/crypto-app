import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHistoricalData = createAsyncThunk(
  "prediction/fetchHistoricalData",
  async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    const data = await response.json();
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
        state.status = "loading";
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.historicalData = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default predictionSlice.reducer;