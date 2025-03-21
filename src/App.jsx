import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen"; // Import the new LoadingScreen component

// Lazy load components
const Header = React.lazy(() => import("./components/Header"));
const Hero = React.lazy(() => import("./components/Hero"));
const Footer = React.lazy(() => import("./components/Footer"));
const NewsFeed = React.lazy(() => import("./components/NewsFeed"));
const Prediction = React.lazy(() => import("./components/Prediction"));
const Tools = React.lazy(() => import("./components/Tools"));
const About = React.lazy(() => import("./components/About"));
const Contact = React.lazy(() => import("./components/Contact"));

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Suspense fallback={<LoadingScreen />}>
          {/* Header Section */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/news" element={<NewsFeed />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
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
