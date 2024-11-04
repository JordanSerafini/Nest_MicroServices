import { SaleDocument } from "@/@types/sales/SaleDocument.type";
import { useEffect, useState, useCallback } from "react";
import {
  getSalePaginated,
  getSalePaginated_Date,
  getSaleByCategory,
} from "@/app/utils/functions/ventes.function";
import { FaEuroSign } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";

import Sales_Graph from "./Sales_Graph";
import Monthly_Income from "./Monthly_Income";


export default function Ventes_dashboard() {
  const [sales, setSales] = useState<SaleDocument[]>([]);
  const [sales_byDate, setSales_byDate] = useState<SaleDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [category_selected_forDate, setCategory_selected_forDate] =
    useState("");

  //* ------------------------------------------------------------------------------------------------- UseEffects --------------------------------------
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSalePaginated(searchQuery, limit, offset);
        const combinedSales = [...sales, ...data.saleDocuments];
        const uniqueSales = combinedSales.filter(
          (sale, index, self) =>
            index === self.findIndex((s) => s.Id === sale.Id)
        );
        const sortedSales = uniqueSales.sort(
          (a, b) =>
            new Date(b.DocumentDate).getTime() -
            new Date(a.DocumentDate).getTime()
        );
        setSales(sortedSales);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    const fetchSales_byDate = async () => {
      if (isFetching) return;
      setIsFetching(true);

      try {
        const data = await getSalePaginated_Date(searchQuery, limit, offset);
        const combinedSales = [...sales_byDate, ...data.saleDocuments];
        const uniqueSales = combinedSales.filter(
          (sale, index, self) =>
            index === self.findIndex((s) => s.Id === sale.Id)
        );
        const sortedSales = uniqueSales.sort(
          (a, b) =>
            new Date(b.DocumentDate).getTime() -
            new Date(a.DocumentDate).getTime()
        );
        setSales_byDate(sortedSales);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching sales by date:", error);
        setIsFetching(false);
      }
    };

    fetchSales_byDate();
    fetchSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, limit, offset]);



  const handleScroll_date = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    },
    [limit]
  );

  //* ------------------------------------------------------------------------------------------------- Functions --------------------------------------

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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


  const handleCategorySearch = async (category: string) => {
    try {
      setOffset(0);
      setSales([]);
      setSales_byDate([]);
      const data = await getSaleByCategory(category, limit, offset);
      const combinedSales = [...sales, ...data.saleDocuments];
      const uniqueSales = combinedSales.filter(
        (sale, index, self) => index === self.findIndex((s) => s.Id === sale.Id)
      );
      const sortedSales = uniqueSales.sort(
        (a, b) =>
          new Date(b.DocumentDate).getTime() -
          new Date(a.DocumentDate).getTime()
      );
      setSales_byDate(sortedSales);
    } catch (error) {
      console.error("Error fetching sales by category:", error);
    }
  };

  const handleSelectCategorySearch = (event) => {
    const newValue = event.target.value;
    setCategory_selected_forDate(newValue);
    handleCategorySearch(newValue);
  };

  
  //* ------------------------------------------------------------------------------------------------- Return --------------------------------------
  return (
    <div className="h-full w-full text-gray-500 p-4 flex-col gap-8 ">
      <div className="flex h-5/10 w-full gap-8 p-2">
        {/* ----------------------------------------------------------------------------------------------------------- Encart Dernières ventes -------------------------------------------------------- */}
        <div className="w-3.5/10 border h-9.5/10 rounded-xl p-2 bg-white shadow-2xl">
          {/* En-tête fixe */}
          <div className="flex items-center justify-center gap-4 p-2 border-b mb-2">
            <GrDocumentVerified />
            <h3 className="text-center tracking-widest italic">
              Dernières ventes
            </h3>
            <div className="flex justify-center text-xs">
              <select
                className="border p-2 rounded-lg shadow-sm bg-white"
                value={category_selected_forDate}
                onChange={handleSelectCategorySearch}
              >
                <option value="" disabled>
                  Sélectionner
                </option>
                <option value="BR">BR</option>
                <option value="FC">FC</option>
                <option value="AD">AD</option>
                <option value="BL">BL</option>
                <option value="FA">FA</option>
                <option value="DEX">DEX</option>
                <option value="FD">FD</option>
                <option value="CC">CC</option>
                <option value="CM">CM</option>
                <option value="AV">AV</option>
                <option value="DE">DE</option>
              </select>
            </div>
          </div>

          {/* Liste des ventes défilable */}
          <div
            className="overflow-y-auto your-scrollable-container"
            style={{ maxHeight: "calc(100% - 4rem)" }}
            onScroll={handleScroll_date}
          >
            {sales_byDate.map((sale: SaleDocument) => (
              <div key={sale.Id} className="flex flex-col border-b p-2 gap-2">
                <div className="flex justify-between text-black">
                  <div className="flex gap-1">
                    <p
                      className={`text-sm font-bold tracking-widest ${getTextColorClass(
                        sale.NumberPrefix
                      )}`}
                    >
                      {sale.NumberPrefix}
                    </p>
                    <p className="text-sm tracking-wide">{sale.NumberSuffix}</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {formatDate(sale.DocumentDate)}
                  </p>
                </div>
                <div className="flex justify-between text-xs">
                  <p>{sale.CustomerId}</p>
                  <div className="flex items-center gap-1">
                    <FaEuroSign className="text-black text-sm" />
                    <p>{sale.TotalDueAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------------------------------------------------------- Encart Revenu Mensuel -------------------------------------------------------- */}
        <Monthly_Income/>
        {/* -------------------------------------------------------------------------------------------------- Graph -------------------------------------------------------- */}
        <Sales_Graph />
      </div>
    </div>
  );
}
