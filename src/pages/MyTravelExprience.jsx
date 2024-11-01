import { useState, useRef } from "react";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoCameraOutline, IoCloseCircle } from "react-icons/io5";
import articlev from "./img/article.mp4";
import ArticleMenu from "./ArticleMenu";

const AddArticle = ({ initialArticleId }) => {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef(null);
  const [articleId, setArticleId] = useState(initialArticleId || null);

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

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
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit the article.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full p-4 ">
      <div className="w-full lg:w-1/4 mb-6 lg:mb-0 px-3 ">
        <ArticleMenu />
      </div>

      <div className="flex flex-col w-full lg:w-3/4 lg:p-6">
        <div className="w-full flex justify-center mb-6 lg:mb-10">
          <video width="100%" controls className="rounded-md shadow-md">
            <source src={articlev} type="video/mp4" />
            مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
          </video>
        </div>

        <div className="flex flex-col max-w-full container mb-8">
          <h1 className="text-start text-primary-500 text-lg md:text-2xl lg:text-3xl mb-4 lg:mb-8">
            نوشتن تجربه جدید از سفر
          </h1>
          <p className="text-start max-w-full md:max-w-[580px] mb-6 lg:pl-4">
            توی این بخش میتونی تجربه هایی که از سفرت به یه مکان یا شهری که رفتی
            رو بنویسی و اونو در سایت منتشر کنی تا بقیه هم از تجربه ات استفاده
            کنن و هم اینکه جزو نویسنده های سایت ما بشی، اگه نمیدونی چطوری باید
            یه مقاله بنویسی بهت پیشنهاد میکنم فیلم آموزشی بالا که در مورد مقاله
            نویسی با هوش مصنوعی که میتونه بهت کمک زیادی بهت بکنه رو تماشا کن.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full"
        >
          <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 mb-6">
            <label className="text-sm mb-2 font-bold">عنوان مقاله</label>
            <input
              className="bg-gray-200 border-[#7f7d7d] rounded-md text-start p-2 w-full"
              required
              type="text"
              placeholder="عنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div
            className="relative flex items-center justify-center w-full h-64 border border-dashed rounded-lg bg-gray-100 mb-6"
            onClick={() => !previewImage && imageRef.current.click()}
          >
            {previewImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewImage}
                  alt="Selected"
                  className="object-cover w-full h-full rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:bg-red-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(null);
                    setImage(null);
                  }}
                >
                  <IoCloseCircle className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center text-gray-600 cursor-pointer">
                  <IoCameraOutline className="ml-2 w-6 h-6" />
                  <span className="font-semibold">انتخاب عکس</span>
                </div>
                <p className="text-xs text-gray-500">
                  ابعاد عکس ها باید 800 در 450 باشد
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <label className="text-start mb-2 font-bold">متن مقاله</label>
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

          <div className="flex w-full justify-start">
            <button
              type="button"
              className="bg-[#E6E6E6] m-1 text-black font-bold text-md rounded-full border-[#797979] border-2 w-20 h-10"
            >
              انصراف
            </button>
            <button
              className="bg-[#FFC478] m-1 text-black font-bold text-md rounded-full border-[#CC6902] border-2 w-20 h-10"
              type="submit"
            >
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
