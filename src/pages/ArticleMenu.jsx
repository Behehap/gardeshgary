import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { HiDocumentPlus } from "react-icons/hi2";
import { BsCheckCircle, BsBarChart } from "react-icons/bs";
import { BiHeartCircle, BiBookmarks } from "react-icons/bi";
import { LiaMedalSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import CompleteProfileModal from "../components/CompleteProfileModal";
import EmptyPage from "./EmptyPage";

function ArticleMenu({
  showCompleteProfileModal,
  setShowCompleteProfileModal,
  checkProfileCompletion,
}) {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = async (to) => {
    await checkProfileCompletion();
    if (showCompleteProfileModal) {
      setShowCompleteProfileModal(true);
    } else {
      navigate(to);
    }
  };

  const MenuItem = ({ icon, label, to, activeColor }) => {
    const isActive = location.pathname === to;

    return (
      <div
        onClick={() => handleMenuItemClick(to)}
        className={`flex items-center cursor-pointer ${
          isActive
            ? `${activeColor} bg-opacity-20 bg-accent-200`
            : "text-gray-600"
        } justify-center lg:justify-start p-2 rounded-lg`}
      >
        <div className="flex justify-center items-center p-2">
          {React.cloneElement(icon, {
            className: `${
              isActive ? activeColor : ""
            } transition-all duration-300 w-6 h-6`,
          })}
        </div>
        <span className="hidden lg:inline-block ml-4 text-nowrap">{label}</span>
      </div>
    );
  };

  return (
    <div className="my-5">
      {showCompleteProfileModal && (
        <CompleteProfileModal
          showCompleteProfileModal={showCompleteProfileModal}
          setShowCompleteProfileModal={setShowCompleteProfileModal}
        />
      )}
      <div className="p-2 bg-white rounded-lg shadow-lg">
        <div className="hidden lg:flex flex-col items-center mt-16">
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
          <h3 className="text-lg font-medium text-gray-700">
            {userData ? userData.name : "Loading..."}
          </h3>
        </div>
        <div className="flex flex-row justify-around lg:flex-col lg:space-y-6 space-x-3 lg:space-x-0 overflow-x-auto">
          <MenuItem
            icon={<HiDocumentPlus />}
            label=" نوشتن تجربه جدید سفر"
            to="/my-travel-experience"
            activeColor="text-accent-600"
          />
          <MenuItem
            icon={<BsCheckCircle />}
            label=" تجربیات منتشر شده"
            to="/my-travel-experience/empty-page1"
            activeColor="text-primary-700"
          />
          <MenuItem
            icon={<BsBarChart />}
            label="آمار بازدید مقاله ها"
            to="/my-travel-experience/empty-page2"
            activeColor="text-secondary-500"
          />
          <MenuItem
            icon={<BiHeartCircle />}
            label=" سفرهای پیشنهادی  "
            to="/my-travel-experience/empty-page3"
            activeColor="text-state-error-red2"
          />
          <MenuItem
            icon={<BiBookmarks />}
            label="  مقالات ذخیره شده من  "
            to="/my-travel-experience/empty-page4"
            activeColor="text-primary-500"
          />
          <MenuItem
            icon={<LiaMedalSolid />}
            to="/my-travel-experience/empty-page5"
            label=" امتیازات من  "
            activeColor="text-accent-500"
            t
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleMenu;
