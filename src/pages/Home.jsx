import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/SingInModal1";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import HomeArticle from "../components/HomeArticle"; // Import HomeArticle component

const HomePage = ({ showModal, setShowModal }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/articles",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch articles");

        const data = await response.json();
        setArticles(data); // Assume data is an array of articles
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <div className="container font-normal mx-auto flex flex-col gap-5 mt-4 md:px-4 bg-white">
        {/* Navbar */}

        {/* Hero Section */}
        <div className="flex flex-row justify-between bg-primary-500 rounded-lg mt-16 flex flex-col lg:flex-row-reverse items-center justify-center p-2 py-12">
          {/* Right Section: Map */}
          <div className="lg:w-2/4 flex justify-center mb-10 lg:mb-0">
            <img
              src="../../public/Assets/images/MapIran.png"
              alt="Map of Iran"
              className="w-4/6 lg:max-w-2xl object-contain"
            />
          </div>

          {/* Left Section: Filter and Search */}
          <div className="w-full lg:w-2/6 rounded-lg lg:m-5">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              دیدنی های ایران رو کشف کن!
            </h1>

            {/* Search Input */}
            <div className="mb-4">
              <Input
                placeholder="هرجا رو میخوای جستجو کن"
                className="border-2 border-secondary-200 w-full text-right shadow-md rounded-lg p-2 leading-normal text-base h-10"
              />
            </div>

            <div className="p-3">
              <h1 className="text-lg text-white font-bold">فیلتر کردن مکان</h1>
            </div>
            {/* Filter Box */}
            <div
              className="flex flex-col p-3 gap-3 bg-primary-700 p-1 rounded-lg md:p-6"
              dir="ltr"
            >
              <div className="flex justify-end">
                <h3 className="text-white text-md pb-3">نوع جاذبه</h3>
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-3 justify-items-end  gap-3 md:gap-5 ">
                <div className="flex items-center gap-1">
                  <Switch
                    className="h-5 w-9 md:h-6 md:w-14 "
                    thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4  md:translate-x-0 md:data-[state=checked]:translate-x-8 md:h-5 md:w-5"
                  />
                  <label className="text-white text-sm">طبیعی</label>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    className="h-5 w-9 md:h-6 md:w-14 "
                    thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4  md:translate-x-0 md:data-[state=checked]:translate-x-8 md:h-5 md:w-5"
                  />
                  <label className="text-white text-sm">تاریخی</label>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    className="h-5 w-9 md:h-6 md:w-14 "
                    thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4  md:translate-x-0 md:data-[state=checked]:translate-x-8 md:h-5 md:w-5"
                  />
                  <label className="text-white text-sm">فرهنگی</label>
                </div>
                <div></div>
                <div className="flex items-center gap-1">
                  <Switch
                    className="h-5 w-9 md:h-6 md:w-14 "
                    thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4  md:translate-x-0 md:data-[state=checked]:translate-x-8 md:h-5 md:w-5"
                  />
                  <label className="text-white text-sm">مذهبی</label>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    className="h-5 w-9 md:h-6 md:w-14 "
                    thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4  md:translate-x-0 md:data-[state=checked]:translate-x-8 md:h-5 md:w-5"
                  />
                  <label className="text-white text-sm">گردشگری</label>
                </div>
              </div>

              {/* Apply Filter Button */}
              <Button
                size="sm"
                className="bg-secondary-400 text-black py-2 rounded-lg text-sm"
              >
                اعمال فیلتر
              </Button>
            </div>

            {/* Add Location Section */}
            <div className="text-white text-sm mt-6">
              تو هم اگر مکان خاصی رو میشناسی حتما به ما معرفی کن
            </div>
            <Button className="mt-4 bg-natural-gray3 text-black font-bold py-2 rounded-lg text-sm">
              افزودن مکان
            </Button>
          </div>
        </div>

        {/* Articles Section */}
        <div className=" my-5 p-5 rounded-lg">
          <h1 className="text-xl py-5 font-semibold">مقالات جدید این ماه</h1>

          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => (
                <HomeArticle
                  key={article.id}
                  title={article.title}
                  imageUrl={article.img}
                  content={article.content}
                  createdAt={article.created_at}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
