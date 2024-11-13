import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import RingsLoader from "../components/Loader"; // Import the loader
import image from "../../public/Assets/images/title-pictures avatar.png";

const TravelExperience = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

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
      setAllTags([...new Set(data.flatMap((article) => article.tags))]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredArticles = articles.filter((article) => {
    const matchesQuery = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => article.tags.includes(tag));
    return matchesQuery && matchesTags;
  });

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 relative">
      {/* Full-page loader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-md">
          <RingsLoader visible={true} />
        </div>
      )}

      <img src={image} alt="Title" className="mb-4" />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        className="py-5"
      />

      {/* Tags filter UI */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <label key={tag} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </div>
  );
};

export default TravelExperience;
