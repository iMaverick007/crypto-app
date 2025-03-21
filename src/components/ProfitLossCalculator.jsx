import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPurchasePrice,
  setCurrentPrice,
  setQuantity,
} from "../features/profitLossSlice";

const ProfitLossCalculator = () => {
  const dispatch = useDispatch();
  const { purchasePrice, currentPrice, quantity, profitLoss } = useSelector(
    (state) => state.profitLoss
  );

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
        Profit/Loss Calculator
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Purchase Price</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => dispatch(setPurchasePrice(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Current Price</label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => dispatch(setCurrentPrice(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div
          className={`font-bold ${
            profitLoss >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          Profit/Loss: {profitLoss.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProfitLossCalculator;
