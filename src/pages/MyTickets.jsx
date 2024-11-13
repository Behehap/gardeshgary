import React, { useState, useEffect } from "react";
import Ticket from "@/components/Ticket";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import RingsLoader from "../components/Loader"; // Import the loader

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/tickets", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        setTickets(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="w-full bg-accent-200 rounded-lg min-h-[500px] relative">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-md">
          <RingsLoader visible={true} />
        </div>
      )}

      <div
        className={`flex flex-col border-b border-black px-4 py-5 ${
          loading ? "blur-sm" : ""
        }`}
      >
        <h1 className="font-bold text-xl mb-5">تیکت های من</h1>
        <div className="flex flex-col gap-3 lg:flex-row">
          <p className="font-semibold text-xs">
            تیکت های ارسالی شما در اسرع وقت پاسخ داده خواهد شد...
          </p>
          <div
            dir="ltr"
            className="flex flex-row mt-4 justify-around w-full gap-5"
          >
            <div className="flex flex-row items-center gap-3">
              <Switch
                thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4 md:translate-x-0 lg:data-[state=checked]:translate-x-8 lg:h-5 lg:w-5"
                className="h-5 w-9 lg:h-6 lg:w-14"
              />
              <label className="text-black text-sm">فقط پاسخ داده شده</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                thumbClassName="h-4 w-4 translate-x-0 data-[state=checked]:translate-x-4 md:translate-x-0 lg:data-[state=checked]:translate-x-8 lg:h-5 lg:w-5"
                className="h-5 w-9 lg:h-6 lg:w-14"
              />
              <label className="text-black text-sm">فقط پاسخ داده نشده</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end px-4 pt-4">
        <Button className="bg-secondary-400">
          <Link
            to="/profile/tickets/create-ticket"
            className="flex items-center space-x-2 text-black"
          >
            <CiCirclePlus className="w-8 h-8 pl-2" /> تیکت جدید
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-5 p-5 my-2">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticketId={ticket.id}
              title={ticket.title}
              date={ticket.created_at}
              status={ticket.status}
            />
          ))
        ) : (
          <div className="flex justify-center w-full">
            <p>شما هیچ تیکتی ندارید</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTickets;
