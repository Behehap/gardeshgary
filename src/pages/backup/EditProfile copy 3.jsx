import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MdEdit } from "react-icons/md";
import React from "react";

function EditProfile() {
  const [fullNameInput, setFullNameInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [originalData, setOriginalData] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    avatar: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Control editability of username and phone number
  const [isUserNameEditable, setIsUserNameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);

  //Controls the page of the ticket

  // Fetch profile data from backend
  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();

      const { fullName, userName, phoneNumber, avatar } = data;
      setFullNameInput(fullName || "");
      setUserNameInput(userName || "");
      setPhoneNumberInput(phoneNumber || "");
      setAvatarInput(avatar || "");

      setOriginalData({
        fullName: fullName || "",
        userName: userName || "",
        phoneNumber: phoneNumber || "",
        avatar: avatar || "",
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Check if inputs are changed or invalid
  const checkIfChangedAndValid = () => {
    const hasChanged =
      fullNameInput !== originalData.fullName ||
      userNameInput !== originalData.userName ||
      phoneNumberInput !== originalData.phoneNumber ||
      avatarInput !== originalData.avatar;

    const hasEmptyField =
      !fullNameInput.trim() ||
      !userNameInput.trim() ||
      !phoneNumberInput.trim();

    setIsChanged(hasChanged);
    setIsSubmitDisabled(!hasChanged || hasEmptyField); // Disable if unchanged or any field is empty
  };

  useEffect(() => {
    checkIfChangedAndValid();
  }, [fullNameInput, userNameInput, phoneNumberInput, avatarInput]);

  // Handle save and send updated data to backend
  const handleSave = async () => {
    const payload = {
      fullName: fullNameInput,
      userName: userNameInput,
      phoneNumber: phoneNumberInput,
      avatar: avatarInput,
    };

    try {
      const response = await fetch("/api/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Profile updated successfully");
        setIsChanged(false);
        fetchProfile(); // Re-fetch profile after update
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    // Reset inputs to original data
    setFullNameInput(originalData.fullName);
    setUserNameInput(originalData.userName);
    setPhoneNumberInput(originalData.phoneNumber);
    setAvatarInput(originalData.avatar);
    setIsChanged(false);
    setIsSubmitDisabled(true);
    setIsUserNameEditable(false);
    setIsPhoneNumberEditable(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarInput(reader.result); // Preview and update avatar
      checkIfChangedAndValid();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (setter, value, originalValue) => {
    setter(value);
    checkIfChangedAndValid();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-sm h-auto bg-primary-500 mt-5 rounded-lg lg:max-w-lg">
      <div className="flex flex-col gap-10 md:p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center md:mt-16">
          <Avatar className="mb-4 rounded-full w-24 h-24 relative">
            {avatarInput ? (
              <AvatarImage
                src={avatarInput}
                alt="Profile"
                className="rounded-full"
              />
            ) : (
              <AvatarFallback className="flex items-center justify-center bg-gray-300 rounded-full w-full h-full" />
            )}

            {/* Button for changing avatar */}
            <Button
              onClick={() => document.getElementById("avatar-upload").click()}
              className="bg-secondary-400 rounded-full p-1 flex items-center justify-center absolute top-16 right-1"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <MdEdit className="text-white" size={16} />
            </Button>

            {/* Hidden file input for avatar upload */}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </Avatar>
          <h3 className="text-lg font-medium text-gray-700 mt-2">
            {fullNameInput}
          </h3>
        </div>

        {/* Full Name Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">نام و نام خانوادگی</Label>
          <Input
            type="text"
            className="border p-2 rounded-md text-right"
            value={fullNameInput}
            onChange={(e) =>
              handleInputChange(
                setFullNameInput,
                e.target.value,
                originalData.fullName
              )
            }
          />
        </div>

        {/* User Name Input */}
        <div className="flex flex-col relative">
          <Label className="py-2 text-white">نام کاربری</Label>
          <div className="relative">
            <Input
              type="text"
              className="border p-2 rounded-md text-right"
              value={userNameInput}
              onChange={(e) =>
                handleInputChange(
                  setUserNameInput,
                  e.target.value,
                  originalData.userName
                )
              }
              disabled={!isUserNameEditable}
            />
            <Button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 "
              onClick={() => setIsUserNameEditable((prev) => !prev)}
            >
              <MdEdit />
            </Button>
          </div>
        </div>

        {/* Phone Input */}
        <div className="flex flex-col relative">
          <Label className="py-2 text-white">شماره موبایل</Label>
          <div className="relative">
            <Input
              type="text"
              className="border p-2 rounded-md text-right"
              value={phoneNumberInput}
              onChange={(e) =>
                handleInputChange(
                  setPhoneNumberInput,
                  e.target.value,
                  originalData.phoneNumber
                )
              }
              disabled={!isPhoneNumberEditable}
            />
            <Button
              className=" absolute left-0 top-1/2 transform -translate-y-1/2 "
              onClick={() => setIsPhoneNumberEditable((prev) => !prev)}
            >
              <MdEdit className="" />
            </Button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between mt-6 px-8">
          <Button className="bg-natural-gray3" onClick={handleCancel}>
            انصراف
          </Button>
          <Button
            className="bg-secondary-400"
            onClick={handleSave}
            disabled={isSubmitDisabled}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
