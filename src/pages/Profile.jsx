import React from "react";
import Navbar from "@/components/Navbar"; // Assuming you have a Navbar
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";
import SidebarMenu from "./Menu"; // SidebarMenu is your Menu component
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu";

function Profile() {
  return (
    <div>
      <Menu />
    </div>
  );
}

export default Profile;
