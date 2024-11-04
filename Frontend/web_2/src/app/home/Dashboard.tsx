"use client";

import { useState } from "react";

import Top_Dashboard from "./Top_Dashboard";
import Ventes_dashboard from "../ventes/Ventes_dashboard";
import Menu_Dashboard from "./Menu_Dashboard";

function Dashboard() {
  const [active, setActive] = useState("Dashboard");



  return (
    <div className="w-screen h-screen flex ">
      {/* --------------------------------------------------------------  Menu Dashboard -------------------------------------------------------------------------------------- */}
      < Menu_Dashboard active={active} setActive={setActive} />
      {/* --------------------------------------------------------------  Top Dashboard --------------------------------------------------------------------------------------- */}
      <div className="w-full flex-col">
      <div className="h-16">
        <Top_Dashboard />
      </div>
      {/* --------------------------------------------------------------  Content Dashboard ----------------------------------------------------------------------------------- */}
      <div className="w-full h-full">
        {active === "Dashboard" && <div>Dashboard</div>}
        {active === "Planing" && <div>Planing</div>}
        {active === "Articles" && <div>Articles</div>}
        {active === "Clients" && <div>Clients</div>}
        {active === "Ventes" && < Ventes_dashboard />}
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
