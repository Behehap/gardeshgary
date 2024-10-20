import React from "react";
import Logo from "../../public/Assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#124E4D] text-white p-8">
      <div className="container mx-auto">
        {/* 3x3 Grid of Images (Keep this as it is working fine) */}
        <div className="grid grid-cols-3 grid-rows-3 w-full h-96 rounded-lg lg:32">
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-1.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-2.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-3.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-5.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-7.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-8.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-4.png')` }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/Assets/photo-6.png')` }}
          ></div>
        </div>
        {/* Lone Logo (Bottom of the Footer) */}
        <img src={Logo} alt="Lone Logo" className="mx-auto h-16" />

        {/* Rest of the footer content (Profile, Services, Contact Us) */}
        <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0 lg:space-x-8 mt-4">
          {/* Profile Links */}
          <div>
            <h3 className="font-semibold mb-4">پروفایل کاربری</h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:underline">
                  ویرایش پروفایل
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  اعلان ها
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  تیکت های من
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="font-semibold mb-4">خدمات سریع</h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:underline">
                  بازگشت به صفحه اصلی
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  دانلود نسخه اپلیکیشن
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  مقالات گردشگری
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">ارتباط با ما</h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:underline">
                  تماس با پشتیبانی
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  موقعیت مکانی ما
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  ارسال تیکت
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center text-sm">
          {/* Footer Text */}
          <p>تمامی حقوق این وبسایت متعلق به...</p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#">
              <img
                src="/path-to-instagram-icon.svg"
                alt="Instagram"
                className="h-8 w-8"
              />
            </a>
            <a href="#">
              <img
                src="/path-to-linkedin-icon.svg"
                alt="LinkedIn"
                className="h-8 w-8"
              />
            </a>
            <a href="#">
              <img
                src="/path-to-youtube-icon.svg"
                alt="YouTube"
                className="h-8 w-8"
              />
            </a>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">عضویت در خبرنامه ما</h4>
            <p>عضو شدن در خبرنامه از اخبار گردشگری</p>
            <div className="flex justify-center mt-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              />
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md ml-2">
                ارسال
              </button>
            </div>
          </div>

          {/* Footer Logos */}
          <div className="flex justify-center space-x-4 mt-4">
            <img src="/path-to-logo1.svg" alt="Logo 1" className="h-8" />
            <img src="/path-to-logo2.svg" alt="Logo 2" className="h-8" />
            <img src="/path-to-logo3.svg" alt="Logo 3" className="h-8" />
            <img src="/path-to-logo4.svg" alt="Logo 4" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
