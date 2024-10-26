// AddArticle.jsx
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handling content from CKEditor
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });
  };

  const handleContinue = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.title) validationErrors.title = "عنوان ضروری است.";
    if (!formData.description)
      validationErrors.description = "توضیحات ضروری است.";
    if (!formData.content) validationErrors.content = "محتوا ضروری است.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Move to the publishing step
      navigate("/publish-article", { state: { formData } });
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-accent-200 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-right">ایجاد مقاله</h2>

        <form onSubmit={handleContinue}>
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-right mb-1">
                عنوان مقاله
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="عنوان"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <span className="text-red-500 text-sm text-right">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-right mb-1">
                توضیحات مقاله
              </label>
              <Input
                id="description"
                name="description"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="توضیحات"
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <span className="text-red-500 text-sm text-right">
                  {errors.description}
                </span>
              )}
            </div>

            {/* Content (CKEditor) */}
            <div className="flex flex-col">
              <label htmlFor="content" className="text-right mb-1">
                محتوا
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
                onChange={handleEditorChange}
              />
              {errors.content && (
                <span className="text-red-500 text-sm text-right">
                  {errors.content}
                </span>
              )}
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="bg-secondary-400 text-black px-4 py-2 rounded-md"
            >
              ادامه
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
