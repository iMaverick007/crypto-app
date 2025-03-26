import * as tf from "@tensorflow/tfjs";

// Train the TensorFlow.js model
export const trainModel = async (data, timeSteps = 5, futureSteps = 5) => {
  console.log("Starting training process...");

  // Validate data
  if (data.length <= timeSteps + futureSteps) {
    throw new Error(
      "Insufficient data for training. At least timeSteps + futureSteps data points are required."
    );
  }

  console.log("Received data for training:", data);

  const min = Math.min(...data);
  const max = Math.max(...data);
  if (isNaN(min) || isNaN(max) || max === min) {
    throw new Error("Normalization failed: min and max values are invalid.");
  }

  console.log("Normalization values - Min:", min, "Max:", max);

  const normalizedData = data.map((price) => (price - min) / (max - min));
  console.log("Normalized Data:", normalizedData);

  const inputData = [];
  const labels = [];

  for (let i = 0; i < normalizedData.length - timeSteps - futureSteps + 1; i++) {
    inputData.push(normalizedData.slice(i, i + timeSteps).map((val) => [val]));
    labels.push(normalizedData.slice(i + timeSteps, i + timeSteps + futureSteps));
  }

  console.log("Prepared Input Data (formatted for tensor3d):", inputData);
  console.log("Prepared Labels:", labels);

  const xs = tf.tensor3d(inputData, [inputData.length, timeSteps, 1]);
  const ys = tf.tensor2d(labels, [labels.length, futureSteps]);

  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 50, inputShape: [timeSteps, 1] }));
  model.add(tf.layers.dense({ units: futureSteps }));
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  console.log("Training the model...");
  await model.fit(xs, ys, { epochs: 50, batchSize: Math.min(32, Math.floor(data.length / 10)) });
  console.log("Model training completed successfully!");

  xs.dispose();
  ys.dispose();

  return { model, min, max };
};

// Predict the next prices using the trained model
export const predictNextPrices = async (model, lastPrices, min, max) => {
  console.log("Predicting the next prices...");

  if (!Array.isArray(lastPrices) || lastPrices.length !== 5 || lastPrices.some((price) => isNaN(price))) {
    throw new Error("Invalid lastPrices array detected.");
  }

  if (isNaN(min) || isNaN(max) || max === min) {
    throw new Error("Normalization failed: min and max values are invalid.");
  }

  const normalized = lastPrices.map((price) => (price - min) / (max - min));
  if (normalized.some((val) => isNaN(val))) {
    throw new Error("Normalization failed for lastPrices.");
  }

  console.log("Normalized last prices:", normalized);

  const inputTensor = tf.tensor3d([normalized.map((val) => [val])], [1, lastPrices.length, 1]);

  const predictionTensor = model.predict(inputTensor);
  const predictionArray = await predictionTensor.array();
  console.log("Prediction Array:", predictionArray);

  const denormalizedPrediction = predictionArray[0].map((value) => value * (max - min) + min);
  console.log("Denormalized Predictions:", denormalizedPrediction);

  inputTensor.dispose();
  predictionTensor.dispose();

  return denormalizedPrediction;
};