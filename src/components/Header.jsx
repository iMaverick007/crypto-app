import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md text-white z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">
          <Link to="/" className="hover:text-yellow-400 transition cursor-pointer">CryptoTracker</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="hover:text-yellow-400 transition cursor-pointer"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/prediction"
                className="hover:text-yellow-400 transition cursor-pointer"
              >
                Prediction
              </Link>
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
