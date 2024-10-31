import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/Logos/Logo.svg";
import { Button } from "./ui/button";
import Modal from "./SingInModal1";

const Navbar = ({ showModal, setShowModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    { name: "تجربه های سفر", icon: "🌏", href: "/travel-exprience" },
    { name: "جستجو", icon: "🔍", href: "#" },
  ];

  return (
    <nav className="flex font-normal flex-row justify-between items-center m-2 border rounded-lg border-accent-300 relative md:rounded-lg">
      <Modal showModal={showModal} setShowModal={setShowModal} />

      {/* Left-side Buttons for mobile */}
      <div className="absolute left-2 flex items-center md:hidden">
        <Link
          to="profile"
          className="bg-blue-400  text-white px-3 py-1 rounded-lg font-medium text-sm text-nowrap"
        >
          پروفایل
        </Link>
      </div>

      {/* Center Logo */}
      <div className="flex-1 py-2 flex justify-center">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
      </div>

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

      {/* Desktop version (hidden on mobile) */}
      <div className="hidden md:flex w-full justify-between items-center bg-accent-300 p-2 pr-10 rounded-lg h-12 lg:h-20">
        {/* Larger screen menu items */}
        <ul className="flex space-x-2 justify-around w-full text-white">
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
    </nav>
  );
};

export default Navbar;
