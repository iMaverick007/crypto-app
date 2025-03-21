import * as tf from "@tensorflow/tfjs";

// Train the TensorFlow.js model
export const trainModel = async (data) => {
  console.log("Starting training process...");
  
  // Validate data
  if (data.length <= 1) {
    throw new Error("Insufficient data for training. At least two data points are required.");
  }

  console.log("Received data for training:", data);

  const min = Math.min(...data);
  const max = Math.max(...data);
  console.log("Normalization values - Min:", min, "Max:", max);

  const normalizedData = data.map((price) => (price - min) / (max - min));
  console.log("Normalized Data:", normalizedData);

  const inputData = [];
  const labels = [];
  const timeSteps = 1; // Number of time steps for LSTM

  for (let i = 0; i < normalizedData.length - timeSteps; i++) {
    inputData.push(normalizedData.slice(i, i + timeSteps).map((val) => [val]));
    labels.push(normalizedData[i + timeSteps]);
  }

  console.log("Prepared Input Data (formatted for tensor3d):", inputData);
  console.log("Prepared Labels:", labels);

  const xs = tf.tensor3d(inputData, [inputData.length, timeSteps, 1]);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 50, inputShape: [timeSteps, 1], returnSequences: false }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  console.log("Training the model...");
  await model.fit(xs, ys, { epochs: 50, batchSize: Math.min(32, Math.floor(data.length / 10)) });
  console.log("Model training completed successfully!");

  // Dispose tensors to avoid memory leaks
  xs.dispose();
  ys.dispose();

  return { model, min, max };
};

// Predict the next price using the trained model
export const predictNextPrice = async (model, lastPrice, min, max) => {
  console.log("Predicting the next price...");

  // Validate inputs
  if (!model) {
    throw new Error("Model is not available. Please train the model first.");
  }
  if (lastPrice === undefined || lastPrice === null) {
    throw new Error("Last price is not defined. Prediction cannot proceed.");
  }

  console.log("Last observed price:", lastPrice);

  // Normalize the last price
  const normalized = (lastPrice - min) / (max - min);
  console.log("Normalized last price:", normalized);

  // Create a tensor for prediction with the shape [1, timeSteps, inputFeatures]
  const inputTensor = tf.tensor3d([[[normalized]]], [1, 1, 1]);
  console.log("Input Tensor for Prediction:", inputTensor);

  // Perform prediction
  const prediction = await model.predict(inputTensor).data(); // Async fetch of prediction
  const predictedValue = prediction[0] * (max - min) + min; // Denormalize the predicted value

  // Dispose tensors to avoid memory leaks
  inputTensor.dispose();

  console.log("Predicted Next Price (denormalized):", predictedValue);
  return predictedValue;
};