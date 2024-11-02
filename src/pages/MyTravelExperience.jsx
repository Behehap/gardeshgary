import React from "react";
import ArticleMenu from "./ArticleMenu";
import { Routes, Route } from "react-router-dom";
import WriteTravelExperience from "./WriteTravelExperience";
import CompleteProfileModal from "../components/CompleteProfileModal";
import { useState, useCallback, useEffect } from "react";
import EmptyPage from "./EmptyPage";
import { toast } from "react-toastify";
const MyTravelexperience = () => {
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);

  const checkProfileCompletion = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/is-complete",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        setShowCompleteProfileModal(!res); // Show modal if profile is incomplete
      } else {
        toast.error("خطایی رخ داد: ");
      }
    } catch (error) {
      console.log("Failed to connect to server. Please try again.");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkProfileCompletion();
  }, [checkProfileCompletion]);
  return (
    <div className="flex flex-col lg:flex-row w-full p-4 ">
      {showCompleteProfileModal && (
        <CompleteProfileModal
          showCompleteProfileModal={showCompleteProfileModal}
          setShowCompleteProfileModal={setShowCompleteProfileModal}
        />
      )}
      <ArticleMenu
        showCompleteProfileModal={showCompleteProfileModal}
        setShowCompleteProfileModal={setShowCompleteProfileModal}
        checkProfileCompletion={checkProfileCompletion}
      />
      <div>
        <Routes>
          <Route path="/" element={<WriteTravelExperience />} />
          <Route path="/empty-page1" element={<EmptyPage />} />
          <Route path="/empty-page2" element={<EmptyPage />} />
          <Route path="/empty-page3" element={<EmptyPage />} />
          <Route path="/empty-page4" element={<EmptyPage />} />
          <Route path="/empty-page5" element={<EmptyPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyTravelexperience;
