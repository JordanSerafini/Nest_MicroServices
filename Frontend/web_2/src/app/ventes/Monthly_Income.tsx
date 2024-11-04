"use client";

import { useEffect, useState } from "react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { fetchMonthlyIncome } from "@/app/utils/functions/ventes.function";

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

function Monthly_Income() {
    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [monthlyIncome, setMonthlyIncome] = useState<IncomeData[]>([]);
    const [error, setError] = useState("");


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

  return (
    <div className="w-3/10 border h-9.5/10 rounded-xl p-2 bg-white shadow-2xl">
      {/* En-tête fixe */}
      <div className="flex items-center justify-center gap-4 p-2 border-b">
        <MdOutlinePointOfSale />
        <h3 className="text-center tracking-widest italic">Revenu Mensuel</h3>
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

export default Monthly_Income;
