import React from "react";

const LoadingScreen = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center">
      {/* Animated Crypto Coin */}
      <div className="flex flex-col items-center space-y-6">
        {/* Rotating Coin */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-yellow-400 text-4xl font-extrabold">₿</span>
          </div>
        </div>

        {/* Animated Text */}
        <p className="text-2xl md:text-4xl font-bold text-yellow-400 animate-typewriter tracking-widest">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;