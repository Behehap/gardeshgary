import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Upload Adapter for CKEditor to handle file uploads
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("upload", file);

          fetch("http://127.0.0.1:8000/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
              resolve({
                default: res.url, // backend should return the URL to the uploaded image
              });
            })
            .catch((err) => reject(err));
        })
    );
  }

  abort() {
    // Handle aborting file upload
  }
}

// Create adapter plugin for CKEditor
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

function ArticleEditor() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle CKEditor content change
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });
  };

  // Function to handle article submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.title) validationErrors.title = "عنوان ضروری است.";
    if (!formData.description)
      validationErrors.description = "توضیحات ضروری است.";
    if (!formData.content) validationErrors.content = "محتوا ضروری است.";
    if (!formData.tags) validationErrors.tags = "برچسب‌ها ضروری است.";
    if (!formData.category) validationErrors.category = "دسته‌بندی ضروری است.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("category", formData.category);

      try {
        setLoading(true);

        const response = await fetch("http://127.0.0.1:8000/api/articles", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        });

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
        <h2 className="text-xl font-semibold mb-4 text-right">ایجاد مقاله</h2>

        <form onSubmit={handleSubmit}>
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
                config={{
                  extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
                data={formData.content}
                onChange={handleEditorChange}
              />
              {errors.content && (
                <span className="text-red-500 text-sm text-right">
                  {errors.content}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-col">
              <label htmlFor="tags" className="text-right mb-1">
                برچسب‌ها
              </label>
              <Input
                id="tags"
                name="tags"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="برچسب‌ها"
                value={formData.tags}
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
              <Input
                id="category"
                name="category"
                type="text"
                className="border p-2 rounded-md text-right"
                placeholder="دسته‌بندی"
                value={formData.category}
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

export default ArticleEditor;
