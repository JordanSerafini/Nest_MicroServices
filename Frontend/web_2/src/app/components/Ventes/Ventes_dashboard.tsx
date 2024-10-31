import { SaleDocument } from "@/@types/sales/SaleDocument.type";
import { useEffect, useState, useCallback } from "react";
import {
  getSalePaginated,
  getSalePaginated_Date,
  fetchMonthlyIncome,
} from "@/app/utils/functions/ventes.function";
import { MdOutlinePointOfSale } from "react-icons/md";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { GrDocumentVerified } from "react-icons/gr";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

interface IncomeDataGraph {
  numberPrefix: string;
  month: number;
  year: number;
  totalDueAmount: number;
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
  const [graphIncome, setGraphIncome] = useState<IncomeDataGraph[]>([]);

  const [error, setError] = useState<string | null>(null);

  // États pour le mois et l'année sélectionnés
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

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

  function getBackgroundColorClass(prefix: string): string {
    switch (prefix) {
      case "BR":
        return "bg-red-800";
      case "FC":
        return "bg-blue-800";
      case "AD":
        return "bg-green-800";
      case "BL":
        return "bg-yellow-800";
      case "FA":
        return "bg-purple-800";
      case "DEX":
        return "bg-pink-800";
      case "FD":
        return "bg-indigo-800";
      case "CC":
        return "bg-gray-800";
      case "CM":
        return "bg-teal-800";
      case "AV":
        return "bg-orange-800";
      case "DE":
        return "bg-cyan-800";
      default:
        return "bg-black";
    }
  }

  //* ------------------------------------------------------------------------------------------------- Charts --------------------------------------
const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (5 - i));
  return { month: date.getMonth() + 1, year: date.getFullYear() };
});

useEffect(() => {
  const fetchGraphIncomeData = async () => {
      try {
          const promises = lastSixMonths.map(({ month, year }) =>
              fetchMonthlyIncome(month, year)
          );

          const incomeDataByMonth = await Promise.all(promises);
          const flattenedData = incomeDataByMonth.flat();
          setGraphIncome(flattenedData);

      } catch (error) {
          console.error("Error fetching graph income data:", error);
          setError("Error fetching graph income data");
      }
  };

  fetchGraphIncomeData();
}, [selectedYear]);

const graphData = {
  labels: lastSixMonths.map(({ month }) => `Mois ${month}`),
  datasets: [...new Set(graphIncome.map(data => data.numberPrefix))].map((prefix) => {
      const prefixData = graphIncome.filter((income) => income.numberPrefix === prefix);

      const totalAmounts = lastSixMonths.map(({ month, year }) => {
          const incomeForMonth = prefixData.find(income => income.month === month && income.year === year);
          return incomeForMonth ? incomeForMonth.totalDueAmount : null;
      });

      return {
          label: prefix,
          data: totalAmounts,
          borderColor: getBorderColor(prefix),
          backgroundColor: getBackgroundColorClass(prefix),
          fill: false,
      };
  }),
};

const options = {
  responsive: true,
  plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: `Évolution du revenu mensuel sur les 6 derniers mois (${selectedYear})` },
  },
  scales: {
      y: {
          beginAtZero: false,
          suggestedMin: -30000,
          suggestedMax: 20000,
      },
  },
};

  function getBorderColor(prefix: string): string {
    switch (prefix) {
      case "BR":
        return "rgba(255, 99, 132, 1)";
      case "FC":
        return "rgba(54, 162, 235, 1)";
      case "AD":
        return "rgba(75, 192, 192, 1)";
      default:
        return "rgba(0, 0, 0, 1)";
    }
  }



  return (
    <div className="h-full w-full text-gray-500 p-4 flex-col gap-8 m-4">
      <div className="flex h-5/10 w-full gap-8">
        {/* ----------------------------------------------------------------------------------------------------------- Encart Dernières ventes -------------------------------------------------------- */}
        <div className="w-3/10 border h-9.5/10 rounded-xl p-2 bg-white shadow-2xl">
          {/* En-tête fixe */}
          <div className="flex items-center justify-center gap-4 p-2 border-b mb-2">
            <GrDocumentVerified />
            <h3 className="text-center tracking-widest italic">
              Dernières ventes
            </h3>
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
        <div className="w-3/10 border h-9.5/10 rounded-xl p-2 bg-white shadow-2xl">
          {/* En-tête fixe */}
          <div className="flex items-center justify-center gap-4 p-2 border-b">
            <MdOutlinePointOfSale />
            <h3 className="text-center tracking-widest italic">
              Revenu Mensuel
            </h3>
          </div>

          {/* Sélecteurs de mois et d'année (fixe) */}
          <div className="flex justify-center gap-4 mb-2 items-center border-b py-3">
            <BsCalendarDate className="text-2xl" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded h-6 text-center tracking-widest focus:outline-none"
            >
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {new Date(0, month).toLocaleString("fr-FR", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border text-center rounded h-6 w-20 focus:outline-none"
            />
          </div>

          {/* Liste des revenus défilable */}
          <div
            className="overflow-y-auto your-scrollable-container"
            style={{ maxHeight: "calc(100% - 8rem)" }}
          >
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div>
                {monthlyIncome.length > 0 ? (
                  monthlyIncome.map((income) => {
                    const currentAmount = income.currentMonth.totalDueAmount;
                    const previousAmount = income.previousMonth.totalDueAmount;

                    const percentageChange =
                      previousAmount !== 0
                        ? ((currentAmount - previousAmount) /
                            Math.abs(previousAmount)) *
                          100
                        : null;

                    const isPositiveChange =
                      (currentAmount < 0 &&
                        Math.abs(currentAmount) < Math.abs(previousAmount)) ||
                      (currentAmount > 0 && currentAmount > previousAmount);

                    return (
                      <div
                        key={income.numberPrefix}
                        className="flex flex-col border-b p-2 gap-2"
                      >
                        <div className="flex justify-between text-black">
                          <h4 className="text-sm font-bold tracking-widest flex items-center gap-2">
                            <span
                              className={`text-white ${getBackgroundColorClass(
                                income.numberPrefix
                              )} rounded-full p-1`}
                            >
                              {income.numberPrefix}
                            </span>
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
                          <div className="flex justify-between text-xs text-gray-400 italic">
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
                                {isPositiveChange ? (
                                  <FaArrowUp />
                                ) : (
                                  <FaArrowDown />
                                )}
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
      </div>
      {/* -------------------------------------------------------------------------------------------------- Graph -------------------------------------------------------- */}
      <div className="flex justify-between w-full h-5/10 p-2">
        <div className="w-5/10"></div>
        <div className="w-4/10 border h-8/10 rounded-xl p-8 bg-white shadow-2xl">
          <h3 className="text-center tracking-widest italic">
            Graphique des Revenus Mensuels
          </h3>
          <Line data={graphData} options={options} />
        </div>
      </div>
    </div>
  );
}
