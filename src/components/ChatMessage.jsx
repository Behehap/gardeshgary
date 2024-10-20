import React from "react";
const ChatMessage = ({ message, isSupport }) => (
  <div className={`flex ${isSupport ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`rounded-lg p-4 ${
        isSupport ? "bg-gray-300 text-gray-900" : "bg-blue-500 text-white"
      } max-w-lg`}
    >
      <p>{message.text}</p>
      <p className="text-xs text-right">{message.time}</p>
    </div>
  </div>
);

export default ChatMessage;
