import { SaleDocument } from "@/@types/sales/SaleDocument.type";
import { useEffect, useState, useCallback } from "react";
import {
  getSalePaginated,
  getSalePaginated_Date,
  fetchMonthlyIncome,
} from "@/app/utils/functions/ventes.function";
import { MdOutlinePointOfSale } from "react-icons/md";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";

// Définir l'interface pour les données de revenu
interface IncomeData {
  numberPrefix: string;
  currentMonth: {
    documentCount: number;
    totalDueAmount: number;
  };
  previousMonth: {
    documentCount: number;
    totalDueAmount: number;
  };
  percentageChange: number;
}

export default function Ventes_dashboard() {
  const [sales, setSales] = useState<SaleDocument[]>([]);
  const [sales_byDate, setSales_byDate] = useState<SaleDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // États pour le revenu mensuel avec typage correct
  const [monthlyIncome, setMonthlyIncome] = useState<IncomeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // États pour le mois et l'année sélectionnés
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // Mois actuel (commence à 0 en JavaScript)
  const [selectedYear, setSelectedYear] = useState(today.getFullYear()); // Année actuelle

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
  }, [searchQuery, limit, offset]);

  // Fetch uniquement lors du changement de mois/année
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const data = await fetchMonthlyIncome(selectedMonth, selectedYear);
        setMonthlyIncome(data);
      } catch (error) {
        console.error("Error fetching monthly income:", error);
        setError("Error fetching monthly income");
      }
    };
    fetchIncomeData();
  }, [selectedMonth, selectedYear]);

  const handleScroll_date = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    },
    [limit]
  );

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

  return (
<div className="h-full w-full text-gray-500 p-4 flex gap-8 m-4">
{/* ----------------------------------------------------------------------------------------------------------- Encart Dernières ventes -------------------------------------------------------- */}
      <div
        className="your-scrollable-container w-3/10 border h-3.5/10 rounded-xl p-2 bg-white overflow-y-auto shadow-2xl"
        onScroll={handleScroll_date}
      >
        <div className="flex items-center justify-center gap-4 p-2 border-b mb-2">
          <MdOutlinePointOfSale />
          <h3 className="text-center tracking-widest italic">
            Dernières ventes
          </h3>
        </div>
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

      {/* ----------------------------------------------------------------------------------------- Encart Revenu Mensuel -------------------------------------------------------- */}
      <div className="your-scrollable-container w-3/10 border h-3.5/10 rounded-xl p-2 bg-white overflow-y-auto shadow-2xl">
      <div className="flex items-center justify-center gap-4 p-2 border-b mb-2">
          <MdOutlinePointOfSale />
          <h3 className="text-center tracking-widest italic">Revenu Mensuel</h3>
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={month + 1}>
                {new Date(0, month).toLocaleString("fr-FR", { month: "long" })}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded p-2 w-20"
          />
        </div>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div>
            {monthlyIncome.length > 0 ? (
              monthlyIncome.map((income) => {
                const currentAmount = income.currentMonth.totalDueAmount;
                const previousAmount = income.previousMonth.totalDueAmount;

                // Vérification si le montant précédent est zéro
                const percentageChange =
                  previousAmount !== 0
                    ? ((currentAmount - previousAmount) /
                        Math.abs(previousAmount)) *
                      100
                    : null; // null si pas de pourcentage de changement calculable

                const isPositiveChange =
                  (currentAmount < 0 &&
                    Math.abs(currentAmount) < Math.abs(previousAmount)) || // Amélioration pour un avoir
                  (currentAmount > 0 && currentAmount > previousAmount); // Augmentation pour une vente

                return (
                  <div
                    key={income.numberPrefix}
                    className="flex flex-col border-b p-2 gap-2"
                  >
                    <div className="flex justify-between text-black">
                      <h4
                        className={`text-sm font-bold tracking-widest ${getTextColorClass(
                          income.numberPrefix
                        )}`}
                      >
                        {income.numberPrefix}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {income.currentMonth.documentCount} documents
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-gray-700 text-sm font-bold">
                        <p>Montant mensuel:</p>
                        <p>{currentAmount.toFixed(2)} €</p>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <p>Mois précédent:</p>
                        <p>{previousAmount.toFixed(2)} €</p>
                      </div>
                    </div>
                    <div
                      className={`flex justify-between items-center text-xs ${
                        percentageChange !== null && isPositiveChange
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <div className="flex items-center gap-1 w-full justify-end">
                        {percentageChange !== null ? (
                          <>
                            {isPositiveChange ? <FaArrowUp /> : <FaArrowDown />}
                            <p>{Math.abs(percentageChange).toFixed(2)} %</p>
                          </>
                        ) : (
                          <p className="text-gray-400">N/A</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                Aucune donnée disponible pour ce mois.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
