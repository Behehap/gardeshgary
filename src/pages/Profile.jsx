import React from "react";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";
import Menu from "./Menu";

function Profile() {
  return (
    <div className="flex justify-items rounded-lg flex-col p-5 bg-primary-500 md:flex-row md:m-5 md:bg-white">
      <Menu /> {/* Always show the menu */}
      <div className="flex w-full justify-center items-center flex-grow pt-5">
        <Routes>
          <Route path="notifications" element={<Notifications />} />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="/" element={<EditProfile />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
