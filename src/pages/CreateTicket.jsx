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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-600"></div>
);

function CreateTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("حداکثر حجم فایل 5 مگابایت است");
      return;
    }
    setFile(selectedFile);
  };

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
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.subject);
      formDataToSend.append("message", formData.content);
      formDataToSend.append("priority", formData.priority);
      if (file) {
        formDataToSend.append("file", file);
      }

      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/user/tickets", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        });

        if (response.ok) {
          const res = await response.json();
          toast.success("تیکت با موفقیت ارسال شد");
          console.log("Response:", res);
          navigate("/profile/tickets"); // Navigate after success
        } else {
          const errorData = await response.json();
          toast.error("خطایی رخ داد: " + errorData.message);
        }
      } catch (error) {
        toast.error("خطایی رخ داد، لطفاً مجدداً تلاش کنید");
      } finally {
        setLoading(false);
      }
    } else {
      Object.values(validationErrors).forEach((error) => toast.error(error));
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
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
            <div className="flex flex-col w-full">
              <label htmlFor="subject" className="text-right mb-1"></label>
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
          <div className="flex gap-5 mt-6">
            <div>
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <Button
              type="submit"
              className="bg-secondary-400 text-black px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner /> {/* Display spinner while loading */}
                  <span className="ml-2">در حال ارسال...</span>
                </div>
              ) : (
                "ارسال تیکت"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
