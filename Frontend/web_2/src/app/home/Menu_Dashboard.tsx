"use client";

import { BiSolidDashboard } from "react-icons/bi";
import { FaCalendarAlt, FaFileAlt, FaUsers, FaBox } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { useDashboardContext } from "../context/DashboardContext";

function Menu_Dashboard({
  active,
  setActive,
}: {
  active: string;
  setActive: (name: string) => void;
}) {
  const { setContent } = useDashboardContext();

  const tabs = [
    { name: "Dashboard", icon: <BiSolidDashboard /> },
    { name: "Planing", icon: <FaCalendarAlt /> },
    { name: "Chantiers", icon: <MdConstruction /> },
    { name: "Articles", icon: <FaBox /> },
    { name: "Clients", icon: <FaUsers /> },
    { name: "Ventes", icon: <FaFileAlt /> },
  ];

  return (
    <div className="text-gray-500 text-lg border-r bg-white tracking-wide flex flex-col items-center justify-start h-full w-64 p-1">
      <h3 className="text-black border-b border-black font-bold text-xl p-4 mb-20">
        Solution Logique
      </h3>
      <div className="flex flex-col items-center justify-start w-full gap-4">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => {
              setActive(tab.name);
              setContent("");
            }}
            className={`cursor-pointer flex items-center gap-3 w-4/5 py-2 px-4 rounded-md transition-colors duration-200 ${
              active === tab.name
                ? "text-gray-900 font-bold bg-gray-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu_Dashboard;
