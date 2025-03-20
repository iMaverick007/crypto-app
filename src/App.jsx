import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load components
const Header = React.lazy(() => import("./components/Header"));
const Hero = React.lazy(() => import("./components/Hero"));
const Footer = React.lazy(() => import("./components/Footer"));
const NewsFeed = React.lazy(() => import("./components/NewsFeed"));
const Prediction = React.lazy(() => import("./components/Prediction"));

const App = () => {
  return (
    <Router>
      {/* Flex container for sticky footer */}
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          {/* Header Section */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Route for Home Page */}
              <Route path="/" element={<Hero />} />

              {/* Route for News Feed */}
              <Route path="/news" element={<NewsFeed />} />
              <Route path="/prediction" element={<Prediction />} />
            </Routes>
          </main>

          {/* Footer Section */}
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;