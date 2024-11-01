import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import image from "../../public/Assets/images/title-pictures avatar.png"; // Ensure the path is correct

const TravelExperience = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/articles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch articles");

      const data = await response.json();
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6">
      <img src={image} alt="Title" className="mb-4" />{" "}
      {/* Use img tag instead of image */}
      <SearchBar className="py-5" />
      <div className="grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </div>
  );
};

export default TravelExperience;
