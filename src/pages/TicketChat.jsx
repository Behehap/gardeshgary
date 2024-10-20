import React, { useState, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import { fetchMessages, sendMessage } from "../Services/ContectService";

export default function TicketChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [useApi, setUseApi] = useState(false); // Temporary toggle to switch between API and static data

  // Sample messages to display when not using the API
  const sampleMessages = [
    {
      text: "سلام! چطور میتونم به شما کمک کنم؟",
      time: "10:30 AM",
      isSupport: true,
    },
    {
      text: "سلام، من یک مشکل در سیستم دارم.",
      time: "10:32 AM",
      isSupport: false,
    },
    {
      text: "لطفا جزئیات مشکل رو بفرمایید.",
      time: "10:33 AM",
      isSupport: false,
    },
  ];

  useEffect(() => {
    async function loadMessages() {
      if (useApi) {
        // Temporarily disable API call by using a flag
        try {
          const data = await fetchMessages();
          if (Array.isArray(data)) {
            setMessages(data);
          } else {
            console.error("Invalid messages data from API");
          }
        } catch (err) {
          console.error("Failed to fetch messages from API", err);
        }
      } else {
        // Use static messages instead of API
        setMessages(sampleMessages);
      }
    }

    loadMessages();
  }, [useApi]);

  // Handle sending new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        time: new Date().toLocaleTimeString(),
        isSupport: false,
      };

      try {
        // For now, just update the local state since API is not being used
        // const newMsg = {
        //   text: newMessage,
        //   time: new Date().toLocaleTimeString(),
        //   isSupport: false,
        // };

        // setMessages([...messages, newMsg]);
        // setNewMessage("");

        const newMsg = await sendMessage(messageData);
        if (newMsg) {
          setMessages([...messages, newMsg]);
          setNewMessage("");
        }
      } catch (err) {
        console.error("Error sending message", err);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row bg-blue-500 justify-between text-white p-4">
        <h1 className="text-xl font-bold">تیکت های من</h1>
        <ul className="flex flex-col md:flex-row font-light gap-16">
          <li>وضعیت: در حال بررسی</li>
          <li>تاریخ ارسال:۱۴۰۳/۰۹/۰۲</li>
          <li>شماره تیکت: ۳۷۴۴۵</li>
        </ul>
      </div>

      {/* Toggle to switch between static and API messages
      <div className="p-4 bg-gray-200 text-sm">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useApi}
            onChange={(e) => setUseApi(e.target.checked)}
          />
          <span>Use API for messages</span>
        </label>
      </div> */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-blue-200">
        <h1 className="font-semibold"> عنوان تیکت: مشکل در ورود به سایت</h1>

        {messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isSupport={message.isSupport}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <h2>هیچ پیامی ارسال نشده</h2>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center p-4 bg-gray-100 gap-3">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="پیام خود را بنویسید..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
