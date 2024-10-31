import React from "react";
import moment from "jalali-moment";
import { FaRegClock } from "react-icons/fa6";
import { PiCalendarDots } from "react-icons/pi";

// Helper function to convert English digits to Persian digits
const toPersianDigits = (num) => {
  return num.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const HomeArticle = ({ title, imageUrl, content, createdAt }) => {
  // Format date and convert digits to Persian
  const persianDate = moment(createdAt).locale("fa").format("YYYY/MM/DD");
  const persianDateWithFarsiNumbers = toPersianDigits(persianDate);

  return (
    <div className="flex bg-white text-white rounded-lg overflow-hidden shadow-lg">
      {/* Article Image with Category Badge */}
      <div className="w-1/3 relative">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-full w-full"
        />
        <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded">
          گردشگری
        </div>
      </div>

      {/* Article Content */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <p
          className="text-gray-400 mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
          <div className="flex items-center">
            <PiCalendarDots className="mr-1" />
            <span>{persianDateWithFarsiNumbers}</span>
          </div>
          <div className="flex items-center">
            <FaRegClock className="mr-1" />
            <span>زمان مطالعه: ۵ دقیقه</span> {/* Placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeArticle;
