import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/Logos/Logo.svg";
import { Button } from "./ui/button";
import Modal from "./SingInModal1";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = ({ showModal, setShowModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check for token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Menu items to be reused
  const menuItems = [
    { name: "مقالات گردشگری", icon: "📄", href: "#" },
    { name: "ایران شناسی", icon: "📑", href: "#" },
    { name: "برنامه ریزی سفر", icon: "📅", href: "#" },
    {
      name: "تجربه های سفر",
      icon: "🌏",
      href: "/travel-experience",
      hasDropdown: true,
    },
    { name: "جستجو", icon: "🔍", href: "#" },
  ];

  return (
    <nav className="md:flex md:flex-row pt-5 px-4">
      <div className="hidden md:flex justify-center">
        <img src={Logo} alt="Logo" className="w-13 h-13" />
      </div>
      <div className="flex w-full font-normal flex-row justify-between items-center m-2 border-2 rounded-lg border-accent-200 relative md:rounded-lg">
        <Modal showModal={showModal} setShowModal={setShowModal} />

        {/* Left-side Buttons for mobile */}
        <div className="absolute left-2 flex items-center md:hidden">
          {isAuthenticated ? (
            <Link
              to="profile"
              className="flex items-center justify-center gap-1 border-2 h-8 border-secondary-500 text-black px-3 py-5 rounded-md font-medium text-sm text-nowrap"
            >
              <BsFillPersonFill className="text-xl" />
              پروفایل
            </Link>
          ) : (
            <Button
              onClick={() => setShowModal(true)}
              className="bg-secondary-500 text-white px-3 py-1 rounded-lg font-medium text-sm text-nowrap"
            >
              ثبت نام
            </Button>
          )}
        </div>

        {/* Center Logo */}
        <div className="flex-1 py-2 flex justify-center">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
        </div>

        {/* Right-side Hamburger Menu for mobile */}

        {/* Right-side Hamburger Menu for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-2 text-black md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Full-screen mobile menu with dropdown for "Travel Experiences" */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-gray-600 mb-4"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col items-center w-full space-y-4">
              {menuItems.map((item, index) => (
                <li key={index} className="text-black w-full">
                  <Link
                    to={item.href}
                    className="block w-full text-center py-3 text-lg font-medium hover:bg-gray-100 rounded"
                    onClick={() => {
                      if (item.hasDropdown) {
                        setIsDropdownOpen((prev) => !prev);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {item.icon} {item.name}
                  </Link>
                  {/* Nested dropdown menu for "Travel Experiences" */}
                  {item.hasDropdown && isDropdownOpen && (
                    <div className="w-full bg-gray-50">
                      <Link
                        to="/travel-experience"
                        className="block py-2 px-4 text-center hover:bg-gray-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        صفحه تجربیات
                      </Link>
                      <Link
                        to="/my-travle-experience"
                        className="block py-2 px-4 text-center hover:bg-gray-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        تجربه های سفر من
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Desktop version (hidden on mobile) */}
        <div className="hidden md:flex w-full justify-between items-center p-2 pr-10 rounded-lg h-12 lg:h-20">
          {/* Larger screen menu items */}
          <ul className="flex space-x-2 justify-around w-full text-black pl-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <Link
                  to={item.href}
                  className="hover:underline text-sm"
                  onClick={() => {
                    if (item.hasDropdown) {
                      setIsDropdownOpen((prev) => !prev);
                    }
                  }}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && isDropdownOpen && (
                  <div className="absolute top-full mt-1 bg-white border rounded shadow-lg text-sm text-black">
                    <Link
                      to="/travel-experience"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      صفحه تجربیات
                    </Link>
                    <Link
                      to="/my-travel-experience"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      تجربه های سفر من
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </ul>

          {/* Right side buttons */}
          <div className="flex gap-2">
            {isAuthenticated ? (
              <Link
                to="profile"
                className="flex items-center justify-center gap-1 border-2 h-8 border-secondary-500 text-black px-3 py-4 rounded-md font-medium text-sm text-nowrap"
              >
                <BsFillPersonFill className="text-xl" />
                پروفایل
              </Link>
            ) : (
              <Button
                onClick={() => setShowModal(true)}
                className="bg-secondary-500 h-8 text-white px-3 py-4 rounded-lg font-medium border-2 border-secondary-500 text-sm text-nowrap"
              >
                ثبت نام
              </Button>
            )}

            {/* New Additional Button */}
            <Button className="bg-secondary-500 border border-secondary-500 h-8 text-white px-3 py-4 rounded-md font-medium   text-sm text-nowrap">
              دانلود اپلیکیشن
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
