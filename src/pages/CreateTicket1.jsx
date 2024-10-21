import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IoArrowBackCircle } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function CreateTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection and validate size
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("حداکثر حجم فایل 5 مگابایت است");
      return;
    }
    setFile(selectedFile);
  };

  // Trigger file input click programmatically
  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.subject) validationErrors.subject = "عنوان ضروری است.";
    if (!formData.priority) validationErrors.priority = "اولویت ضروری است.";
    if (!formData.content) validationErrors.content = "متن ضروری است.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Prepare form data for submission
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.subject);
      formDataToSend.append("message", formData.content);
      formDataToSend.append("priority", formData.priority);
      if (file) {
        formDataToSend.append("file", file); // Attach file if exists
      }

      try {
        setLoading(true); // Set loading state
        const response = await fetch("http://127.0.0.1:8000/api/user/tickets", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
          body: formDataToSend,
        });

        if (response.ok) {
          const res = await response.json();
          alert("تیکت با موفقیت ارسال شد");
          console.log("Response:", res);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("خطایی رخ داد: " + errorData.message);
        }
      } catch (error) {
        console.error("Error submitting the ticket:", error);
        alert("خطایی رخ داد، لطفاً مجدداً تلاش کنید");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className=" flex justify-center items-center w-full">
      <div className="bg-accent-200 shadow-lg rounded-lg p-8 w-full max-w-2xl ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-right">
              ایجاد تیکت
            </h2>
            <p className="text-sm max-w-sm font-semibold text-black mb-6 text-right">
              تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد، ساعت پاسخگویی
              شنبه تا پنجشنبه از ساعت ۹ صبح الی ۹ شب خواهد بود.(به غیر از روزهای
              تعطیل رسمی)
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <Button size="sm" className="text-accent-400 text-4xl">
              <Link to="/profile/tickets">
                <IoArrowBackCircle />
              </Link>
            </Button>
          </div>
        </div>
        <div className="border-t border-natural-gray2 w-full"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-around md:flex-row gap-4 mt-6">
            {/* Ticket Title */}
            <div className="flex flex-col w-full">
              <label htmlFor="subject" className="text-right mb-1">
                عنوان تیکت فارسی
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="عنوان"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && (
                <span className="text-red-500 text-sm text-right">
                  {errors.subject}
                </span>
              )}
            </div>

            {/* Priority */}
            <div className="flex w-full flex-col">
              <Label htmlFor="priority" className="text-right mb-1">
                اولویت
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger dir="rtl" className="w-full">
                  <SelectValue placeholder="بالا , پایین , متوسط ؟ " />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  <SelectGroup>
                    <SelectItem value="low">پایین</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">بالا</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.priority && (
                <span className="text-red-500 text-sm text-right">
                  {errors.priority}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col mt-24">
            <Label htmlFor="content" className="text-right mb-1">
              متن
            </Label>
            <Textarea
              id="content"
              name="content"
              rows="6"
              className="border p-2 rounded-md text-right min-h-64"
              placeholder="متن"
              value={formData.content}
              onChange={handleInputChange}
            ></Textarea>
            {errors.content && (
              <span className="text-red-500 text-sm text-right">
                {errors.content}
              </span>
            )}
          </div>

          {/* File Upload Button */}
          <div className="flex gap-5 mt-6">
            <div>
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {/* <Button
                type="button"
                className="bg-natural-gray3 text-black px-4 py-2 rounded-md cursor-pointer"
                onClick={handleFileButtonClick}
              >
                {file ? file.name : "انتخاب فایل"}
              </Button> */}
            </div>

            <Button
              type="submit"
              className="bg-secondary-400 text-black px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ارسال تیکت"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
