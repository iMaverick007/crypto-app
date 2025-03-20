import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrendingCryptos = createAsyncThunk(
  "crypto/fetchTrendingCryptos",
  async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.coins;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    trending: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCryptos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingCryptos.fulfilled, (state, action) => {
        console.log("Fetched Data:", action.payload);
        state.status = "succeeded";
        state.trending = action.payload;
      })
      .addCase(fetchTrendingCryptos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;