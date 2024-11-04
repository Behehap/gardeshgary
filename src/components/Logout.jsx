import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Adjust imports
import { Button } from "./ui/button";
import sad from "../../public/Assets/sad.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogoutConfirmation() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("شما با موفقیت خارج شدید!");
    localStorage.clear();
    setShowPopup(false);
    navigate("/"); // Navigate to home page
    window.location.reload(); // Reload page to clear state
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {/* Use `top-[20%]` to move the modal higher up the screen */}
      <div className="bg-white w-[300px] p-10 rounded-lg shadow-lg text-center relative top-[-10%]">
        <div className="mb-6">
          <img src={sad} alt="Sad face" />
        </div>

        <p className="text-lg py-6">
          واقعا از حساب کاربری خودت می‌خوای خارج بشی؟
        </p>

        <div className="flex flex-row justify-between w-full gap-5 pt-5">
          <Button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-800 px-1 py-2 rounded-lg w-full hover:bg-gray-300 "
          >
            بله
          </Button>

          {/* استفاده از Link برای هدایت به پروفایل */}
          <Link to="/profile" className="flex items-center w-full">
            <Button className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-full ">
              خیر
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;
