// PublishArticle.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

function PublishArticle() {
  const { state } = useLocation();
  const { formData } = state;
  const [additionalData, setAdditionalData] = useState({
    tags: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData({
      ...additionalData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!additionalData.tags) validationErrors.tags = "برچسب‌ها ضروری است.";
    if (!additionalData.category)
      validationErrors.category = "دسته‌بندی ضروری است.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", additionalData.tags);
      formDataToSend.append("category", additionalData.category);

      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/articles",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formDataToSend,
          }
        );

        if (response.ok) {
          alert("مقاله با موفقیت ارسال شد");
          navigate("/profile/articles");
        } else {
          const errorData = await response.json();
          alert("خطا در ارسال: " + errorData.message);
        }
      } catch (error) {
        alert("خطا در ارسال مقاله: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-accent-200 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-right">انتشار مقاله</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Tags */}
            <div className="flex flex-col">
              <label htmlFor="tags" className="text-right mb-1">
                برچسب‌ها
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="برچسب‌ها"
                value={additionalData.tags}
                onChange={handleInputChange}
              />
              {errors.tags && (
                <span className="text-red-500 text-sm text-right">
                  {errors.tags}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-right mb-1">
                دسته‌بندی
              </label>
              <input
                id="category"
                name="category"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="دسته‌بندی"
                value={additionalData.category}
                onChange={handleInputChange}
              />
              {errors.category && (
                <span className="text-red-500 text-sm text-right">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Publish Button */}
            <Button
              type="submit"
              className="bg-secondary-400 text-black px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "انتشار مقاله"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublishArticle;
