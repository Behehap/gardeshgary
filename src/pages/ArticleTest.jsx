import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ArticlePage = ({ initialArticleId }) => {
  const [articleId, setArticleId] = useState(initialArticleId || null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleContentChange = (event, editor) => {
    setContent(editor.getData());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
      </head>
      <body>
          ${content.trim() || "<p>No content provided</p>"}
      </body>
      </html>
    `;

    const contentBlob = new Blob([formattedContent], { type: "text/html" });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", contentBlob, "content.html");
    formData.append("img", image);

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
        console.error("Error details:", errorResponse);
        alert("Failed to submit the article: " + JSON.stringify(errorResponse));
        return;
      }

      const result = await response.json();
      setArticleId(result.id); // Set articleId after creating the article
      alert("Article submitted successfully!");
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit the article.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            maxLength={255}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Enter your content here...</p>"
            onChange={handleContentChange}
            config={{
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
                "blockQuote",
                "insertTable",
                "|",
                "imageUpload",
                "undo",
                "redo",
              ],
              simpleUpload: {
                uploadUrl: articleId
                  ? `http://127.0.0.1:8000/api/user/articles/${articleId}/images`
                  : "", // Set URL once articleId is available
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  Accept: "application/json",
                },
              },
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Submit Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticlePage;
