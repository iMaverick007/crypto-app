import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingCryptos } from "../features/cryptoSlice";
import { fetchHistoricalData } from "../features/predictionSlice";
import { trainModel, predictNextPrice } from "../utils/model";

const Prediction = () => {
  const dispatch = useDispatch();
  const { trending, status: cryptoStatus } = useSelector((state) => state.crypto);
  const { historicalData, status, error } = useSelector((state) => state.prediction);
  const modelRef = useRef(null);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isModelTrained, setIsModelTrained] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [predictionTimestamp, setPredictionTimestamp] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  // Ensure trending coins are fetched on component mount
  useEffect(() => {
    if (trending.length === 0 && cryptoStatus === "idle") {
      dispatch(fetchTrendingCryptos());
    }
  }, [dispatch, trending, cryptoStatus]);

  // Set default coin after fetching trending coins
  useEffect(() => {
    if (trending.length > 0) {
      setSelectedCoin(trending[0]?.item?.id || "");
    }
  }, [trending]);

  // Fetch historical data for the selected coin
  const handleFetchAndPredict = async () => {
    dispatch(fetchHistoricalData(selectedCoin));
  };

  // Train the model after new data is fetched
  useEffect(() => {
    const train = async () => {
      if (status === "succeeded" && historicalData && historicalData.length > 0) {
        try {
          setIsTraining(true);
          const { model, min, max } = await trainModel(historicalData);
          modelRef.current = { model, min, max };
          setIsModelTrained(true);
        } catch (trainingError) {
          console.error("Error during model training:", trainingError.message);
        } finally {
          setIsTraining(false);
        }
      }
    };

    train();
  }, [status, historicalData]);

  // Make predictions using the trained model
  const handlePrediction = async () => {
    if (!isModelTrained || isPredicting || status === "loading" || isTraining) return;
    try {
      setIsPredicting(true);
      const { model, min, max } = modelRef.current;
      const lastPrice = historicalData[historicalData.length - 1];
      const nextPrice = await predictNextPrice(model, lastPrice, min, max);
      setPrediction(nextPrice);
      setPredictionTimestamp(new Date().toLocaleString());
    } catch (predictionError) {
      console.error("Error during prediction:", predictionError.message);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Predict <span className="text-yellow-400">Crypto Prices</span>
        </h1>

        {/* How It Works Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm md:text-base bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            {showInfo ? "Hide Info" : "How It Works"}
          </button>
          {showInfo && (
            <div className="mt-4 bg-gray-900 p-4 rounded-lg text-sm md:text-base text-gray-300">
              <p className="mb-2">
                1. **Select a cryptocurrency:** Choose a trending coin from the dropdown.
              </p>
              <p className="mb-2">
                2. **Fetch historical data:** Click "Fetch New Data" to gather price history for the selected coin.
              </p>
              <p className="mb-2">
                3. **Train the model:** Wait for the system to analyze the data and prepare its prediction model.
              </p>
              <p>
                4. **Predict the price:** Click "Predict Next Price" to forecast the next value based on historical trends.
              </p>
              <p className="mt-2 text-yellow-400">
                Note: Predictions are based on the last 30 days of historical data. Stable trends may result in similar forecasts.
              </p>
            </div>
          )}
        </div>

        {/* Coin Selector */}
        <div className="flex justify-center mb-8">
          {cryptoStatus === "loading" ? (
            <p className="text-yellow-400 font-semibold">Loading trending coins...</p>
          ) : (
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="w-full max-w-xs md:max-w-sm bg-gray-800 text-white px-4 py-2 rounded-lg text-base md:text-lg"
            >
              {trending.map((coin) => (
                <option key={coin.item.id} value={coin.item.id}>
                  {coin.item.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <button
            onClick={handleFetchAndPredict}
            disabled={status === "loading"}
            className={`px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-300 ${
              status === "loading"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400 hover:scale-105"
            }`}
          >
            {status === "loading" ? "Fetching Data..." : "Fetch New Data"}
          </button>
          {isModelTrained && (
            <button
              onClick={handlePrediction}
              disabled={status === "loading" || isPredicting || isTraining}
              className={`px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-300 ${
                status === "loading" || isPredicting || isTraining
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400 hover:scale-105"
              }`}
            >
              {isTraining
                ? "Training Model..."
                : isPredicting
                ? "Predicting..."
                : "Predict Next Price"}
            </button>
          )}
        </div>

        {/* Status Messages */}
        <div className="text-center">
          {isTraining && (
            <p className="text-yellow-400 font-semibold">
              Training the model, please wait...
            </p>
          )}
          {status === "failed" && (
            <p className="text-red-500 font-semibold">
              Error: {error}
            </p>
          )}
        </div>

        {/* Prediction Results */}
        {prediction !== null && (
          <div className="mt-6 md:mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4 md:p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold text-yellow-300 mb-2">
              Prediction for: {trending.find((coin) => coin.item.id === selectedCoin)?.item.name || "Selected Coin"}
            </p>
            <p className="text-2xl font-bold text-yellow-400">
              Predicted Next Price: ${prediction.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Prediction generated at: {predictionTimestamp}
            </p>
            <p className="text-sm text-yellow-500 mt-2">
              Note: Predictions may remain stable if market trends have not changed significantly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prediction;