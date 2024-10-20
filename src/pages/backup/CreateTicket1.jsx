import React, { useState } from "react";
import { createTicket } from "../Services/ContectService"; // Import your API function
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoArrowBack } from "react-icons/io5";
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
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("content", formData.content);
      if (file) {
        formDataToSend.append("file", file); // Attach file if exists
      }

      try {
        setLoading(true); // Set loading state
        const response = await createTicket(formDataToSend);
        alert("تیکت با موفقیت ارسال شد");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error submitting the ticket:", error);
        alert("خطایی رخ داد، لطفاً مجدداً تلاش کنید");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-accent-200 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-4 text-right">ایجاد تیکت</h2>
          <Button>
            <Link to="/profile">
              <IoArrowBack />
            </Link>
          </Button>
        </div>

        <p className="text-sm max-w-sm font-semibold text-gray-500 mb-6 text-right">
          تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد، ساعت پاسخگویی شنبه
          تا پنجشنبه از ساعت ۹ صبح الی ۹شب خواهد بود.(به غیر از روزهای تعطیل
          رسمی)
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-around md:flex-row gap-4">
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
          <div className="flex flex-col mt-4">
            <Label htmlFor="content" className="text-right mb-1">
              متن
            </Label>
            <textarea
              id="content"
              name="content"
              rows="6"
              className="border p-2 rounded-md text-right"
              placeholder="متن"
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
            {errors.content && (
              <span className="text-red-500 text-sm text-right">
                {errors.content}
              </span>
            )}
          </div>

          {/* File Upload Button */}
          <div className="flex gap-5 mt-6">
            {/* Custom styled file input */}
            <div>
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                className="bg-natural-gray3 text-black px-4 py-2 rounded-md cursor-pointer"
                onClick={handleFileButtonClick}
              >
                {file ? file.name : "انتخاب فایل"}
              </Button>
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
