// app/providers.tsx
"use client";

import { DashboardProvider } from "./DashboardContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
