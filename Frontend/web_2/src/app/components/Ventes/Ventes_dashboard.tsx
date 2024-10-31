import { SaleDocument } from "@/@types/sales/SaleDocument.type";
import {
  getSalePaginated,
  getSalePaginated_Date,
} from "@/app/utils/functions/ventes.function";
import { useEffect, useState } from "react";

export default function Ventes_dashboard() {
  const [sales, setSales] = useState([]);
  const [sales_byDate, setSales_byDate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      console.log("Fetching sales...");
      try {
        const data = await getSalePaginated(searchQuery, limit, offset);
        setSales(data.saleDocuments);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    const fetchSales_byDate = async () => {
      console.log("Fetching sales by date...");
      try {
        const data = await getSalePaginated_Date(searchQuery, limit, offset);
        setSales_byDate(data.saleDocuments);
      } catch (error) {
        console.error("Error fetching sales by date:", error);
      }
    };

    fetchSales_byDate();
    fetchSales();
  }, [searchQuery, limit, offset]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="h-full w-full text-gray-500 p-4">
      <div className="w-3/10 border h-3.5/10 rounded-xl p-2 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <h3 className="text-center tracking-widest italic border-b p-2">
          Dernières ventes
        </h3>
        {sales_byDate.map((sale: SaleDocument) => (
          <div key={sale.Id} className="flex justify-between border-b p-2">
            <div>{formatDate(sale.DocumentDate)}</div>
            <div>{sale.CustomerId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
