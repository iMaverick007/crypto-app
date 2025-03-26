import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CryptoChart = ({ data, chartTitle, colors = {}, displayType }) => {
  const { primaryColor = "#8884d8", secondaryColor = "#FF0000", gridColor = "rgba(255, 255, 255, 0.2)" } = colors;

  // Handle the case where no data is available
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xl font-bold text-yellow-400">No data available.</span>
      </div>
    );
  }

  // Filter data based on display type
  const filteredData =
    displayType === "prediction"
      ? data.map((item, index) => ({
          date: `Day ${index + 1}`, // Label prediction days only
          value: item.value,
        }))
      : data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(), // Show actual historical dates
          value: item.value,
        }));

  return (
    <div className="rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      {chartTitle && <h3 className="text-yellow-400 font-bold mb-4 text-center">{chartTitle}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#FACC15", fontSize: "0.75rem" }}
            label={{ value: displayType === "prediction" ? "Prediction Days" : "Date", position: "bottom", fill: "#FACC15" }}
          />
          <YAxis
            tick={{ fill: "#FACC15", fontSize: "0.75rem" }}
            label={{
              value: "Price (USD)",
              angle: -90,
              position: "insideLeft",
              fill: "#FACC15",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderRadius: "8px",
              border: "1px solid #FACC15",
            }}
            labelStyle={{ color: "#FACC15" }}
            itemStyle={{ color: "#FFFFFF" }}
            formatter={(value) => `$${value.toFixed(2)}`}
          />
          <Legend wrapperStyle={{ color: "#FFFFFF" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={displayType === "prediction" ? secondaryColor : primaryColor} // Color depends on display type
            strokeDasharray={displayType === "prediction" ? "5 5" : "none"} // Dashed line for predictions
            strokeWidth={2}
            dot={{ fill: displayType === "prediction" ? secondaryColor : primaryColor }}
            name={displayType === "prediction" ? "Predicted Prices" : "Historical Prices"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;