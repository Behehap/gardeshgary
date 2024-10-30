import React from "react";
const ChatMessage = ({ message, isSupport, senderName, createAt }) => {
  return (
    <div className={`flex ${isSupport ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={` min-w-[250px] rounded-lg p-4 ${
          isSupport ? "bg-accent-700 text-white" : "bg-accent-500 text-white"
        } max-w-lg`}
      >
        <div className="bg-gray-600">
          <p>{senderName}</p>
          <p>{createAt}</p>
          <p className="text-xs text-right">{message.time}</p>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
