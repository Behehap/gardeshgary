import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer1.jsx";
import Navbar from "./components/Navbar.jsx";
import TravelExprience from "./pages/TravelExperience.jsx";
import PublishArticle from "./pages/PublishingArticle.jsx";
import ArticleTest from "./pages/ArticleTest.jsx";
import AddArticle from "./components/AddArticle.jsx";
import AArticle from "./pages/AArticle.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen max-h-screen ">
        {/* Header and Main content */}
        <div className="flex-grow container mx-auto px-4">
          {" "}
          {/* Adjusted padding */}
          <Navbar showModal={showModal} setShowModal={setShowModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Home showModal={showModal} setShowModal={setShowModal} />
              }
            />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/article" element={<ArticleTest />} />
            <Route path="/travel-exprience" element={<TravelExprience />} />
            <Route path="/my-travle-exprience" element={<AArticle />} />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
}

export default App;
