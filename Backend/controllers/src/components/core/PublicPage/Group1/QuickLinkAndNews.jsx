import React, { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";

const QuickLinksAndNews = () => {
  const { get } = useApi();
  const [quickLinks, setQuickLinks] = useState([]);
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quickLinkData = await get(`/public/transaction/bycategoryname?categoryName=Quick Link`);
        const newsData = await get(`/public/transaction/bycategoryname?categoryName=Carousel`);
        setQuickLinks(quickLinkData);
        setNewsItems(newsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Quick Links Section */}
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
      {/* Inline scrollbar style */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(100, 116, 139, 0.4);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>

         <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Links</h2>
      <div className="flex flex-col gap-3 max-h-72 overflow-y-auto custom-scrollbar">
    <div className=" flex">
      {quickLinks.map((link, index) => (
          <div
            key={index}
            className="flex  flex-row  items-center gap-3 bg-slate-50 hover:bg-slate-100 p-2 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div>
                <img
              src={`http://127.0.0.1:5500/backend${link.Folder_Path}`}
              alt={link.Upload_Title}
              className="w-30 h-16 rounded-md object-contain "
            />
            <a
              href={link.File_Name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium"
            >
              {link.Upload_Title}
            </a>
            </div>
          </div>
        ))}
    </div>
     
      </div>
    </div>

      {/* News Section */}
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
        <h2 className="text-xl font-bold  mb-4">Letest from Belagavi</h2>
        <ul className="space-y-3">
          {newsItems.map((news, index) => (
            <li
              key={index}
              className="relative rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`http://127.0.0.1:5500/backend${news.Folder_Path}`}
                alt={news.Upload_Title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h3 className="text-white font-semibold">{news.Upload_Title}</h3>
                <p className="text-sm text-gray-200">{news.Upload_Description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinksAndNews;


// Poornata : https://www.portal.poornata.com/
// Ekayaan :https://onehindalco.adityabirla.com/
// HSD : https://hsd.adityabirla.com/
// Know Your IT : https://adityabirla.sharepoint.com/:f:/r/sites/HindalcoBelagavi/BLG_IT/KNOW%20YOUR%20IT?csf=1&web=1&e=fiwAKf
// e-Permit : http://10.36.121.75/PTW/
// ABG Sustainability :https://www.abgsustainability.com/
// Travel Requisition System :https://hil.moveinsync.com/BLG/
// em-Signer -https://esign.adityabirla.com/Areas/AD/Login
// HIIMS : https://hilims.adityabirla.com/
// Payroll : https://hindalco.peoplestrong.com/
// ABG travel :https://www.abgtravelportal.com/
// MyGate :https://dashboard.mygate.com/login
// Smart Face :http://10.36.20.4/SmartFace/Home/Login
// Ekayaan-Prep :https://ekaayanebsprep.adityabirla.com
