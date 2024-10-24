import { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BsBookmarks } from "react-icons/bs";
import { BiSolidHeartCircle } from "react-icons/bi";
import { BsBarChartLine } from "react-icons/bs";
// import { CiCircleCheck } from "react-icons/ci";
import { SiLibreofficewriter } from "react-icons/si";
import { CiMedal } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import articlev from "./img/article.mp4";
import { Link } from "react-router-dom";
import React from "react";

const AddArticle = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState(""); // داده‌های CKEditor
  const [previewImage, setPreviewImage] = useState(null); // ذخیره URL پیش‌نمایش
  const imageRef = useRef(null);
  const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(true); // مدیریت وضعیت باز/بسته بودن منوها
  const [isActive, setIsActive] = useState("");
  // تابع برای جابجایی بین منوی اول و دوم
  // const toggleMenu = () => {
  //   setIsFirstMenuOpen(!isFirstMenuOpen); // جابجایی بین باز و بسته بودن منوی اول
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // ایجاد URL برای پیش‌نمایش
    } else {
      setPreviewImage(null); // پاک کردن پیش‌نمایش اگر فایلی انتخاب نشود
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", editorData);

    if (imageRef.current && imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0]); // اضافه کردن فایل به FormData
    }

    try {
      const response = await fetch("http://localhost:9000/articles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setTitle("");
        setEditorData("");
        setPreviewImage(null); // ریست کردن پیش‌نمایش
        imageRef.current.value = ""; // ریست کردن فایل
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleActive = (menuItem) => {
    setIsActive(menuItem);
  };

  return (
    <div className="bg-gray-50 max-w-[320px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1020px] xl:max-w-[1270px]">
      {/* <div className="flex justify-start w-52" 
      dir="rtl" 
      >
        <div className="text-[10px] text-end">
        </div>
      </div> */}
      <div className="flex justify-end p-3">
        <h1 className="text-[10px] text-end w-60 text-gray-400">
          صفحه اصلی &gt; تجربه های سفر &gt; تجربه های سفر من &gt; نوشتن تجریه
          جدید سفر
        </h1>
      </div>
      <div className="flex md:hidden" dir="rtl">
        {/* Hamburger Icon */}
        <div className="flex items-start">
          {/* <div className="space-y-2 cursor-pointer p-4" onClick={toggleMenu}>
            <div className="w-8 h-1 bg-gray-800"></div>
            <div className="w-8 h-1 bg-gray-800"></div>
            <div className="w-8 h-1 bg-gray-800"></div>
          </div> */}

          {/* منوی اول  */}
          {/* {isFirstMenuOpen && ( */}
          {/* <div className="h-full bg-red w-[75px] mb-3 rounded-md shadow-md transition-transform transform"> */}
          <div className="p-4 md:hidden ">
            {/* <div className="flex flex-col items-center ">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="rounded-full"
                  />
                </div> */}
            <ul className="sm:block  mt-6  flex  items-center gap-3 max-w-[150px] ">
              <div className=" flex my-3" onClick={() => toggleActive("write")}>
                <SiLibreofficewriter
                  className={`w-10 h-10 text-black  ${
                    isActive === "write" ? "text-blue-900 " : ""
                  }`}
                />
              </div>
              <div
                className="flex my-3"
                onClick={() => toggleActive("experience")}
              >
                <FaRegCircleCheck
                  className={`w-10 h-10 text-black  ${
                    isActive === "experience" ? "text-green-600" : ""
                  }`}
                />
              </div>
              <div className="flex my-3" onClick={() => toggleActive("chart")}>
                <BsBarChartLine
                  className={`w-10 h-10 text-black  ${
                    isActive === "chart" ? "text-yellow-500" : ""
                  }`}
                />
              </div>
              <div className="flex my-3" onClick={() => toggleActive("travel")}>
                <BiSolidHeartCircle
                  className={`w-10 h-10 text-black  ${
                    isActive === "travel" ? "text-red-900" : ""
                  }`}
                />
              </div>
              <div className="flex my-3" onClick={() => toggleActive("save")}>
                <BsBookmarks
                  className={`w-10 h-10 text-black  ${
                    isActive === "save" ? "text-amber-950" : ""
                  }`}
                />
              </div>
              <div
                className="flex my-3"
                onClick={() => toggleActive("mypoint")}
              >
                <CiMedal
                  className={`w-10 h-10 text-black  ${
                    isActive === "mypoint" ? "text-blue-600" : ""
                  }`}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-around items-center my-10">
        <div className="md:max-w-[400px] md:max-h-[400 px]">
          <video width="600" controls>
            <source src={articlev} type="video/mp4" />
            مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
          </video>
        </div>
        <div
          dir="rtl"
          className=" flex flex-col items-start mb-3 rounded-md h-full w-72 bg-white hidden md:block "
        >
          <div className="p-4 md:block">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="rounded-full"
              />
              <p className="mt-2 text-lg font-semibold">Mehdi Karjo</p>
              <p className="text-black">670 Points</p>
            </div>
            <ul className="mt-2 no-underline ">
              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7  no-underline"
                onClick={() => toggleActive("write")}
              >
                <SiLibreofficewriter
                  className={`w-10 h-10 text-black  ${
                    isActive === "write" ? "text-blue-900 " : ""
                  }`}
                />
                <li className="  p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  نوشتن تجربه جدید سفر
                </li>
              </div>

              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7"
                onClick={() => toggleActive("experience")}
              >
                <FaRegCircleCheck
                  className={`w-10 h-10 text-black  ${
                    isActive === " experience" ? "text-green-600" : ""
                  }`}
                />
                <li className=" p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  تجربیات منتشر شده{" "}
                </li>
              </div>

              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7 "
                onClick={() => toggleActive("chart")}
              >
                <BsBarChartLine
                  className={`w-10 h-10 text-black  ${
                    isActive === "chart" ? "text-yellow-500" : ""
                  }`}
                />
                <li className=" p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  امار بازدید مقاله
                </li>
              </div>

              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7"
                onClick={() => toggleActive("travel")}
              >
                <BiSolidHeartCircle
                  className={`w-10 h-10 text-black  ${
                    isActive === "travel" ? "text-red-900" : ""
                  }`}
                />
                <li className=" p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  سفر های پیشنهادی
                </li>
              </div>

              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7"
                onClick={() => toggleActive("save")}
              >
                <BsBookmarks
                  className={`w-10 h-10 text-black  ${
                    isActive === "save" ? "text-amber-950" : ""
                  }`}
                />
                <li className=" p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  ذخیره مقالات{" "}
                </li>
              </div>

              <div
                className="hover:bg-[#9DDAF9] hover:rounded-md flex my-7"
                onClick={() => toggleActive("mypoint")}
              >
                <CiMedal
                  className={`w-10 h-10 text-black  ${
                    isActive === "mypoint" ? "text-blue-600" : ""
                  }`}
                />
                <li className=" p-2 border-b border-gray-300 text-gray-500 text-[20px]">
                  امتیازات من
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end max-w-[920px] container my-10 mr-10">
        <h1 className="text-[#03C9C9] text-end text-[20px] md:text-[30px]">
          نوشتن تجربه جدید از سفر
        </h1>
        <p className="text-end max-w-[580px] ">
          توی این بخش میتونی تجربه هایی که از سفرت به یه مکان یا شهری که رفتی رو
          بنویسی و اونو در سایت منتشر کنی تا بقیه هم از تجربه ات استفاده کنن و
          هم اینکه جزو نویسنده های سایت ما بشی، اگه نمیدونی چطوری باید یه مقاله
          بنویسی بهت پیشنهاد میکنم فیلم آموزشی بالا که در مورد مقاله نویسی با
          هوش مصنوعی که میتونه بهت کمک زیادی بهت بکنه رو تماشا کن.
        </p>
      </div>

      <form onSubmit={submitForm} className="flex flex-col items-center">
        <div className="flex flex-col items-end my-3">
          <label className="text-sm mb-1 w-full font-bold text-end">
            عنوان مقاله
          </label>
          <input
            className="bg-[#B7B7B7] border-[#7f7d7d] rounded-md text-end p-2 w-[300px] sm:w-[600px]"
            required
            type="text"
            placeholder="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-end my-3">
          <label className="text-sm mb-1">بارگذاری کاور مقاله</label>
          <input
            className="border rounded p-2 w-[300px] sm:w-[600px]"
            required
            type="file"
            accept="image/*"
            ref={imageRef} // اتصال ref به input فایل
            onChange={handleImageChange} // تابع برای مدیریت انتخاب تصویر
          />
        </div>

        {previewImage && (
          <div className="mt-2">
            <img src={previewImage} alt="پیش‌نمایش تصویر" />
          </div>
        )}

        <div className="flex flex-col w-[300px] my-3 sm:w-[600px] lg:w-[1000px]">
          <h1 className="text-end">متن مقاله</h1>

          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "|",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "|",
                "undo",
                "redo",
                "imageUpload",
              ],
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:full",
                  "imageStyle:side",
                ],
              },
              simpleUpload: {
                uploadUrl: "http://localhost:4000/upload-image",
                headers: {},
              },
            }}
          />
        </div>

        <div className=" flex justify-start items-center ">
          <button
            className="bg-[#FFC478] m-1 text-black font-bold text-md rounded-[100px] border-[#CC6902] border-2 w-[80px] h-[40px]"
            type="submit"
          >
            <Link to="/publishing-article">ادامه</Link>
          </button>
          <button className="bg-[#E6E6E6] m-1 text-black font-bold text-md rounded-[100px] border-[#797979] border-2 w-[80px] h-[40px]">
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
