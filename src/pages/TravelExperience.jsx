import { useEffect, useState } from "react";
import AddArticle from "../components/AddArticle";
import ArticleLists from "../components/ArticleLists";
import React from "react";

const AArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:9000/articles");
      const responseData = await response.json();
      setArticles(responseData);
    };
    sendRequest();
  }, []);

  const addProduct = async (article) => {
    // از یک شیء استفاده کنید
    const response = await fetch("http://localhost:9000/articles", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(article), // ارسال شیء مقاله
    });

    const responseData = await response.json();
    setArticles([...articles, responseData]);
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:9000/articles/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Error deleting product:", response.statusText);
      return;
    }

    setArticles(articles.filter((item) => item.id !== id));
  };

  return (
    <div dir="ltr">
      <div className="flex flex-col items-center mt-3">
        <AddArticle onAdd={addProduct} />
      </div>
    </div>
  );
};

export default AArticle;
