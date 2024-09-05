import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { fetchDailyEvents, fetchWeeklyEvents, fetchMonthlyEvents } from "../../utils/function/function";
import { Event } from "../../types/events";
import PlaningCards from "./planingCards";

import "react-calendar/dist/Calendar.css";
import "./planing.css";

import BottomNav from "../../components/nav/navBar/BottomNav";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function Planing() {
  const [value, onChange] = useState<Value>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>("daily");

  const formatDate = (date: Date): string => {
    // Utilisez toLocaleDateString pour obtenir la date locale en format YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  //* ---------------------------------------------------------------------------------------------------------------------------------- UseEffect
  useEffect(() => {
    const fetchEvents = async () => {
      const selectedDate = value instanceof Array ? value[0] : value;
      if (!selectedDate) return;

      const formattedDate = formatDate(selectedDate); // Format YYYY-MM-DD

      if (category === "daily") {
        const dailyEvents = await fetchDailyEvents(formattedDate);
        setEvents(dailyEvents);
      } else if (category === "weekly") {
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Set to start of week (Sunday)
        endDate.setDate(startDate.getDate() + 6); // Set to end of week (Saturday)

        const weeklyEvents = await fetchWeeklyEvents(formatDate(startDate), formatDate(endDate));
        setEvents(weeklyEvents);
      } else if (category === "monthly") {
        const month = selectedDate.getMonth() + 1; // getMonth() is zero-based
        const year = selectedDate.getFullYear();

        const monthlyEvents = await fetchMonthlyEvents(month, year);
        setEvents(monthlyEvents);
      }
    };

    fetchEvents();
  }, [value, category]);

  //* ---------------------------------------------------------------------------------------------------------------------------------- Recherche par jour/week/..

  return (
    <div className="w-screen h-screen bg-gray-light flex flex-col justify-center items-center">
      <div className="h-5/10 w-9.5/10 flex flex-col items-center justify-evenly p-2 overflow-auto">
        <div className="w-full flex justify-center">
          <Calendar
            onChange={onChange}
            value={value}
            className="custom-calendar border w-9.5/10 border-gray-500"
          />
        </div>
        <div className="flex w-9.5/10 justify-between border rounded-lg overflow-auto shadow-lg">
          <div
            className={`border-r border-blue-400 w-1/3 text-center p-2 ${category === "daily" ? "text-white bg-blue-600 font-bold tracking-wide" : "bg-white"}`}
            onClick={() => setCategory("daily")}
          >
            Jour
          </div>
          <div
            className={`border-r border-blue-400 w-1/3 text-center p-2 ${category === "weekly" ? "text-white bg-blue-600 font-bold tracking-wide" : "bg-white"}`}
            onClick={() => setCategory("weekly")}
          >
            Semaine
          </div>
          <div
            className={`w-1/3 text-center p-2 ${category === "monthly" ? "text-white bg-blue-600 font-bold tracking-wide" : "bg-white"}`}
            onClick={() => setCategory("monthly")}
          >
            Mois
          </div>
        </div>
      </div>
      <div className="w-full h-5/10 p-2 overflow-auto items-center">
        {/* ---------------------------------------------------------------------------------------------------------------------------- Planing cards ----------------------------------------------- */}
        <div className="flex flex-col text-sm items-center justify-center pb-10">
          {events.length > 0 ? (
            events.map((event) => (
              <PlaningCards key={event.Id} event={event} />
            ))
          ) : (
            <p className="italic font-bold tracking-widest">Aucun évènement</p>
          )}
        </div>
      </div>
      < BottomNav title="Agenda" css="" />
    </div>
  );
}

export default Planing;
