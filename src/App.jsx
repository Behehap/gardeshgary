import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer1.jsx";
import Navbar from "./components/Navbar.jsx";
import TravelExprience from "./pages/TravelExperience.jsx";
import PublishArticle from "./pages/PublishingArticle.jsx";
import ArticleTest from "./pages/ArticleTest.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div>
        <div className="container mx-auto px-auto">
          <Navbar showModal={showModal} setShowModal={setShowModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Home showModal={showModal} setShowModal={setShowModal} />
              }
            />
            <Route path="/profile/*" element={<Profile />} />{" "}
            {/* Allow nested paths under profile */}
            <Route path="/article" element={<ArticleTest />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
