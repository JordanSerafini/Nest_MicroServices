import { ConstructionSite } from "@/@types/chantiers/chantier.type";

import { IoIosContact } from "react-icons/io";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

function Chantier_Card({ chantier }: { chantier: ConstructionSite }) {
  const formattedStartDate = chantier.StartDate
    ? new Date(chantier.StartDate).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const formattedEndDate = chantier.EndDate
    ? new Date(chantier.EndDate).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-white border p-3 rounded-xl w-full min-h-[22vh] flex flex-col items-center justify-start gap-4 overflow-auto shadow-xl">
      <div className="flex w-full justify-between font-bold text-blue-900">
        <p className="italic">{chantier.Caption}</p>
        <p className="">{chantier.DealId}</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="">
          <p>{chantier.CustomerId}</p>
          <p>{chantier.ConstructionSiteAddress_City}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="">
            <span className=""> Début : </span>
            {formattedStartDate}
          </p>
          <p className="">Fin : {formattedEndDate}</p>
        </div>
      </div>
      <div className="flex w-full justify-between pt-2">
        <div className="flex items-start gap-2">
          <IoIosContact className="text-xl text-green-800" />
          <p className="">
            {chantier.customer?.MainInvoicingContact_Name}{" "}
            {chantier.customer?.MainInvoicingContact_FirstName}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <FaPhoneFlip className="text-xl text-blue-800"/>
            <p>{chantier.customer?.MainInvoicingContact_Phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineAlternateEmail className="text-xl text-blue-800"/>
            <p>{chantier.customer?.MainDeliveryContact_Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chantier_Card;
