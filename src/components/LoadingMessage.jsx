import React from "react";

const LoadingMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <p className="text-xl md:text-4xl font-extrabold text-center text-yellow-400">
        {message}
      </p>
    </div>
  );
};

export default LoadingMessage;