import React from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar"; // Assuming you have a Navbar
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";
import SidebarMenu from "./Menu"; // SidebarMenu is your Menu component
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu";

function Profile() {
  const [activeMenu, setActiveMenu] = useState("profile");

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <EditProfile />;
      case "notifications":
        return <Notifications />;
      case "tickets":
        return <MyTickets />;
      case "logout":
        return <div>Logging out...</div>;
      default:
        return <div>Select a menu item to see content</div>;
    }
  };
  return (
    <div className="flex justify-items- rounded-lg flex-col p-5 bg-primary-500 md:flex-row md:m-5 md:bg-white ">
      <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex w-full justify-center items-center flex-grow  pt-5 ">
        {renderContent()} {/* Render content based on active menu */}
      </div>
    </div>
  );
}

export default Profile;
