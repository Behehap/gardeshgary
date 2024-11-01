import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div
      className="relative p-[1px] rounded-lg shadow-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(125.73deg, #FFB3B3 3%, #B1EDFF 30%, #FFD7B0 60%, #D6B0FF 97%)",
      }}
    >
      {/* Inner card content with padding for border effect */}
      <div className="bg-white rounded-lg px-4 py-2 shadow-lg  md:min-w-[300px] min-h-[250px] md:min-h-[350px]">
        <div className="flex flex-row justify-end text-black p-2 pb-2">
          <span className="border border-secondary-500 rounded p-1">
            گردشگری
          </span>
        </div>
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-32 md:h-40 object-cover rounded-lg"
        />
        <h3 className="text-base md:text-lg font-semibold mt-2">
          {article.title}
        </h3>
        <p className="text-sm md:text-base text-gray-500">
          {article.description}
        </p>
        <div className="flex mt-4 md:mt-6 justify-end">
          <button className="mt-2 md:mt-4 bg-accent-400 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg">
            ادامه مطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
