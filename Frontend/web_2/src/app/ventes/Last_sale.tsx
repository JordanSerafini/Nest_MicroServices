"use client";

import { useDashboardContext } from "@/app/context/DashboardContext";
import { SaleDocument } from "@/@types/sales/SaleDocument.type";
import { useEffect, useState, useCallback } from "react";
import {
  getSalePaginated_Date,
  getSaleByCategory,
} from "@/app/utils/functions/ventes.function";

import { FaEuroSign } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";

function Last_sale() {
  const { dashboardSearchQuery: searchQuery, setContent } = useDashboardContext();
  const [sales_byDate, setSales_byDate] = useState<SaleDocument[]>([]);
  const [ limit ] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [category_selected_forDate, setCategory_selected_forDate] = useState("");
  const [hasMore, setHasMore] = useState(true);
  //* ------------------------------------------------------------------------------------------------- UseEffects --------------------------------------
  useEffect(() => {
    const fetchSalesData = async () => {
      if (isFetching || searchQuery === undefined || !hasMore) return;
      setIsFetching(true);

      try {
        let data;
        if (category_selected_forDate) {
          data = await getSaleByCategory(category_selected_forDate, limit, offset);
        } else {
          data = await getSalePaginated_Date(searchQuery || "", limit, offset);
        }

        if (data.saleDocuments.length < limit) {
          setHasMore(false);
        }

        const combinedSales = [...sales_byDate, ...data.saleDocuments];
        const uniqueSales = combinedSales.filter(
          (sale, index, self) => index === self.findIndex((s) => s.Id === sale.Id)
        );

        setSales_byDate(uniqueSales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSalesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, limit, offset, category_selected_forDate]);



  //* ------------------------------------------------------------------------------------------------- HandleScroll --------------------------------
  const handleScroll_date = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !isFetching) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    },
    [limit, hasMore, isFetching]
  );

  //* ------------------------------------------------------------------------------------------------- Functions --------------------------------------
  const handleSelectCategorySearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setCategory_selected_forDate(newValue);
    setOffset(0);
    setSales_byDate([]);
    setHasMore(true); 
  };

  function getTextColorClass(prefix: string): string {
    switch (prefix) {
      case "BR":
        return "text-red-800";
      case "FC":
        return "text-blue-800";
      case "AD":
        return "text-green-800";
      case "BL":
        return "text-yellow-800";
      case "FA":
        return "text-purple-800";
      case "DEX":
        return "text-pink-800";
      case "FD":
        return "text-indigo-800";
      case "CC":
        return "text-gray-800";
      case "CM":
        return "text-teal-800";
      case "AV":
        return "text-orange-800";
      case "DE":
        return "text-cyan-800";
      default:
        return "text-black";
    }
  }

  return (
    <div className="w-3.5/10 border h-9.5/10 rounded-xl p-2 bg-white shadow-2xl">
      {/* -------------------------------------------------------- En-tête fixe */}
      <div className="flex items-center justify-center gap-4 p-2 border-b mb-2">
        <GrDocumentVerified />
        <h3 className="text-center tracking-widest italic">
          Dernières ventes
        </h3>
        <div className="flex justify-center text-xs">
          <select
            className="border p-2 rounded-lg shadow-sm bg-white focus:outline-blue-800"
            value={category_selected_forDate}
            onChange={handleSelectCategorySearch}
          >
            <option value="">Toutes les catégories</option>
            <option value="BR">BR</option>
            <option value="FC">FC</option>
            <option value="AD">AD</option>
            <option value="BL">BL</option>
            <option value="FA">FA</option>
            <option value="FD">FD</option>
            <option value="CC">CC</option>
            <option value="CM">CM</option>
            <option value="AV">AV</option>
            <option value="DE">DE</option>
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------- Liste des ventes défilable */}
      <div
        className="overflow-y-auto your-scrollable-container"
        style={{ maxHeight: "calc(100% - 4rem)" }}
        onScroll={handleScroll_date}
      >
        {sales_byDate.map((sale: SaleDocument) => (
          <div key={sale.Id} className="flex flex-col border-b p-2 gap-2 cursor-pointer" onClick={() => setContent(`detail-${sale.Id}`)}>
            <div className="flex justify-between text-black ">
              <div className="flex gap-2">
              <p className={`text-sm font-bold tracking-widest ${getTextColorClass(sale.NumberPrefix)}`}>
              {sale.NumberPrefix}
                </p>
                <p className="text-sm tracking-wide">{sale.NumberSuffix}</p>
              </div>
              <p className="text-gray-500 text-sm">
                {new Date(sale.DocumentDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex justify-between text-xs">
              <p>{sale.CustomerId}</p>
              <div className="flex items-center gap-1">
                <FaEuroSign className="text-black text-sm" />
                <p className="font-bold">{sale.TotalDueAmount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Last_sale;

