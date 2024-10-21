import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import CompleteProfileModal from "../components/CompleteProfileModal"; // Your modal

function SidebarMenu() {
  const [isProfileComplete, setIsCompleteProfile] = useState(true);
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation(); // To track current location

  useEffect(() => {
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
        const userData = responseData.data;
        setUserData(userData);
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

  const MenuItem = ({ icon, label, to }) => {
    const isActive = location.pathname === to; // Determine if the route is active
    return (
      <Link to={to}>
        <div
          className={`flex items-center cursor-pointer ${
            isActive ? "bg-accent-200" : "text-gray-600"
          } justify-center md:justify-start rounded-lg p-2`}
        >
          <div className="flex justify-center items-center w-12 h-12 p-2">
            {React.cloneElement(icon, {
              className: `${
                isActive ? "text-accent-600" : ""
              } transition-all duration-300`,
            })}
          </div>
          <span className="hidden md:inline-block ml-4">{label}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="my-5">
      <CompleteProfileModal
        showCompleteProfileModal={showCompleteProfileModal}
        setShowCompleteProfileModal={setShowCompleteProfileModal}
      />
      <div className="p-2 bg-white rounded-lg shadow-lg">
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
          {userData ? (
            <>
              <h3 className="text-lg font-medium text-gray-700">
                {userData.name}
              </h3>
            </>
          ) : (
            <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
          )}
        </div>

        <div className="flex justify-around md:flex-col md:space-y-6">
          <MenuItem
            icon={<IoPersonCircleOutline />}
            label="ویرایش پروفایل"
            to="/profile"
          />
          <MenuItem icon={<FaBell />} label="اعلان ها" to="notifications" />
          <MenuItem icon={<HiTicket />} label="تیکت ها" to="tickets" />
          <MenuItem
            icon={<CiLogout />}
            label="خروج از حساب کاربری"
            to="profile/logout" // Adjust this as necessary
          />
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
