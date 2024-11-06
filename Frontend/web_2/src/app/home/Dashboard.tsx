"use client";

import { useState } from "react";

import Top_Dashboard from "./Top_Dashboard";
import Menu_Dashboard from "./Menu_Dashboard";

import Ventes_dashboard from "../ventes/Ventes_dashboard";
import Chantier_Dashboard from "../chantiers/Chantier_Dashboard";

function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-full w-full">
      {/* Menu Dashboard (à gauche) */}
      <Menu_Dashboard active={active} setActive={setActive} />
      
      {/* Contenu principal (à droite) */}
      <div className="flex flex-col flex-grow h-full">
        {/* Top Dashboard */}
        <div className="h-16">
          <Top_Dashboard />
        </div>
        
        {/* Contenu dynamique */}
        <div className="flex-grow overflow-auto p-4">
          {active === "Dashboard" && <div>Dashboard</div>}
          {active === "Planing" && <div>Planing</div>}
          {active === "Articles" && <div>Articles</div>}
          {active === "Clients" && <div>Clients</div>}
          {active === "Ventes" && <Ventes_dashboard />}
          {active === "Chantiers" && <Chantier_Dashboard />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
