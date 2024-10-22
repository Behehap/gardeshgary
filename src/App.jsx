import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer1.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateTicket from "./pages/CreateTicket.jsx/index.js";
import TicketChat from "./pages/TicketChat.jsx";
import CompleteProfileModal from "@/components/CompleteProfileModal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(true);

  return (
    <Router>
      <div>
        {showCompleteProfileModal && (
          <CompleteProfileModal
            showCompleteProfileModal={showCompleteProfileModal}
            setShowCompleteProfileModal={setShowCompleteProfileModal}
          />
        )}

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
