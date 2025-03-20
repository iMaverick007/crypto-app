import React, { memo } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from "recharts";

const CryptoChart = memo(({ coinId }) => {
  const { historicalData } = useSelector((state) => state.charts);

  if (!coinId || !historicalData[coinId]) {
    return null;
  }

  const chartData = historicalData[coinId].map((data) => ({
    date: new Date(data.date).toLocaleDateString(),
    value: data.value,
  }));

  return (
    <div
      className="rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4"
      style={{ width: "100%", maxWidth: "800px", height: "400px" }}
    >
      <ResponsiveContainer>
        <LineChart data={chartData}>
          {/* Gridlines */}
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          
          {/* Axes */}
          <XAxis
            dataKey="date"
            tick={{ fill: "#FACC15" }}
            label={{
              value: "Time Period (Date)",
              position: "bottom",
              offset: 10,
              style: { fill: "#FACC15", fontSize: 14 },
            }}
          />
          <YAxis
            tick={{ fill: "#FACC15" }}
            label={{
              value: "Price (USD)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#FACC15", fontSize: 14 },
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