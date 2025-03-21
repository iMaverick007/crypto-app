import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import ProfitLossCalculator from "./ProfitLossCalculator";
import TaxEstimator from "./TaxEstimator";

const Tools = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen text-white p-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Explore <span className="text-yellow-400">Crypto Tools</span>
        </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tools Components */}
        <CurrencyConverter />
        <ProfitLossCalculator />
        <TaxEstimator />
      </div>
    </section>
  );
};

export default Tools;