import React from "react";

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 CryptoTracker. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-yellow-400">
            <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;  