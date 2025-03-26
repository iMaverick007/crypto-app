import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAmount,
  setCrypto,
  setFiat,
  fetchConversionRate,
} from "../features/currencyConverterSlice";
import LoadingMessage from "./LoadingMessage"; // Import the reusable component

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { crypto, fiat, amount, convertedAmount, status, error } = useSelector(
    (state) => state.currencyConverter
  );

  useEffect(() => {
    dispatch(fetchConversionRate({ crypto, fiat }));
  }, [crypto, fiat, dispatch]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
        Currency Converter
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Cryptocurrency</label>
          <select
            value={crypto}
            onChange={(e) => dispatch(setCrypto(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Fiat Currency</label>
          <select
            value={fiat}
            onChange={(e) => dispatch(setFiat(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          {status === "loading" ? (
            <LoadingMessage message="Calculating..." />
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <p className="text-yellow-400 font-bold">
              Converted Amount:{" "}
              {convertedAmount
                ? `${convertedAmount.toFixed(2)} ${fiat.toUpperCase()}`
                : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
