import { useEffect, useState } from "react";
import { Event } from "../../types/events";
import Icon from "../../components/SVG/Icon";
import { fetchEventTypes } from "../../utils/function/function";
import { EventType } from "../../types/events";

interface PlaningCardsProps {
  event: Event;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};


function PlaningCards({ event }: PlaningCardsProps) {
  const [detailsCard, setDetailsCard] = useState(false);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    fetchEventTypes().then((eventTypes) => {
      setEventTypes(eventTypes);
    });
  }, []);


  return (
    <div className="w-full h-full mb-4 p-4 border-b border-gray-300 flex flex-col gap-3 font-merriweather text-xs bg-white rounded-2xl shadow-md">
      <div className="w-full h-full flex justify-between gap-2">
        <div className="">
          <p className="italic font-bold text-gray-800">{event.Caption}</p>
          {event.EndDateTime !== event.StartDateTime ? (
            <>
              <p>Date de début : {formatDate(event.StartDateTime)}</p>
              <p>Fin programmée : {formatDate(event.EndDateTime)}</p>
            </>
          ) : //<p>{formatDate(event.StartDateTime)}</p>
          null}
        </div>

        <p className="bg-green-700 rounded-full p-2 items-center justify-center flex text-white w-3/10 overflow-auto">
          {event.xx_Services}
        </p>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------ Detail Btn ----------------------------------------------- */}
      <div className="w-full flex justify-between ">
        <div className="text-blue-600">{event.CustomerId}</div>
        <button
          onClick={() => setDetailsCard(!detailsCard)}
          className="text-sm text-blue-500"
        >
          {detailsCard ? (
            <Icon type="close" theme="" className="text-red-600 " />
          ) : (
            <Icon type="Arrow_Drop_Down" theme="" className="text-blue-700 " />
          )}
        </button>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------ Detail Expand ----------------------------------------------- */}
      {detailsCard && (
        <div className="flex flex-col gap-2 border-t border-gray-700 pt-2 w-full">
          <p>{event.NotesClear}</p>
          <p className="text-green-500 tracking-widest self-end">
            {event.sysCreatedUser}
          </p>
        </div>
      )}
    </div>
  );
}

export default PlaningCards;
