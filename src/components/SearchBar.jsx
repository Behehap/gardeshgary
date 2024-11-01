import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Card } from "./ui/card";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [attractionType, setAttractionType] = useState([]);
  const [nonAttractionType, setNonAttractionType] = useState([]);
  const [attractionCategory, setAttractionCategory] =
    useState("non-attraction");
  const [isDropdownOpenAttraction, setIsDropdownOpenAttraction] =
    useState(false);
  const [isDropdownOpenNonAttraction, setIsDropdownOpenNonAttraction] =
    useState(false);

  const handleCheckboxChange = (type, list, setList) => {
    setList((prevList) =>
      prevList.includes(type)
        ? prevList.filter((t) => t !== type)
        : [...prevList, type]
    );
  };

  const handleSearch = () => {
    onSearch(city, attractionType, attractionCategory, nonAttractionType);
  };

  return (
    <Card className="p-6 space-y-4 bg-[#00BBBB] w-full  shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row max-w-[350px] md:max-w-[800px] lg:max-w-[1000px] gap-5 items-center md:items-center">
        {/* City Search Input */}
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="نام شهر"
          className="p-2 rounded-lg bg-white text-black w-full md:w-72"
        />

        {/* Attraction Category Dropdown */}
        <Select
          value={attractionCategory}
          onChange={(value) => setAttractionCategory(value)}
          label="نوع جاذبه"
          placeholder="غیر جاذبه"
          options={[
            { value: "non-attraction", label: "غیر جاذبه" },
            { value: "attraction", label: "جاذبه" },
          ]}
          className="w-full md:w-48"
        />

        {/* Attraction Type Multi-Select Dropdown */}
        <div className="relative w-full md:w-72">
          <Button
            onClick={() => setIsDropdownOpenAttraction((prev) => !prev)}
            className="w-full text-left bg-white border border-gray-300 rounded-lg p-2"
          >
            Select Attraction Types
          </Button>

          {isDropdownOpenAttraction && (
            <Card className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg p-4 space-y-2">
              {[
                { value: "natural", label: "طبیعی" },
                { value: "historical", label: "تاریخی" },
                { value: "cultural", label: "فرهنگی" },
                { value: "urban-tourism", label: "گردشگری شهری" },
                { value: "religious", label: "مذهبی" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <Checkbox
                    checked={attractionType.includes(option.value)}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        option.value,
                        attractionType,
                        setAttractionType
                      )
                    }
                    id={option.value}
                    className="mr-2"
                  />
                  <label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </Card>
          )}
        </div>

        {/* Non-Attraction Type Multi-Select Dropdown */}
        <div className="relative w-full md:w-72">
          <Button
            onClick={() => setIsDropdownOpenNonAttraction((prev) => !prev)}
            className="w-full text-left bg-white border border-gray-300 rounded-lg p-2"
          >
            Select Non-Attraction Types
          </Button>

          {isDropdownOpenNonAttraction && (
            <Card className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg p-4 space-y-2">
              {[
                { value: "restaurants", label: "رستوران ها" },
                { value: "recreational-areas", label: "مناطق تفریحی" },
                { value: "shopping-centers", label: "مراکز خرید" },
                { value: "fast-food", label: "فست فودی ها" },
                { value: "cafes", label: "کافه ها" },
                { value: "accommodations", label: "اقامت گاه ها" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <Checkbox
                    checked={nonAttractionType.includes(option.value)}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        option.value,
                        nonAttractionType,
                        setNonAttractionType
                      )
                    }
                    id={option.value}
                    className="mr-2"
                  />
                  <label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSearch}
          className="bg-[#FFA500] text-white rounded-lg p-2"
        >
          اعمال فیلتر
        </Button>
      </div>
    </Card>
  );
};

export default SearchBar;
