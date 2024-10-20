import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min.js";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer1.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateTicket from "./pages/CreateTicket1.jsx";
import TicketChat from "./pages/TicketChat.jsx";
import CompleteProfileModal from "@/components/CompleteProfileModal";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(true);
  return (
    <Router>
      <div>
        <div className="container mx-auto px-auto ">
          <Navbar showModal={showModal} setShowModal={setShowModal} />
          <Switch>
            <Route exact path="/">
              <Home showModal={showModal} setShowModal={setShowModal} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route path="/profile/CreateTicket">
              <CreateTicket />
            </Route>
            <Route path="profile/TicketChat">
              <TicketChat />
            </Route>
            <Route path="/completeProfile">
              <CompleteProfileModal
                showCompleteProfileModal={showCompleteProfileModal}
                setShowCompleteProfileModal={setShowCompleteProfileModal}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
