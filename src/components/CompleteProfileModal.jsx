import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaTriangleExclamation } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";

function CompleteProfileModal({
  showCompleteProfileModal,
  setShowCompleteProfileModal,
}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarInput, setAvatarInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarInput(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: fullName,
            username: username,
            avatar: avatarInput,
          }),
        }
      );

      if (response.ok) {
        console.log("Toast should trigger");
        toast.success("پروفایل با موفقیت تکمیل شد!");
        setShowCompleteProfileModal(false);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "خطا در تکمیل پروفایل");
      }
    } catch (error) {
      setErrorMessage("ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showCompleteProfileModal) return null;

  return (
    <div className="fixed w-full inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <ToastContainer />
      <div className="w-full bg-white rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Rings color="#4F46E5" height={80} width={80} />
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="flex flex-col justify-between items-center mb-4 animate-fadeIn">
                {/* Close Button */}
                <div className="flex flex-row w-full justify-start">
                  <button
                    onClick={() => setShowCompleteProfileModal(false)}
                    className="text-start text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <AiOutlineCloseCircle className="h-8 w-8 transition-transform duration-200 hover:scale-110 hover:text-red-500" />
                  </button>
                </div>

                <div className="text-center mt-8 space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    تکمیل پروفایل
                  </h2>
                  <div className="flex justify-center animate-bounce">
                    <FaTriangleExclamation className="w-16 h-16 text-secondary-400 hover:text-secondary-500 transition duration-300" />
                  </div>

                  <p className="text-gray-600 mb-8 px-6 leading-relaxed">
                    برای دسترسی به این قابلیت باید اول پروفایل خود را تکمیل
                    کنید.
                  </p>

                  {/* Continue Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setStep(2)}
                      className="min-w-24 bg-secondary-400 text-black py-3 px-8 rounded-md hover:bg-secondary-500 hover:shadow-lg transform hover:scale-105 transition duration-300"
                    >
                      ادامه
                    </Button>
                  </div>
                  <div className="border-t mt-8 w-3/4 mx-auto border-gray-300"></div>

                  <p className="text-sm text-gray-500 mt-4">
                    تکمیل پروفایل تنها چند دقیقه زمان می‌برد.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <div className="flex flex-col justify-between items-center mb-4">
                  {/* Close Button */}
                  <div className="flex flex-row w-full justify-start">
                    <button
                      onClick={() => setShowCompleteProfileModal(false)}
                      className="text-start text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <AiOutlineCloseCircle className="h-8 w-8 transition-transform duration-200 hover:scale-110 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Header */}
                  <div>
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
                      پروفایل خود را تکمیل کنید
                    </h2>
                    <p className="text-center text-gray-500 mb-10">
                      اطلاعات زیر را وارد کنید تا به امکانات کامل دسترسی داشته
                      باشید.
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="text-red-500 mb-4 flex justify-center">
                    <p className="bg-red-100 p-2 rounded-md">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      <div className="rounded-full w-24 h-24 overflow-hidden border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                        {avatarInput ? (
                          <img
                            src={avatarInput}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                            بدون تصویر
                          </div>
                        )}
                      </div>

                      {/* Edit Icon */}
                      <Button
                        onClick={() =>
                          document.getElementById("avatar-upload").click()
                        }
                        className="absolute bottom-0 right-0 bg-secondary-400 rounded-full p-2 hover:bg-secondary-500 transition duration-300 transform hover:scale-105"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <MdEdit className="text-white" size={18} />
                      </Button>

                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-gray-500 mt-3">یک تصویر بارگذاری کنید</p>
                  </div>

                  {/* Full Name Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      type="text"
                      placeholder="نام خود را وارد کنید"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-400 transition-shadow duration-300"
                    />
                  </div>

                  {/* Username Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      نام کاربری
                    </label>
                    <Input
                      type="text"
                      placeholder="نام کاربری خود را وارد کنید"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-400 transition-shadow duration-300"
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-center mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-secondary-400 text-black py-3 rounded-md hover:bg-secondary-500 transition-colors duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? "در حال ذخیره..." : "ذخیره پروفایل"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CompleteProfileModal;
