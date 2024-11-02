import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import ChatMessage from "../components/ChatMessage";

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

const sendMessage = async (ticketId, messageData) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/tickets/${ticketId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  return data;
};

export default function TicketChat() {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTicketData() {
      try {
        const ticket = await fetchTicketDetails(ticketId);
        setTicketDetails(ticket.data);
        setMessages(ticket.data.message);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTicketData();
  }, [ticketId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage,
      };

      try {
        const sentMessage = await sendMessage(ticketId, messageData);
        setMessages([...messages, sentMessage]);
        setNewMessage("");
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
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center px-2 w-full md:px-4">
      <div className="flex flex-col  min-h-[600px] w-full max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-3xl rounded-lg shadow-lg">
        {ticketDetails && (
          <div className="flex flex-col md:flex-row items-start md:items-center bg-accent-200 justify-between text-black p-2 md:p-4 rounded-t-lg">
            <div className="flex basis-3/6 md:basis-1/6  justify-between w-full items-center gap-2">
              <h1 className="text-lg md:text-2xl font-semibold">تیکت های من</h1>
              <Button
                size="sm"
                className="text-accent-400 text-3xl md:hidden flex justify-center"
              >
                <Link to="/profile/tickets">
                  <IoArrowBackCircle />
                </Link>
              </Button>
            </div>
            <ul className="flex flex-col md:flex-row font-light text-sm md:text-base lg:text-lg gap-1 md:gap-3 mt-1 md:mt-0">
              <li>وضعیت: {translateStatus(ticketDetails.status)}</li>
              <li>
                تاریخ ارسال: {formatDateToPersian(ticketDetails.create_at)}
              </li>
              <li>شماره تیکت: {ticketId}</li>
            </ul>
            <Button
              size="sm"
              className="hidden md:flex text-accent-400 text-3xl"
            >
              <Link to="/profile/tickets">
                <IoArrowBackCircle />
              </Link>
            </Button>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col overflow-y-auto p-3 bg-accent-200 border-t-4 border-gray-500 h-[500px] md:h-[600px] lg:h-[700px]">
          <h2 className="font-semibold text-base md:text-lg lg:text-xl pt-2 pb-6">
            عنوان تیکت: {ticketDetails?.title}
          </h2>
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.message}
                senderName={message.sender_name}
                createdAt={message.created_at}
                isSupport={message.sender_name === "admin"}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <h2>هیچ پیامی ارسال نشده</h2>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center p-2 md:p-3 lg:p-4 bg-gray-100 gap-2 rounded-b-lg border-t border-gray-300">
          <input
            type="text"
            className="flex-1 p-1 md:p-2 lg:p-3 border border-gray-300 rounded-lg text-sm md:text-base lg:text-lg"
            placeholder="پیام خود را بنویسید..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 rounded-lg text-sm md:text-base lg:text-lg"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}
