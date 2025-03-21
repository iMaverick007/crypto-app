import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPurchasePrice, setSalePrice, setQuantity, setTaxRate } from "../features/taxEstimatorSlice";

const TaxEstimator = () => {
  const dispatch = useDispatch();
  const { purchasePrice, salePrice, quantity, taxRate, estimatedTax } = useSelector((state) => state.taxEstimator);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Tax Estimator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Purchase Price</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => dispatch(setPurchasePrice(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Sale Price</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => dispatch(setSalePrice(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => dispatch(setTaxRate(Number(e.target.value)))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="text-yellow-400 font-bold">
          Estimated Tax: {estimatedTax.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default TaxEstimator;