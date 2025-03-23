import React, { memo } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from "recharts";

const CryptoChart = memo(({ coinId }) => {
  const { historicalData, status } = useSelector((state) => state.charts);

  if (!coinId) return null;

  // Show loading message when fetching data
  if (status === "loading" && !historicalData[coinId]) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-xl md:text-4xl font-extrabold tracking-wide text-center">
          <span className="animate-typewriter border-r-4 border-yellow-400 pr-2">
            Loading chart data...
          </span>
        </div>
      </div>
    );
  }

  // If no data is available after loading, display a message
  if (!historicalData[coinId]) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xl font-extrabold tracking-wide text-yellow-400">
          No data available.
        </span>
      </div>
    );
  }

  const chartData = historicalData[coinId].map((data) => ({
    date: new Date(data.date).toLocaleDateString(),
    value: data.value,
  }));

  return (
    <div
      className="rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black p-2 md:p-4 w-full cursor-default"
      style={{ height: "300px", minHeight: "300px", maxHeight: "400px" }}
    >
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          {/* Gridlines */}
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          
          {/* Axes */}
          <XAxis
            dataKey="date"
            tick={{ fill: "#FACC15", fontSize: "0.75rem" }}
            label={{
              value: "Date",
              position: "bottom",
              offset: 0,
              style: { fill: "#FACC15", fontSize: "0.75rem" },
            }}
          />
          <YAxis
            tick={{ fill: "#FACC15", fontSize: "0.75rem" }}
            label={{
              value: "USD",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#FACC15", fontSize: "0.75rem" },
            }}
          />
          
          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderRadius: "8px",
              border: "1px solid #FACC15",
            }}
            labelStyle={{ color: "#FACC15" }}
            itemStyle={{ color: "#FFFFFF" }}
          />
          
          {/* Legend */}
          <Legend wrapperStyle={{ color: "#FFFFFF" }} />
          
          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#FACC15" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default CryptoChart;