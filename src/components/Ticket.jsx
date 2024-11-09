import React from "react";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

function Ticket({ ticketId, title, date, status }) {
  return (
    <div className="bg-accent-600 rounded-lg text-white w-full ">
      <div className="w-full overflow-x-auto">
        <div className="flex flex-row justify-around min-w-[700px] px-5 py-2">
          <div className="flex flex-col items-center py-2 gap-8 min-w-[120px]">
            <h2 className="text-sm font-bold">شماره تیکت</h2>
            <span>{ticketId}</span>
          </div>
          <div className="flex flex-col items-center py-2 gap-8 min-w-[120px]">
            <h2 className="text-sm font-bold">عنوان تیکت</h2>
            <span>{title}</span>
          </div>
          <div className="flex flex-col items-center py-2 gap-8 min-w-[120px]">
            <h2 className="text-sm font-bold">تاریخ</h2>
            <span>{formatDateToPersian(date)}</span>
          </div>
          <div className="flex flex-col items-center py-2 gap-8 min-w-[120px]">
            <h2 className="text-sm font-bold">وضعیت</h2>
            <span>{translateStatus(status)}</span>
          </div>
          <div className="flex flex-col items-center py-2 gap-8 min-w-[120px]">
            <h2 className="text-sm font-bold">مشاهده</h2>
            <button>
              <Link to={`/profile/tickets/ticket-chat/${ticketId}`}>
                <FaEye className="w-5 h-5" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
