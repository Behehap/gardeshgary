import React from "react";
import ArticleMenu from "./ArticleMenu";
import { Routes, Route } from "react-router-dom";
import WriteTravelExperience from "./WriteTravelExperience";

const AddArticle = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full p-4 ">
      <ArticleMenu />
      <div>
        <Routes>
          <Route
            path="write-travel-experience"
            element={<WriteTravelExperience />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AddArticle;
