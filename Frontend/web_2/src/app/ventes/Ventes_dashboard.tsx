// Ventes_dashboard.tsx
"use client";

import { useDashboardContext } from "../context/DashboardContext";
import Last_sale from "./Last_sale";
import Monthly_Income from "./Monthly_Income";
// import Sales_Graph from "./Sales_Graph";
import Sale_Detail from "./Sale_Detail";

export default function Ventes_dashboard() {
  const { content } = useDashboardContext();

  return (
    <div className="h-full w-full text-gray-500 p-4 flex-col gap-8">
      {content === "" && (
        <div className="flex h-5/10 w-full gap-8 p-2">
          <Last_sale />
          <Monthly_Income />
        </div>
      )}
      
      {content.startsWith("detail-") && (
        <Sale_Detail saleId={content.replace("detail-", "")} />
      )}
    </div>
  );
}
