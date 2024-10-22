import React, { useState } from "react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Menu } from "lucide-react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import EditProfile from "../EditProfile"; // Import your components
import Notifications from "../Notifications";
import TicketChat from "../TicketChat";
import CreateTicket from "../CreateTicket";
import MyTickets from "../MyTickets";

function SidebarMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile"); // Track active menu item

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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

  function MenuItem({ icon, label, expanded, isActive = false, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center cursor-pointer  ${
          isActive ? "bg-accent-200" : "text-gray-600"
        } ${isExpanded ? "justify-start" : "justify-center"}  rounded-lg`}
      >
        <div className="flex justify-center items-center  w-12 h-12  p-2">
          {icon}
        </div>
        {expanded && <span className="ml-4">{label}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg  md:flex-row m-5 ">
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "w-64" : "w-20"
        }  transition-all duration-300 relative rounded-lg`}
      >
        <div className="bg-white text-nowrap p-5 shadow-lg ">
          {/* Hamburger Menu */}
          <div className="absolute top-4 right-3">
            <Button variant="ghost" onClick={toggleSidebar}>
              <Menu size={24} />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mt-16">
            <Avatar className="mb-4">
              <AvatarImage
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
            </Avatar>
            {isExpanded && (
              <h3 className="text-lg font-medium text-gray-700"> </h3>
            )}
          </div>

          {/* Menu Options */}
          <div className="mt-8 space-y-6">
            <MenuItem
              icon={
                <IoPersonCircleOutline
                  className={`${
                    activeMenu === "profile" ? "text-accent-600" : ""
                  }  transition-all duration-300 relative rounded-lg w-10 h-10`}
                />
              }
              label="ویرایش پروفایل"
              expanded={isExpanded}
              onClick={() => setActiveMenu("profile")} // Set active menu
              isActive={activeMenu === "profile"}
            />
            <MenuItem
              icon={
                <FaBell
                  className={`${
                    activeMenu === "notifications" ? "text-secondary-500" : ""
                  }  transition-all duration-300 relative rounded-lg w-7 h-7`}
                />
              }
              label="اعلان ها"
              expanded={isExpanded}
              onClick={() => setActiveMenu("notifications")} // Set active menu
              isActive={activeMenu === "notifications"}
            />
            <MenuItem
              icon={
                <HiTicket
                  className={`${
                    activeMenu === "tickets" ? "text-primary-700" : ""
                  }  transition-all duration-300 relative rounded-lg w-10 h-10`}
                />
              }
              label="تیکت ها"
              expanded={isExpanded}
              onClick={() => setActiveMenu("tickets")} // Set active menu
              isActive={activeMenu === "tickets"}
            />
            <MenuItem
              icon={
                <CiLogout
                  className={`${
                    activeMenu === "logout" ? "text-state-error-red2" : ""
                  }  transition-all duration-300 relative rounded-lg w-10 h-10`}
                />
              }
              label="خروج از حساب کاربری"
              expanded={isExpanded}
              onClick={() => setActiveMenu("logout")} // Set active menu
              isActive={activeMenu === "logout"}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-grow justify-center py-auto">
        {renderContent()} {/* Render the content based on active menu */}
      </div>
    </div>
  );
}

export default SidebarMenu;
