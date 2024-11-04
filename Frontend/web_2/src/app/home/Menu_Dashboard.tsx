"use client";

import { BiSolidDashboard } from "react-icons/bi";
import { FaCalendarAlt, FaFileAlt, FaUsers, FaBox } from "react-icons/fa";
import { useDashboardContext } from "../context/DashboardContext";

function Menu_Dashboard({active, setActive}: {active: string, setActive: (name: string) => void}) {

    const { setContent } = useDashboardContext();

    const tabs = [
        { name: "Dashboard", icon: <BiSolidDashboard /> },
        { name: "Planing", icon: <FaCalendarAlt /> },
        { name: "Articles", icon: <FaBox /> },
        { name: "Clients", icon: <FaUsers /> },
        { name: "Ventes", icon: <FaFileAlt /> },
      ];

  return (
<div className=" text-gray-500 text-lg border-r bg-white tracking-wide flex-col items-center justify-start w-64 p-1">
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
              }}              className={`cursor-pointer flex items-center gap-3 w-4/5 py-2 px-4 ${
                active === tab.name
                  ? "text-gray-900 font-bold bg-gray-100 rounded-md"
                  : "text-gray-500"
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.name}</span>
            </div>
          ))}
        </div>
      </div>  )
}

export default Menu_Dashboard