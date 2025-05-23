import React, { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";

const TickerMessage = () => {
  const [messages, setMessages] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const categoryName = "Ticker Message";
        const data = await get(`/public/transaction/bycategoryname?categoryName=${categoryName}`);
        console.log("Fetched ticker messages:", data);
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchTransaction();
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-white to-blue-100 py-4 border-b border-blue-300 shadow-md z-10 group">
      <div className="flex animate-marquee space-x-16 w-max px-4 group-hover:[animation-play-state:paused]">
        {[...messages, ...messages].map((msg, index) => (
          <div
            key={index}
            className="flex items-center gap-4 min-w-fit bg-white rounded-lg px-4 py-2 shadow-md border border-blue-200 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            {msg.File_Name !== "NA" ? (
              <a
                href={msg.File_Name}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <img
                  src={`http://127.0.0.1:5500/backend${msg.Folder_Path}`}
                  alt={msg.Upload_Title}
                  className="w-12 h-12 object-cover rounded-full border-2 border-blue-400 shadow-sm hover:scale-105 transition-transform"
                />
              </a>
            ) : (
              <img
                src={`http://127.0.0.1:5500/backend${msg.Folder_Path}`}
                alt={msg.Upload_Title}
                className="w-12 h-12 object-cover rounded-full border-2 border-blue-400 shadow-sm"
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-blue-700">{msg.Upload_Title}</h3>
              <p className="text-sm text-gray-700 line-clamp-2">{msg.Upload_Description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default TickerMessage;
