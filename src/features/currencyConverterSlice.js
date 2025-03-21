import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching conversion rates
export const fetchConversionRate = createAsyncThunk(
  "currencyConverter/fetchConversionRate",
  async ({ crypto, fiat }) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}`
    );
    const data = await response.json();
    return data[crypto][fiat];
  }
);

const currencyConverterSlice = createSlice({
  name: "currencyConverter",
  initialState: {
    crypto: "bitcoin",
    fiat: "usd",
    amount: 1,
    conversionRate: null,
    convertedAmount: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setCrypto(state, action) {
      state.crypto = action.payload;
    },
    setFiat(state, action) {
      state.fiat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversionRate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchConversionRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversionRate = action.payload;
        state.convertedAmount = state.amount * action.payload;
      })
      .addCase(fetchConversionRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setAmount, setCrypto, setFiat } = currencyConverterSlice.actions;
export default currencyConverterSlice.reducer;
