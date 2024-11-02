import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer1.jsx";
import Navbar from "./components/Navbar.jsx";
import TravelExperience from "./pages/TravelExperience.jsx";
import PublishArticle from "./pages/PublishingArticle.jsx";
import ArticleTest from "./pages/ArticleTest.jsx";
import AddArticle from "./components/AddArticle.jsx";
import MyTravelExperience from "./pages/MyTravelExperience.jsx";
import ArticlePage from "./components/ArticlePage.jsx";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        {/* Header and Main content */}
        <div className="flex-grow container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar showModal={showModal} setShowModal={setShowModal} />

          <div className="py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <Home showModal={showModal} setShowModal={setShowModal} />
                }
              />
              <Route path="/profile/*" element={<Profile />} />

              <Route path="/travel-experience" element={<TravelExperience />} />
              <Route
                path="/my-travel-experience/*"
                element={<MyTravelExperience />}
              />
              <Route path="/article-page/:id" element={<ArticlePage />} />
            </Routes>
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer className="mt-auto bg-gray-100 p-4" />
      </div>
    </Router>
  );
}

export default App;
