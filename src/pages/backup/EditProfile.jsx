import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function EditProfile() {
  // State for the form fields
  const [fullName, setFullName] = useState(" ");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState(""); // Assuming you let them change the password
  const [avatar, setAvatar] = useState("");

  // Handle form submission
  const handleSave = async () => {
    const payload = {
      fullName,
      phoneNumber,
      avatar,
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
        // Handle successful update
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  // Handle avatar upload (assuming it's a URL or base64)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // This will set the image to base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-sm h-auto bg-primary-500 mt-5 rounded-lg lg:max-w-lg">
      <div className="flex flex-col gap-10 p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-16">
          <Avatar className="mb-4 rounded-full w-24 h-24">
            <AvatarImage src={avatar} alt="Profile" className="rounded-full" />
            <AvatarFallback className="flex items-center justify-center bg-gray-300 rounded-full text-xl"></AvatarFallback>
          </Avatar>
          <input
            type="file"
            onChange={handleAvatarChange}
            className="mt-2 text-white"
          />
        </div>

        {/* Full Name Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">نام و نام خانوادگی</Label>
          <Input
            type="text"
            className="border p-2 rounded-md text-right"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">شماره موبایل</Label>
          <Input
            type="text"
            className="border p-2 rounded-md text-right"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <Label className="py-2 text-white">رمز عبور</Label>
          <Input
            type="password"
            className="border p-2 rounded-md text-right"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
