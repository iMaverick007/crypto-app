import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../features/cryptoSlice"; // For Hero Section
import newsReducer from "../features/newsSlice"; // For News Feed
import predictionReducer from "../features/predictionSlice"; // For Price Prediction
import chartReducer from "../features/chartSlice"; // Handles historical chart data
import coinDetailsReducer from "../features/coinDetailsSlice";
import currencyConverterReducer from "../features/currencyConverterSlice";
import profitLossReducer from "../features/profitLossSlice";
import taxEstimatorReducer from "../features/taxEstimatorSlice";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    news: newsReducer,
    prediction: predictionReducer, // Correct slice for Prediction
    charts: chartReducer, // Chart data for selected coins
    coinDetails: coinDetailsReducer,
    currencyConverter: currencyConverterReducer,
    profitLoss: profitLossReducer,
    taxEstimator: taxEstimatorReducer,
  },
});

export default store;