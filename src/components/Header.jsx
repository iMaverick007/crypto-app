import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md text-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-extrabold">
            <Link to="/" className="hover:text-yellow-400 transition cursor-pointer">
              CryptoApp
            </Link>
          </h1>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li className="cursor-pointer">
                <Link to="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/news" className="hover:text-yellow-400 transition">
                  News
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/prediction" className="hover:text-yellow-400 transition">
                  Prediction
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/tools" className="hover:text-yellow-400 transition">
                  Tools
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/about" className="hover:text-yellow-400 transition">
                  About
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/contact" className="hover:text-yellow-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              <li className="cursor-pointer">
                <Link
                  to="/"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/news"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  News
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/prediction"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prediction
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/tools"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/about"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/contact"
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="bg-yellow-500 w-full">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-sm font-medium text-yellow-900">
            🚧 This application is currently in development mode and may not be fully functional 🚧
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
