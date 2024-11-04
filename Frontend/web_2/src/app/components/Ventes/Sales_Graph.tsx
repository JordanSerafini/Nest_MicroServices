import { useEffect, useState } from "react";
import { fetchMonthlyIncome } from "@/app/utils/functions/ventes.function";
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

  interface IncomeDataGraph {
    numberPrefix: string;
    month: number;
    year: number;
    totalDueAmount: number;
  }

function Sales_Graph() {
    const [graphIncome, setGraphIncome] = useState<IncomeDataGraph[]>([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    
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
      }
    };

    fetchGraphIncomeData();
  }, [selectedYear, lastSixMonths]);

  const graphData = {
    labels: lastSixMonths.map(({ month }) => `Mois ${month}`),
    datasets: [...new Set(graphIncome.map((data) => data.numberPrefix))].map(
      (prefix) => {
        const prefixData = graphIncome.filter(
          (income) => income.numberPrefix === prefix
        );

        const totalAmounts = lastSixMonths.map(({ month, year }) => {
          const incomeForMonth = prefixData.find(
            (income) => income.month === month && income.year === year
          );
          return incomeForMonth ? incomeForMonth.totalDueAmount : null;
        });

        return {
          label: prefix,
          data: totalAmounts,
          borderColor: getBorderColor(prefix),
          backgroundColor: getBackgroundColorClass(prefix),
          fill: false,
        };
      }
    ),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Évolution du revenu mensuel sur les 6 derniers mois (${selectedYear})`,
      },
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

    <div className="w-3.5/10 border h-9.5/10 rounded-xl p-8 bg-white shadow-2xl">
    <h3 className="text-center tracking-widest italic">
      Graphique des Revenus Mensuels
    </h3>
    <Line data={graphData} options={options} />
  </div>  )
}

export default Sales_Graph