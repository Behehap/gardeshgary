import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MdEdit } from "react-icons/md"; // Import an edit icon
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

  const [isChanged, setIsChanged] = useState(false); // Track if any input has changed
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();

      const { fullName, userName, phoneNumber, avatar } = data;

      setFullNameInput(fullName || "نام");
      setUserNameInput(userName || "");
      setPhoneNumberInput(phoneNumber || "");
      setAvatarInput(avatar || "");

      setOriginalData({
        fullName: fullName || "نام",
        userName: userName || "",
        phoneNumber: phoneNumber || "",
        avatar: avatar || "",
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
        fetchProfile(); // Fetch updated profile data
        setIsChanged(false); // Reset change tracking
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleCancel = () => {
    // Revert to original data
    setFullNameInput(originalData.fullName);
    setUserNameInput(originalData.userName);
    setPhoneNumberInput(originalData.phoneNumber);
    setAvatarInput(originalData.avatar);
    setIsChanged(false); // Reset change tracking
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarInput(reader.result); // Prepare for submission
      setIsChanged(true); // Mark as changed
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to check if any field has changed
  const handleInputChange = (setter, value, originalValue) => {
    setter(value);
    if (value !== originalValue) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full  max-w-sm h-auto bg-primary-500  rounded-lg lg:max-w-lg">
      <div className="flex flex-col gap-10 p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-16">
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
              onClick={() => document.getElementById("avatar-upload").click()} // Click to trigger the file input
              className="bg-secondary-400 rounded-full p-1 flex items-center justify-center absolute top-16 right-1"
              style={{
                width: "30px", // Set width and height for a circular button
                height: "30px",
                borderRadius: "50%", // Ensure it is perfectly round
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Optional shadow for depth
              }}
            >
              <MdEdit className="text-white" size={16} />
            </Button>

            {/* Hidden file input for avatar upload */}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleAvatarChange}
              className="hidden" // Keep it hidden
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
        <div className="flex flex-col">
          <Label className="py-2 text-white">نام کاربری</Label>
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
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">شماره موبایل</Label>
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
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between mt-6 px-8">
          <Button className="bg-natural-gray3" onClick={handleCancel}>
            انصراف
          </Button>
          <Button
            className="bg-secondary-400"
            onClick={handleSave}
            disabled={!isChanged}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
