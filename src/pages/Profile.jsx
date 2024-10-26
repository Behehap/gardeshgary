import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";
import CreateTicket from "./CreateTicket";
import TicketChat from "./TicketChat";
import Menu from "./Menu";
import CompleteProfileModal from "@/components/CompleteProfileModal";

function Profile() {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);

  const checkProfileCompletion = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/is-complete",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        setShowCompleteProfileModal(!res); // Show modal if profile is incomplete
      } else {
        alert("خطایی رخ داد");
      }
    } catch (error) {
      console.log("Failed to connect to server. Please try again.");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkProfileCompletion();
  }, [checkProfileCompletion]);

  return (
    <div className="flex rounded-lg flex-col p-5 bg-primary-500 md:flex-row md:bg-white">
      {showCompleteProfileModal && (
        <CompleteProfileModal
          showCompleteProfileModal={showCompleteProfileModal}
          setShowCompleteProfileModal={setShowCompleteProfileModal}
        />
      )}
      <Menu
        showCompleteProfileModal={showCompleteProfileModal}
        setShowCompleteProfileModal={setShowCompleteProfileModal}
        checkProfileCompletion={checkProfileCompletion}
      />
      <div className="flex w-full justify-center items-center flex-grow pt-5">
        <Routes>
          <Route path="notifications" element={<Notifications />} />
          <Route path="tickets/create-ticket" element={<CreateTicket />} />
          <Route
            path="tickets/ticket-chat/:ticketId"
            element={<TicketChat />}
          />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="/" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
