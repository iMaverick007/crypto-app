import { createSlice } from "@reduxjs/toolkit";

const taxEstimatorSlice = createSlice({
  name: "taxEstimator",
  initialState: {
    purchasePrice: 0,
    salePrice: 0,
    quantity: 1,
    taxRate: 15, // Default tax rate (percentage)
    estimatedTax: 0,
  },
  reducers: {
    setPurchasePrice(state, action) {
      state.purchasePrice = action.payload;
      const capitalGains =
        (state.salePrice - state.purchasePrice) * state.quantity;
      state.estimatedTax =
        capitalGains > 0 ? (capitalGains * state.taxRate) / 100 : 0;
    },
    setSalePrice(state, action) {
      state.salePrice = action.payload;
      const capitalGains =
        (state.salePrice - state.purchasePrice) * state.quantity;
      state.estimatedTax =
        capitalGains > 0 ? (capitalGains * state.taxRate) / 100 : 0;
    },
    setQuantity(state, action) {
      state.quantity = action.payload;
      const capitalGains =
        (state.salePrice - state.purchasePrice) * state.quantity;
      state.estimatedTax =
        capitalGains > 0 ? (capitalGains * state.taxRate) / 100 : 0;
    },
    setTaxRate(state, action) {
      state.taxRate = action.payload;
      const capitalGains =
        (state.salePrice - state.purchasePrice) * state.quantity;
      state.estimatedTax =
        capitalGains > 0 ? (capitalGains * state.taxRate) / 100 : 0;
    },
  },
});

export const { setPurchasePrice, setSalePrice, setQuantity, setTaxRate } =
  taxEstimatorSlice.actions;
export default taxEstimatorSlice.reducer;
