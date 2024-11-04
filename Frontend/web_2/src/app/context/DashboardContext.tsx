// DashboardContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

interface DashboardContextProps {
  dashboardSearchQuery: string;
  setDashboardSearchQuery: (query: string) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState("");

  return (
    <DashboardContext.Provider value={{ dashboardSearchQuery, setDashboardSearchQuery }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};
