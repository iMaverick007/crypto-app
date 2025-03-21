import { createSlice } from "@reduxjs/toolkit";

const profitLossSlice = createSlice({
  name: "profitLoss",
  initialState: {
    purchasePrice: 0,
    currentPrice: 0,
    quantity: 1,
    profitLoss: 0,
  },
  reducers: {
    setPurchasePrice(state, action) {
      state.purchasePrice = action.payload;
      state.profitLoss =
        (state.currentPrice - state.purchasePrice) * state.quantity;
    },
    setCurrentPrice(state, action) {
      state.currentPrice = action.payload;
      state.profitLoss =
        (state.currentPrice - state.purchasePrice) * state.quantity;
    },
    setQuantity(state, action) {
      state.quantity = action.payload;
      state.profitLoss =
        (state.currentPrice - state.purchasePrice) * state.quantity;
    },
  },
});

export const { setPurchasePrice, setCurrentPrice, setQuantity } =
  profitLossSlice.actions;
export default profitLossSlice.reducer;
