import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Assuming React Router
// Import any other necessary components, libraries, or state management
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AvailabilityPage from "./components/AvailabilityPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Define your routes and components here */}
          <Route path="/" element={<Home />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
