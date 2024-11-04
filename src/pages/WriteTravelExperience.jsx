import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoCameraOutline, IoCloseCircle } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import articlev from "./img/article.mp4";
import { Button } from "@/components/ui/button";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

function WriteTravelExperience({ initialArticleId }) {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef(null);
  const [articleId, setArticleId] = useState(initialArticleId || null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // Store selected categories as an array
  const [publicationTime, setPublicationTime] = useState(""); // Store selected publication time
  const [showPublishPage, setShowPublishPage] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleContentChange = (event, editor) => {
    setContent(editor.getData());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !content || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Set to next page
    setShowPublishPage(true);
  };

  const handlePublish = async () => {
    if (categories.length === 0) {
      toast.error("لطفاً حداقل یک دسته‌بندی مقاله انتخاب کنید.");
      return;
    }

    setIsPublishing(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("img", image);
    categories.forEach((category) => formData.append("categories[]", category)); // Send categories as array
    formData.append("publication_time", publicationTime); // Add publication time to FormData

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/user/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(
          "Failed to publish the article: " + JSON.stringify(errorResponse)
        );
        setIsPublishing(false);
        return;
      }

      toast.success("Article published successfully!");
      setIsPublishing(false);
    } catch (error) {
      console.error("Error publishing article:", error);
      toast.error("Failed to publish the article.");
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {!showPublishPage ? (
        <div className="flex flex-col w-full lg:w-3/4 lg:p-6">
          {/* First Page Content */}
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <video width="100%" controls className="rounded-md shadow-md">
              <source src={articlev} type="video/mp4" />
              مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
            </video>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start w-full"
          >
            <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 mb-6">
              <label className="text-sm mb-2 font-bold">عنوان مقاله</label>
              <input
                className="bg-gray-200 border-[#7f7d7d] rounded-md text-start p-2 w-full"
                required
                type="text"
                placeholder="عنوان"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div
              className="relative flex items-center justify-center w-full h-64 border border-dashed rounded-lg bg-gray-100 mb-6"
              onClick={() => !previewImage && imageRef.current.click()}
            >
              {previewImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImage}
                    alt="Selected"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                      setImage(null);
                    }}
                  >
                    <IoCloseCircle className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center text-gray-600 cursor-pointer">
                    <IoCameraOutline className="ml-2 w-6 h-6" />
                    <span className="font-semibold">انتخاب عکس</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    ابعاد عکس ها باید 800 در 450 باشد
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </div>

            <div className="w-full min-h-32">
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={handleContentChange}
                config={{
                  language: "fa",
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>

            <Button
              type="submit"
              className="mt-8 bg-primary-500 text-white py-2 px-4 rounded-md w-full md:w-3/4 lg:w-1/2"
            >
              ادامه
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col w-full lg:w-3/4 lg:p-6">
          {/* Second Page Content */}
          <div className="flex flex-row">
            <h1 className="text-start w-full text-primary-500 text-lg md:text-2xl lg:text-3xl mb-4 lg:mb-8">
              اطلاعات تکمیلی مقاله
            </h1>
            <Button
              onClick={() => setShowPublishPage(false)} // Close the publish page and go back to the first page
              size="sm"
              className="text-accent-400 text-3xl flex justify-center"
            >
              <IoArrowBackCircle />
            </Button>
          </div>

          {/* Display selected categories */}
          {categories.length > 0 && (
            <div className="mb-4">
              <span className="font-bold">دسته‌بندی‌های انتخاب شده: </span>
              <span className="text-gray-600">{categories.join(", ")}</span>
            </div>
          )}

          <div className="flex flex-col mb-6">
            <label className="text-sm mb-2 font-bold">دسته بندی مقاله</label>
            <div dir="rtl">
              <Select
                onValueChange={(value) => {
                  setCategories((prevCategories) =>
                    prevCategories.includes(value)
                      ? prevCategories.filter((cat) => cat !== value)
                      : [...prevCategories, value]
                  );
                }}
                multiple // Enables multi-select
              >
                <SelectTrigger className="bg-gray-200 border-[#7f7d7d] rounded-md w-full">
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent className="text-start">
                  <SelectItem value="1">تاریخی</SelectItem>
                  <SelectItem value="2">طبیعی</SelectItem>
                  <SelectItem value="3">فرهنگی</SelectItem>
                  <SelectItem value="4">گردشگری</SelectItem>
                  <SelectItem value="5">مذهبی</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-sm mb-2 font-bold">ساعت انتشار مقاله</label>
            <select
              className="bg-gray-200 border-[#7f7d7d] rounded-md p-2 w-full"
              value={publicationTime}
              onChange={(e) => setPublicationTime(e.target.value)}
            >
              <option value="">ساعت انتشار را انتخاب کنید</option>
              <option value="now">اکنون</option>
              <option value="scheduled">برنامه‌ریزی شده</option>
              {/* Add more options as needed */}
            </select>
            <p className="text-xs mt-2 text-gray-600">
              میتونی همین الان مقاله ات رو منتشر کنی یا گزینه برای زمان بندی
              انتخاب کنی.
            </p>
          </div>

          <div className="flex w-full justify-start mt-4">
            <Button
              type="button"
              className="bg-[#E6E6E6] m-1 text-black font-bold text-md rounded-full border-[#797979] border-2 w-40 h-10"
              onClick={() => setShowPublishPage(false)}
            >
              انصراف از انتشار مقاله
            </Button>
            <Button
              onClick={handlePublish}
              className={`m-1 text-white font-bold text-md rounded-full w-40 h-10 ${
                isPublishing ? "bg-blue-300" : "bg-[#007BFF]"
              }`}
              disabled={isPublishing}
            >
              {isPublishing ? "در حال انتشار مقاله..." : "انتشار مقاله"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteTravelExperience;
