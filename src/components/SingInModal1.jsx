import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";

function Modal({ showModal, setShowModal }) {
  const [step, setStep] = useState(1); // step 1 for phone, step 2 for OTP
  const [verificationSuccess, setVerificatoinSuccess] = useState();
  const [phone, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // For handling 6-digit OTP input
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve the phone number from local storage when the component mounts
  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Indicate loading state
    setErrorMessage(""); // Reset any previous error messages

    try {
      // Send phone number to server
      const response = await fetch("http://127.0.0.1:8000/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        // Save the phone number to local storage
        localStorage.setItem("phone", phone);
        setStep(2); // Move to OTP input step
        toast.success("کد تأیید ارسال شد"); // Success toast
      } else {
        // Get error message from the response
        const data = await response.json();
        const errorMsg = data.message || "خطایی رخ داد";
        setErrorMessage(errorMsg); // Display the error message
        toast.error(errorMsg); // Error toast
      }
    } catch (error) {
      const networkErrorMsg = "خطا در ارسال درخواست. لطفا دوباره تلاش کنید.";
      setErrorMessage(networkErrorMsg); // Handle network errors
      toast.error(networkErrorMsg); // Error toast for network issues
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const code = otp.join(""); // Join the OTP array into a single string
    const storedPhone = localStorage.getItem("phone");

    try {
      // ارسال شماره تلفن و کد به سرور برای تأیید
      const response = await fetch("http://127.0.0.1:8000/api/confirm-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: storedPhone, code }),
      });

      if (response.ok) {
        const res = await response.json();
        const token = res.data.access_token; // Access the token correctly

        // Save the token to localStorage
        localStorage.setItem("token", token);
        setShowModal(false);

        setVerificatoinSuccess(true); // Set verification success state
      } else {
        const data = await response.json(); // Ensure we parse the response
        setErrorMessage(data.message || "کد تایید اشتباه است");
      }
    } catch (error) {
      setErrorMessage("خطا در ارسال درخواست. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleChange(e, index) {
    const value = e.target.value;

    if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }

    if (!isNaN(value) && value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  }

  if (!showModal) return null;

  return (
    <div className="fixed w-full inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white min-h-96  rounded-lg shadow-lg max-w-80 w-full p-6 sm:p-8 md:max-w-md lg:max-w-lg">
        {verificationSuccess && (
          <div>
            <Button></Button>
          </div>
        )}
        {!verificationSuccess && (
          <div className="flex justify-start ">
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <AiOutlineCloseCircle className="h-8 w-8" />
            </button>
          </div>
        )}
        {verificationSuccess && (
          <div className="text-state-success-green1 text-center font-semibold m-4">
            ثبت نام با موفقیت انجام شد
            <span className="inline-block ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        )}
        <h2 className="text-center text-2xl font-semibold mb-10 mt-5">
          {step === 1 ? "ورود به حساب کاربری" : "کد تایید"}
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="">
              <label className="block text-right text-gray-700 mb-2">
                شماره موبایل
              </label>
              <Input
                type="tel"
                placeholder="مثلا 09121234567"
                value={phone}
                pattern="09[0-9]{9}"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400 text-left placeholder:text-right"
              />
            </div>
            <div className="flex w-full justify-center">
              <Button
                size="lg"
                type="submit"
                disabled={isLoading}
                className="min-w-20 mt-10 bg-secondary-400 text-black py-2 rounded-md hover:bg-yellow-600 transition-colors md:min-w-60"
              >
                {isLoading ? "در حال ارسال..." : "ادامه"}
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="max-w-md mx-auto bg-white p-8  rounded-lg">
              <p className="text-center mb-6">
                کد ارسال شده به شماره <strong>{phone}</strong> را وارد کنید.
              </p>

              <div className="flex justify-center gap-2 mb-6 flex-row-reverse">
                {otp.map((_, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    className="w-10 h-10 text-center border border-accent-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 md:w-12 md:h-12 "
                  />
                ))}
              </div>
              <div className="flex flex-row text-center mb-4 gap-1 text-xs text-gray-500">
                <span>
                  <LuClock4 className="mt-1 text-secondary-500" />
                </span>
                <span>00:45 دقیقه تا دریافت مجدد کد</span>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                ادامه
              </Button>

              <p className="text-center mt-4 text-sm text-gray-500">
                <a href="#" className="underline">
                  ویرایش شماره موبایل
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
