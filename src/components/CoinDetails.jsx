import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "../features/coinDetailsSlice";

const CoinDetails = ({ coinId, onClose }) => {
  const dispatch = useDispatch();
  const { coinDetails, status, error } = useSelector((state) => state.coinDetails);

  useEffect(() => {
    if (coinId) {
      dispatch(fetchCoinDetails(coinId));
    }
  }, [coinId, dispatch]);

  // Animated Loading State
  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
        <div className="text-xl md:text-4xl font-extrabold tracking-wide text-center text-yellow-400">
          <span className="animate-typewriter border-r-4 border-yellow-400 pr-2">
            Loading coin details...
          </span>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "failed") {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
        <p className="text-red-500 text-center">Failed to load coin details: {error}.</p>
      </div>
    );
  }

  // Render Popup
  if (!coinDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3 relative transition-transform transform scale-95 hover:scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
        {/* Coin Details */}
        <h2 className="text-2xl font-bold mb-4">{coinDetails.name}</h2>
        <p className="text-sm text-yellow-400 uppercase">{coinDetails.symbol}</p>
        <p className="mt-2 text-lg">
          <span className="font-bold">Current Price:</span> ${coinDetails.market_data.current_price.usd}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-bold">Market Cap:</span> ${coinDetails.market_data.market_cap.usd.toLocaleString()}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-bold">24h Change:</span> {coinDetails.market_data.price_change_percentage_24h}%
        </p>
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          {coinDetails.description?.en
            ? coinDetails.description.en.slice(0, 200)
            : "No description available."}
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;