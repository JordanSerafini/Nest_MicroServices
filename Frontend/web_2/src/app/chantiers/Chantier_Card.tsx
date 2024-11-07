import { ConstructionSite } from "@/@types/chantiers/chantier.type";
import { useDashboardContext } from "../context/DashboardContext";
import { IoIosContact } from "react-icons/io";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

function Chantier_Card({ chantier }: { chantier: ConstructionSite }) {
  const { setContent } = useDashboardContext();

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
    <div
      className="bg-white border p-3 rounded-xl w-full min-h-[22vh] flex flex-col items-center justify-start gap-4 overflow-auto shadow-xl"
      onClick={() => setContent(`detail-${chantier.Id}`)}
    >
      <div className="flex w-full justify-between font-bold text-blue-900 cursor-pointer">
        <p className="italic">{chantier.Caption}</p>
        <p>{chantier.DealId}</p>
      </div>
      <div className="flex justify-between w-full">
        <div>
          <p>{chantier.CustomerId}</p>
          <p>{chantier.ConstructionSiteAddress_City}</p>
        </div>
        <div className="flex flex-col items-end">
          <p>
            <span>Début : </span>
            {formattedStartDate}
          </p>
          <p>Fin : {formattedEndDate}</p>
        </div>
      </div>
      <div className="flex w-full justify-between pt-2">
        <div className="flex items-start gap-1">
          <IoIosContact className="text-xl text-green-800" />
          <p>
            {chantier.customer?.MainInvoicingContact_Name}{" "}
            {chantier.customer?.MainInvoicingContact_FirstName}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <FaPhoneFlip className="text-xl text-blue-800" />
            <p>{chantier.customer?.MainInvoicingContact_Phone}</p>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineAlternateEmail className="text-xl text-blue-800" />
            <p>{chantier.customer?.MainDeliveryContact_Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chantier_Card;
