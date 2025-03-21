import React from "react";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">About Us</h1>
        <p className="text-lg leading-7">
          Welcome to <span className="font-bold text-yellow-400">CryptoApp</span>! Our mission is to empower individuals with tools and insights
          that simplify cryptocurrency tracking, analysis, and decision-making. Whether you're a seasoned trader or a curious beginner, we've built
          this platform to serve your needs.
        </p>
        <p className="text-lg leading-7 mt-4">
          At <span className="font-bold text-yellow-400">CryptoApp</span>, we’re dedicated to providing:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>Accurate and real-time cryptocurrency data.</li>
          <li>User-friendly tools for portfolio tracking and financial insights.</li>
          <li>Educational resources to help users navigate the complex world of crypto.</li>
        </ul>
        <p className="text-lg leading-7 mt-4">
          Our team is committed to continuous innovation and strives to ensure your crypto journey is successful and enjoyable. Feel free to explore
          our app and leverage the tools we've built just for you!
        </p>
        <p className="text-lg font-bold text-center mt-6 text-yellow-400">Happy Trading! 🚀</p>
      </div>
    </section>
  );
};

export default About;