import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingCryptos } from "../features/cryptoSlice";
import { fetchHistoricalData } from "../features/chartSlice";
import { trainModel, predictNextPrices } from "../utils/model";
import CryptoChart from "./CryptoChart";
import LoadingMessage from "./LoadingMessage"; // Import the reusable component

const Prediction = () => {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = useState("");
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(false); // Track prediction progress
  const { trending, status: cryptoStatus } = useSelector((state) => state.crypto);
  const { historicalData, status: chartStatus } = useSelector((state) => state.charts);

  useEffect(() => {
    if (cryptoStatus === "idle") {
      dispatch(fetchTrendingCryptos());
    }
  }, [dispatch, cryptoStatus]);

  useEffect(() => {
    if (selectedCoin) {
      dispatch(fetchHistoricalData(selectedCoin));
      setPredictionData([]); // Reset predictions when a new coin is selected
    }
  }, [selectedCoin, dispatch]);

  const handlePredict = async () => {
    try {
      setLoading(true); // Disable the button while processing
      const data = historicalData[selectedCoin];
      if (!data) {
        throw new Error("No historical data available for the selected coin.");
      }

      const { model, min, max } = await trainModel(data.map((item) => item.value), 5, 5);

      const lastPrices = data.slice(-5).map((item) => item.value);
      console.log("Last observed prices:", lastPrices);

      const predictions = await predictNextPrices(model, lastPrices, min, max);
      setPredictionData(predictions.map((value) => ({ value })));

      console.log("Prediction complete:", predictions);
    } catch (error) {
      console.error("Error during prediction:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Re-enable the button after prediction is complete
    }
  };

  return (
    <div className="py-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Predict <span className="text-yellow-400">Crypto Price</span>
        </h1>
        <div className="flex justify-center mb-6">
          {cryptoStatus === "loading" ? (
            <LoadingMessage message="Loading cryptocurrencies..." />
          ) : (
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              <option value="" disabled>Select a cryptocurrency</option>
              {trending.map((coin) => (
                <option key={coin.item.id} value={coin.item.id}>
                  {coin.item.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handlePredict}
            disabled={!selectedCoin || chartStatus === "loading" || loading}
            className={`ml-4 px-6 py-2 font-semibold rounded-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            }`}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
        {predictionData.length > 0 && (
          <CryptoChart
            data={predictionData} // Pass only prediction data
            chartTitle="Future Cryptocurrency Price Predictions"
            colors={{
              secondaryColor: "#FF0000",
            }}
            displayType="prediction" // Only show future values
          />
        )}
      </div>
    </div>
  );
};

export default Prediction;