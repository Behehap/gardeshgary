import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { RxStarFilled } from "react-icons/rx";
import DOMPurify from "dompurify"; // Import DOMPurify

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/articles/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch the article");

        const data = await response.json();
        setArticle(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to handle rating
  const handleRating = (index) => setRating(index + 1);

  return (
    <div className="container mx-auto p-4 bg-white" dir="rtl">
      {article && (
        <>
          <header className="text-start my-4 mx-4">
            <p className="text-gray-500 text-sm">{article.category}</p>
            <h1 className="text-2xl font-bold mt-2">{article.title}</h1>
          </header>

          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-end">
              <div className="mt-6 max-w-sm flex gap-2 justify-end">
                <Button className="flex-1 border-2 border-secondary-500 rounded-lg shadow-md">
                  ذخیره تجربه
                </Button>
                <Button className="flex-1 border-2 border-secondary-500 py-2 rounded-lg shadow-md">
                  اشتراک گذاری
                </Button>
              </div>
            </div>
            <div className="border border-gray-500"></div>

            <div className="relative">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <span className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                ⭐ {article.rating}
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                اطلاعات مکان گردشگری
              </h2>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-500 ml-2">📍</span>
                  <span>{article.location}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">💸</span>
                  <span>
                    بازدید از این جاذبه گردشگری{" "}
                    {article.isFree ? "رایگان" : "غیر رایگان"} است
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 ml-2">⏰</span>
                  <span>ساعات فعالیت: {article.openingHours}</span>
                </li>
              </ul>
              <div className="flex flex-row gap-5">
                <button className="bg-secondary-400 text-black mt-4 w-full p-2 rounded">
                  نمایش آدرس روی نقشه
                </button>
                <button className="bg-natural-gray3 text-black mt-4 w-full p-2 rounded">
                  نمایش آدرس روی نقشه
                </button>
              </div>
            </div>
            <div className="border border-gray-500"></div>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
            />

            {/* Comment and Rating Section */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                به این تجربه سفر چند امتیاز میدی؟
              </h2>
              <div className="flex space-x-1 justify-center rtl:space-x-reverse mb-4">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRating(index)}
                    className={`cursor-pointer text-4xl lg:text-8xl ${
                      rating > index ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <RxStarFilled />
                  </span>
                ))}
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
                ثبت امتیاز شما
              </button>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="نام:"
                  className="border p-2 rounded w-1/2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="ایمیل:"
                  className="border p-2 rounded w-1/2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <textarea
                placeholder="نظرت رو حتما بگو برای ما مهمه!"
                className="border p-2 rounded w-full h-32"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="bg-gray-400 text-white mt-4 w-full py-2 rounded">
                ارسال نظر
              </button>
            </div>

            {/* User Comments Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">نظرات کاربران</h2>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>دیدگاه های قدیمی</span>
                <span>دیدگاه های جدید</span>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg mb-4">
                <p className="text-gray-700 mb-2">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <button className="text-green-500">👍 40</button>
                    <button className="text-red-500">👎 40</button>
                  </div>
                  <span>هدی کریمی</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
