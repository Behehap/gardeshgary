import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";
import CompleteProfileModal from "../components/CompleteProfileModal"; // Your modal

function SidebarMenu() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [isProfileComplete, setIsCompleteProfile] = useState(true);
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // Call API to check if the profile is complete when the menu loads
    checkProfileCompletion();
  }, []);

  const checkProfileCompletion = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData, "dd");
        const userData = responseData.data; // Access the 'data' object from the response
        setUserData(userData); // Store user data in state
        if (!userData.isCompleteProfile) {
          setIsCompleteProfile(false);
        }
      } else {
        console.error("Error checking profile status.");
      }
    } catch (error) {
      console.error("Failed to fetch profile completion status.", error);
    }
  };

  const handleMenuClick = (menu) => {
    // If the profile is incomplete, show modal
    if (false) {
      // complete profile
      //should be  (  !isProfileComplete   )  after debugging instead if false //
      setShowCompleteProfileModal(true);
    } else {
      setActiveMenu(menu); // Set active menu if profile is complete
    }
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

  function MenuItem({ icon, label, isActive = false, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center cursor-pointer ${
          isActive ? "bg-accent-200" : "text-gray-600"
        } justify-center md:justify-start rounded-lg p-2`}
      >
        <div className="flex justify-center items-center w-12 h-12 p-2">
          {icon}
        </div>
        <span className="hidden md:inline-block ml-4">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex rounded-lg flex-col p-5 bg-primary-500 md:flex-row md:m-5 md:bg-white w-full">
      {/* Profile Completion Modal */}
      <CompleteProfileModal
        showCompleteProfileModal={showCompleteProfileModal}
        setShowCompleteProfileModal={setShowCompleteProfileModal}
      />

      {/* Top Navbar for mobile, Sidebar for desktop */}
      <div className="w-full rounded-lg bg-white md:w-64 transition-all duration-300 relative">
        <div className="p-2 shadow-lg">
          {/* Profile Section (Avatar only shown on desktop) */}
          <div className="hidden md:flex flex-col items-center mt-16">
            <Avatar className="mb-4">
              <AvatarImage
                src={
                  userData && userData.image
                    ? userData.image
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
              />
            </Avatar>
            {/* Conditionally render user name if userData is available */}
            {userData ? (
              <>
                <h3 className="text-lg font-medium text-gray-700">
                  {userData.name}
                </h3>

                {/* <p className="text-sm text-gray-500">{userData.username}</p>
                <p className="text-sm text-gray-500">{userData.phone}</p> */}
              </>
            ) : (
              <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
            )}
          </div>

          {/* Mobile/Tablet Menu (Flex row on small screens, vertical on desktop) */}

          <div className="flex justify-around md:flex-col md:space-y-6 ">
            {/* Decorative line */}

            <MenuItem
              icon={
                <IoPersonCircleOutline
                  className={`${
                    activeMenu === "profile" ? "text-accent-600" : ""
                  } transition-all duration-300 rounded-lg w-10 h-10`}
                />
              }
              label="ویرایش پروفایل"
              onClick={() => handleMenuClick("profile")}
              isActive={activeMenu === "profile"}
            />
            <MenuItem
              icon={
                <FaBell
                  className={`${
                    activeMenu === "notifications" ? "text-secondary-500" : ""
                  } transition-all duration-300 rounded-lg w-7 h-7`}
                />
              }
              label="اعلان ها"
              onClick={() => handleMenuClick("notifications")}
              isActive={activeMenu === "notifications"}
            />
            <MenuItem
              icon={
                <HiTicket
                  className={`${
                    activeMenu === "tickets" ? "text-primary-700" : ""
                  } transition-all duration-300 rounded-lg w-10 h-10`}
                />
              }
              label="تیکت ها"
              onClick={() => handleMenuClick("tickets")}
              isActive={activeMenu === "tickets"}
            />
            <MenuItem
              icon={
                <CiLogout
                  className={`${
                    activeMenu === "logout" ? "text-red-500" : ""
                  } transition-all duration-300 rounded-lg w-10 h-10`}
                />
              }
              label="خروج از حساب کاربری"
              onClick={() => handleMenuClick("logout")}
              isActive={activeMenu === "logout"}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex justify-center flex-grow w-full pt-5 ">
        {renderContent()} {/* Render content based on active menu */}
      </div>
    </div>
  );
}

export default SidebarMenu;
