import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingCryptos } from "../features/cryptoSlice";
import { fetchHistoricalData } from "../features/chartSlice";
import CoinDetails from "./CoinDetails";
import CryptoChart from "./CryptoChart";
import LoadingMessage from "./LoadingMessage"; // Import the reusable component

const Home = () => {
  const dispatch = useDispatch();
  const { trending, status } = useSelector((state) => state.crypto);
  const { historicalData } = useSelector((state) => state.charts);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartCoin, setChartCoin] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTrendingCryptos());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "succeeded" && trending.length > 0 && !chartCoin) {
      const randomCoin = trending[Math.floor(Math.random() * trending.length)];
      setChartCoin(randomCoin.item.id);
      dispatch(fetchHistoricalData(randomCoin.item.id));
    }
  }, [status, trending, chartCoin, dispatch]);

  const handleCardClick = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 flex flex-col justify-center h-full">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Explore <span className="text-yellow-400">Crypto Trends</span>
        </h1>

        {status === "loading" && (
          <LoadingMessage message="Loading trending cryptocurrencies..." />
        )}

        {status === "succeeded" && trending.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {trending.map((coin) => (
              <div
                key={coin.item.id}
                onClick={() => handleCardClick(coin.item)}
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white hover:scale-105 transform transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={coin.item.small}
                    alt={`${coin.item.name} logo`}
                    className="w-16 h-16 rounded-full border-2 border-yellow-400 bg-gray-700 p-1"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{coin.item.name}</h3>
                    <p className="text-sm text-yellow-400 uppercase">
                      {coin.item.symbol}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Market Rank:</span> #
                    {coin.item.market_cap_rank}
                  </p>
                  <p className="text-sm text-gray-400">
                    Click to view more about {coin.item.name}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCoin && (
          <CoinDetails
            coinId={selectedCoin.id}
            onClose={() => setSelectedCoin(null)}
          />
        )}

        {status === "succeeded" && trending.length > 0 && (
          <div className="flex justify-center mb-6">
            <select
              value={chartCoin}
              onChange={(e) => {
                const coinId = e.target.value;
                setChartCoin(coinId);
                dispatch(fetchHistoricalData(coinId));
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              {trending.map((coin) => (
                <option key={coin.item.id} value={coin.item.id}>
                  {coin.item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cursor-default">
          {chartCoin && historicalData[chartCoin] && (
            <CryptoChart
              data={historicalData[chartCoin]} // Pass the historical data explicitly
              chartTitle="Cryptocurrency Historical Prices"
              colors={{
                primaryColor: "#8884d8",
              }}
              displayType="historical"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
