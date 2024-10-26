import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import ChatMessage from "../components/ChatMessage";
import { PersonStandingIcon } from "lucide-react";

// API calls to get ticket details and messages
const fetchTicketDetails = async (ticketId) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/tickets/${ticketId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const fetchMessages = async (ticketId) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/tickets/${ticketId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const sendMessage = async (ticketId, messageData) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/tickets/${ticketId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData), // Sending the messageData object
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  return data;
};

export default function TicketChat() {
  const { ticketId } = useParams(); // Get the ticketId from the URL
  const [ticketDetails, setTicketDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch ticket details and messages on component mount
  useEffect(() => {
    async function loadTicketData() {
      try {
        const ticket = await fetchTicketDetails(ticketId);
        setTicketDetails(ticket.data);

        const ticketMessages = await fetchMessages(ticketId);
        setMessages(ticketMessages);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTicketData();
  }, [ticketId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage, // Backend expects 'message' field
      };

      try {
        const sentMessage = await sendMessage(ticketId, messageData);
        setMessages([...messages, sentMessage]); // Append the new message to the list
        setNewMessage(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const formatDateToPersian = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const translateStatus = (status) => {
    switch (status) {
      case "closed":
        return "بسته شده";
      case "waiting for reply":
        return "در انتظار پاسخ";
      case "":
        return "";
      default:
        return status; // Keep original if not matched
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-[750px] rounded-xl">
      {/* Header */}
      {ticketDetails && (
        <div className="flex flex-col md:flex-row bg-accent-200 justify-between text-black p-4">
          <div>
            <h1 className="text-2xl font-bold pl-10">{ticketDetails.title}</h1>
          </div>
          <ul className="flex flex-row md:flex-row font-light gap-16 px-2 text-center">
            <li>وضعیت: {translateStatus(ticketDetails.status)}</li>
            <li>تاریخ ارسال: {formatDateToPersian(ticketDetails.create_at)}</li>
            <li>شماره تیکت: {ticketId}</li>
          </ul>
          <div className="flex flex-col justify-start">
            <Button size="sm" className="text-accent-400 text-4xl">
              <Link to="/profile/tickets">
                <IoArrowBackCircle />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-accent-200 border-t border-natural-gray2">
        <h1 className="font-semibold"> عنوان تیکت: {ticketDetails?.title}</h1>

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
