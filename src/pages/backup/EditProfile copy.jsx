import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MdEdit } from "react-icons/md"; // Import an edit icon
import React from "react";

function EditProfile() {
  const [fullNameInput, setFullNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [fullName, setFullName] = useState("نام");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setFullName(data.fullName || "نام");
      setPhoneNumber(data.phoneNumber || "");
      setAvatar(data.avatar || "");
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
        fetchProfile();
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // Update avatar for display
      setAvatarInput(reader.result); // Prepare for submission
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-sm h-auto bg-primary-500 mt-5 rounded-lg lg:max-w-lg">
      <div className="flex flex-col gap-10 p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-16 ">
          <Avatar className="mb-4 rounded-full w-24 h-24 relative">
            {avatar && avatar !== "" ? (
              <AvatarImage
                src={avatar}
                alt="Profile"
                className="rounded-full"
              />
            ) : (
              <AvatarFallback className="flex items-center justify-center bg-gray-300 rounded-full w-full h-full" />
            )}

            {/* Button for changing avatar */}
            <Button
              onClick={() => document.getElementById("avatar-upload").click()} // Click to trigger the file input
              className="bg-secondary-400 rounded-full p-1 flex items-center justify-center absolute top-16 right-1 "
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
          <h3 className="text-lg font-medium text-gray-700 mt-2">{fullName}</h3>
        </div>

        {/* Full Name Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">نام و نام خانوادگی</Label>
          <Input
            type="text"
            className="border p-2 rounded-md text-right"
            value={fullNameInput}
            onChange={(e) => setFullNameInput(e.target.value)}
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">شماره موبایل</Label>
          <Input
            type="text"
            className="border p-2 rounded-md text-right"
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">رمز عبور</Label>
          <Input
            type="password"
            className="border p-2 rounded-md text-right"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between mt-6 px-8">
          <Button className="bg-natural-gray3">انصراف</Button>
          <Button className="bg-secondary-400" onClick={handleSave}>
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
