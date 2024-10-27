import React from "react";
const ChatMessage = ({ message, isSupport, senderName, createAt }) => {
  return (
    <div className={`flex ${isSupport ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`rounded-lg p-4 ${
          isSupport ? "bg-accent-700 text-white" : "bg-accent-500 text-white"
        } max-w-lg`}
      >
        <p>{createAt}</p>
        <p>{senderName}</p>
        <p>{message}</p>
        <p className="text-xs text-right">{message.time}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
