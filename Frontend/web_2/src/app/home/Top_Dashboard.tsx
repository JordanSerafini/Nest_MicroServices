import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from 'js-cookie';

import { LuSearch } from "react-icons/lu";
import { logout } from "../utils/functions/auth.function";
import { useDashboardContext } from "../context/DashboardContext";

function Top_Dashboard() {
  const { dashboardSearchQuery, setDashboardSearchQuery } = useDashboardContext();
  const [user, setUser] = useState({ nom: "", prenom: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser);
        setUser({
          nom: userObject.nom || "Nom",
          prenom: userObject.prenom || "Prénom",
          email: userObject.email || "email@example.com",
        });
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
    Cookies.remove("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardSearchQuery(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (dashboardSearchQuery) {
        console.log("Recherche en cours pour :", dashboardSearchQuery);
        
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [dashboardSearchQuery]);

  return (
    <div className="w-full h-16 bg-white text-black flex justify-between items-center px-20 shadow-xl border-b border-gray-300">
      <div className="h-fit flex items-center justify-evenly gap-2 p-1 border w-64 rounded-lg">
        <LuSearch className="text-gray-700 text-xl" />
        <input
          type="text"
          className="border-l border-gray-300 pl-3 focus:outline-none"
          placeholder="recherche"
          value={dashboardSearchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Image
          src="/pp.jpg"
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full h-auto"
          onClick={handleLogout}
        />
        <div className="text-gray-800">
          <p className='font-bold tracking-wide'>{user.nom} {user.prenom}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Top_Dashboard;
