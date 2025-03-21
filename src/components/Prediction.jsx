import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingCryptos } from "../features/cryptoSlice";
import { fetchHistoricalData } from "../features/predictionSlice";
import { trainModel, predictNextPrice } from "../utils/model";

const Prediction = () => {
  const dispatch = useDispatch();
  const { trending, status: cryptoStatus } = useSelector((state) => state.crypto);
  const { historicalData, status: predictionStatus } = useSelector((state) => state.prediction);
  const modelRef = useRef(null);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [buttonStatus, setButtonStatus] = useState("idle"); // "idle", "fetching", "training", "predicting", "ready"

  // Reset states on component mount or route change
  useEffect(() => {
    resetStates();
  }, []);

  // New: Reset model and prediction when selectedCoin changes
  useEffect(() => {
    modelRef.current = null;
    setPrediction(null);
  }, [selectedCoin]);

  // Fetch trending coins when component mounts
  useEffect(() => {
    if (cryptoStatus === "idle") {
      dispatch(fetchTrendingCryptos());
    }
  }, [dispatch, cryptoStatus]);

  // Reset relevant states
  const resetStates = () => {
    setPrediction(null);
    modelRef.current = null; // Clear old model reference
    setButtonStatus("idle");
  };

  // Fetch historical data and train the model with sequential status updates
  const fetchDataAndTrainModel = async () => {
    try {
      if (!selectedCoin) {
        alert("Please select a cryptocurrency!");
        return;
      }

      setButtonStatus("fetching"); // indicate fetching started

      // Step 1: Fetch historical data
      const response = await dispatch(fetchHistoricalData(selectedCoin));
      const fetchedData = response.payload;
      if (!fetchedData || fetchedData.length === 0) {
        throw new Error("Failed to fetch historical data or no data available for training.");
      }

      setButtonStatus("training"); // indicate training is starting

      // Step 2: Train the model using fetchedData
      const { model, min, max } = await trainModel(fetchedData);
      // Store last fetched price along with model data for prediction
      const lastPrice = fetchedData[fetchedData.length - 1];
      modelRef.current = { model, min, max, coinId: selectedCoin, lastPrice };

      setButtonStatus("ready"); // training complete, ready to predict
    } catch (error) {
      console.error("Error during data fetch or model training:", error.message);
      alert(error.message);
      setButtonStatus("idle");
    }
  };

  // Define the handlePrediction function
  const handlePrediction = async () => {
    if (!modelRef.current) return;
    setButtonStatus("predicting"); // indicate prediction started
    const { model, min, max, lastPrice } = modelRef.current;
    const predictedPrice = await predictNextPrice(model, lastPrice, min, max);
    setPrediction(predictedPrice);
    setButtonStatus("ready"); // prediction done
  };

  // Combined button handler
  const handleButtonClick = async () => {
    if (!selectedCoin) {
      alert("Please select a cryptocurrency!");
      return;
    }
    if (!modelRef.current || modelRef.current.coinId !== selectedCoin) {
      await fetchDataAndTrainModel();
    } else {
      await handlePrediction();
    }
  };

  // Determine button text based on buttonStatus
  const buttonText = 
    buttonStatus === "fetching" ? "Fetching Data..." :
    buttonStatus === "training" ? "Training Model..." :
    buttonStatus === "predicting" ? "Predicting Price..." :
    buttonStatus === "ready" ? "Predict Next Price" :
    "Fetch Data & Train";

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Predict <span className="text-yellow-400">Crypto Prices</span>
        </h1>

        {/* Coin Dropdown */}
        <div className="flex justify-center mb-8">
          {cryptoStatus === "loading" ? (
            <p className="text-yellow-400 font-semibold">Loading trending coins...</p>
          ) : (
            <select
              value={selectedCoin}
              onChange={(e) => {
                setSelectedCoin(e.target.value); // Set the selected coin
                resetStates(); // Clear stale data
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              <option value="" disabled>
                Select a cryptocurrency
              </option>
              {trending.map((coin) => (
                <option key={coin.item.id} value={coin.item.id}>
                  {coin.item.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Single Combined Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleButtonClick}
            disabled={buttonStatus === "fetching" || buttonStatus === "training"}
            className={`px-6 py-3 rounded-lg font-semibold ${
              buttonStatus === "fetching" || buttonStatus === "training" || !selectedCoin
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            {buttonText}
          </button>
        </div>

        {/* Prediction Result */}
        {prediction !== null && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-yellow-400">
              Predicted Price for{" "}
              {trending.find((coin) => coin.item.id === selectedCoin)?.item.name ||
                "Selected Coin"}
              :
            </p>
            <p className="text-2xl font-bold">${prediction.toFixed(2)}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prediction;