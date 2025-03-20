import * as tf from "@tensorflow/tfjs";

// Train the TensorFlow.js model
export const trainModel = async (data) => {
  console.log("Starting training process...");
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
  await model.fit(xs, ys, { epochs: 50, batchSize: 32 });
  console.log("Model training completed successfully!");

  return { model, min, max };
};

// Predict the next price using the trained model
export const predictNextPrice = (model, lastPrice, min, max) => {
  console.log("Predicting the next price...");
  console.log("Last observed price:", lastPrice);

  // Normalize the last price
  const normalized = (lastPrice - min) / (max - min);
  console.log("Normalized last price:", normalized);

  // Create a tensor for prediction with the shape [1, timeSteps, inputFeatures]
  const inputTensor = tf.tensor3d([[[normalized]]], [1, 1, 1]); // Correct 3D input tensor
  console.log("Input Tensor for Prediction:", inputTensor);

  // Perform prediction
  const prediction = model.predict(inputTensor);
  const predictedValue = prediction.dataSync()[0] * (max - min) + min; // Denormalize the predicted value

  console.log("Predicted Next Price (denormalized):", predictedValue);
  return predictedValue;
};