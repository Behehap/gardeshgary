import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/Logos/Logo.svg";
import { Button } from "./ui/button";
import Modal from "./SingInModal1";

const Navbar = ({ showModal, setShowModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu items to be reused
  const menuItems = [
    { name: "مقالات گردشگری", href: "#" },
    { name: "ایران شناسی", href: "#" },
    { name: "برنامه ریزی سفر", href: "#" },
    { name: "تجربه های سفر", href: "#" },
    { name: " جستجو ", href: "#" },
  ];

  return (
    <nav className="flex font-normal flex-row justify-between items-center p-2  ">
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {/* Logo outside the blue div */}
      <div className="flex items-center ">
        <div className="w-18 h-18 bg-accent-300 rounded-full flex justify-center items-center">
          {/* Placeholder for logo */}
          <img src="../../public/Logos/Logo.svg" alt="Logo" />
        </div>
        <span className="text-blue-400 ml-2 text-sm"></span>
      </div>

      {/* Blue background div with buttons */}
      <div className="flex flex-row w-full justify-end items-center bg-accent-300 p-2 pr-10 rounded-lg h-12 lg:h-20">
        {/* Larger screen menu items */}
        <ul className="hidden md:flex space-x-2 justify-around w-full text-white">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="hover:underline text-sm"
            >
              {item.name}
            </Link>
          ))}
        </ul>

        {/* Right side buttons */}
        <div className="flex flex-row items-center gap-1 justify-between md:w-auto">
          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white  md:hidden w-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="flex gap-2">
            <Link
              to="profile"
              className="bg-blue-400 border-2 h-8 border-secondary-500 text-white px-3 py-1 rounded-lg font-medium text-sm text-nowrap"
            >
              پروفایل
            </Link>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-secondary-500 h-8 text-white px-3 py-1 rounded-lg font-medium border-2 border-secondary-500 text-sm text-nowrap"
            >
              ثبت نام
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-out Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 p-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <ul className="space-y-4 text-gray-800 mt-12 text-sm w-full">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="flex items-center space-x-2">
                  <span>{item.name}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
