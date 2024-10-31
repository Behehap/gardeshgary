import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ArticlePage = ({ initialArticleId }) => {
  const [articleId, setArticleId] = useState(initialArticleId || null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [articles, setArticles] = useState([]); // State to store fetched articles
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // Loading indicator state

  // Fetch articles from backend
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/articles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setArticles(data); // Update to use the correct data format
    } catch (error) {
      setError(error.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
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
        alert("Failed to submit the article: " + JSON.stringify(errorResponse));
        return;
      }

      const result = await response.json();
      setArticleId(result.id);
      alert("Article submitted successfully!");
      fetchArticles(); // Refresh articles list after successful submission
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
                  : "",
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

      {/* Articles Display Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Articles</h2>
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="border p-4 rounded-md shadow-sm">
                <h3 className="text-xl font-medium">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  Status: {article.status}
                </p>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(article.created_at).toLocaleString()}
                </p>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                {article.img && (
                  <img
                    src={article.img}
                    alt={article.title}
                    className="mt-4 max-h-64 object-cover rounded-md"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
