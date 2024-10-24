import React from "react";
import Article from "./Article";

const ArticleLists = ({ articles, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {articles.map((item) => (
        <Article key={item.id} article={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ArticleLists;
