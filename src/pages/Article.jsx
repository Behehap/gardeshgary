import React from "react";
const Article = ({ article, onDelete }) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <h3 className="font-bold">{article.title}</h3>
      <p>{article.text}</p>

      <button
        onClick={() => onDelete(article.id)}
        className="bg-[#047C81] w-[900px] text-white rounded p-2 mt-2"
      >
        حذف
      </button>
    </div>
  );
};

export default Article;
