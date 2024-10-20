import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

import { Label } from "../components/ui/label";

function CreateTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriorityChange = (value) => {
    setFormData({
      ...formData,
      priority: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("حداکثر حجم فایل 5 مگابایت است");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    let validationErrors = {};
    if (!formData.subject) validationErrors.subject = "عنوان ضروری است.";
    if (!formData.priority) validationErrors.priority = "اولویت ضروری است.";
    if (!formData.content) validationErrors.content = "متن ضروری است.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        // Send form data (example purpose, replace with actual API call)
        alert("تیکت با موفقیت ارسال شد");
      } catch (error) {
        console.error("Error submitting the ticket:", error);
        alert("خطایی رخ داد، لطفاً مجدداً تلاش کنید");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold p-4 text-right">ایجاد تیکت</h2>
        <p className="text-sm font-semibold text-black mb-6 text-right">
          تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد، ساعت پاسخگویی شنبه
          تا پنجشنبه از ساعت ۹ صبح الی ۹شب خواهد بود.(به غیر از روزهای تعطیل
          رسمی)
        </p>

        <form onSubmit={handleSubmit}>
          {/* Ticket Title */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-right mb-1 font-semibold"
            >
              عنوان تیکت
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="عنوان"
              className="w-full"
              value={formData.subject}
              onChange={handleInputChange}
            />
            {errors.subject && (
              <span className="text-red-500 text-sm block text-right mt-1">
                {errors.subject}
              </span>
            )}
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-right mb-1 font-semibold"
            >
              اولویت
            </label>
            <Select onValueChange={handlePriorityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="بالا؟ پایین؟ متوسط؟" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">پایین</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">بالا</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <span className="text-red-500 text-sm block text-right mt-1">
                {errors.priority}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-right mb-1">
              متن
            </label>
            <Textarea
              id="content"
              name="content"
              rows="6"
              placeholder="متن"
              className="w-full"
              value={formData.content}
              onChange={handleInputChange}
            />
            {errors.content && (
              <span className="text-red-500 text-sm block text-right mt-1">
                {errors.content}
              </span>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between items-center">
            {/*send file*/}
            <label className="bg-gray-400 text-white rounded-md px-4 py-2 cursor-pointer">
              ارسال پیوست
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <Button
              type="submit"
              className="bg-yellow-500 text-white rounded-md px-4 py-2"
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
