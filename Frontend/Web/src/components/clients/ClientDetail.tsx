import { useState, useEffect } from "react";
import { Customer } from "../../types/customer";
import Icon from "../SVG/Icon";
import LeafletMap from "../leaflet/leafletMap";


interface ClientDetailProps {
  customer: Customer;
  onClose: () => void;
}

function ClientDetail({ customer, onClose }: ClientDetailProps) {
  const [coordsAvailable, setCoordsAvailable] = useState(false);

  useEffect(() => {
    if (customer.Lat && customer.Lon) {
      setCoordsAvailable(true);
    }
  }, [customer.Lat, customer.Lon]);

  const buildAddress = () => {
    const parts = [
      customer.MainInvoicingAddress_Address1,
      customer.MainInvoicingAddress_Address2,
      customer.MainInvoicingAddress_Address3,
      customer.MainInvoicingAddress_Zipcode,
      customer.MainInvoicingAddress_City,
      customer.MainInvoicingAddress_State,
    ];
    return parts.filter((part) => part).join(" ");
  };

  const address = buildAddress();

  const getAmoutColor = (amount: number) => {
    switch (true) {
      case amount < 0:
        return "text-red-500";
      case amount > 0:
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleClose = () => {
    onClose();
  };


  return (
    <div className="border rounded-lg p-4 w-10/10 h-10/10 relative z-5 font-merriweather text-xs">
      <Icon
        type="close"
        theme="white"
        className="absolute top-2 right-2 cursor-pointer z-30 rounded-full bg-red-600 text-xs "
        onClick={handleClose}
      />
      <div className="flex flex-col w-full h-10/10 pt-4 justify-between ">
        {/*------------------------------------------------------------------------------- Partie 1 : nom / fonction  -------------------------------------------------------------------------------------------------*/}
        <div className="  flex flex-col gap-2 h-2/10 w-10/10 ">
          <div className="flex w-10/10 h-3/10 justify-between">
            <div className="font-semibold">{customer.Name}</div>
            <div className="flex flex-col items-end">
              {customer.MainDeliveryContact_Firstname ? (
                <div>{customer.MainDeliveryContact_Firstname}</div>
              ) : (
                <div>{customer.MainDeliveryContact_Name}</div>
              )}
              {customer.MainDeliveryContact_Function && (
                <div className="">{customer.MainDeliveryContact_Function}</div>
              )}
            </div>
          </div>
          {/*-------------------------------------------------------------------------------  Email  -------------------------------------------------------------------------------------------------*/}
          {customer.MainDeliveryContact_Email && (
            <div className="flex gap-2 items-center">
              <Icon type="mail" theme="green" className="text-xl" />:
              <div
                onClick={() =>
                  window.open(`mailto:${customer.MainDeliveryContact_Email}`)
                }
                className="cursor-pointer"
              >
                {customer.MainDeliveryContact_Email}
              </div>
            </div>
          )}
          {/*------------------------------------------------------------------------------- Commercial  -------------------------------------------------------------------------------------------------*/}
          <div className="flex  w-10/10 justify-between">
            <div className="flex gap-2 items-center">
              <Icon type="Person" theme="blue" className="text-xl" />:
              <div>{customer.ColleagueId}</div>
            </div>
          {/*------------------------------------------------------------------------------- Compte courant  -------------------------------------------------------------------------------------------------*/}
            <div className="flex gap-1">
              <div>Compte courant :</div>
              <div
                className={`font-bold ${
                  customer.CurrentAmount !== null
                    ? getAmoutColor(customer.CurrentAmount)
                    : ""
                }`}
              >
                {customer.CurrentAmount}
              </div>
            </div>
          </div>
        </div>
        {/*------------------------------------------------------------------------------------ Partie 2 : Map --------------------------------------------------------------------------------------------*/}
        <div className="gap-4 flex flex-col items-center h-8/10 ">
          <div className="text-xs">{address}</div>

          <LeafletMap
            lon={customer.Lon}
            lat={customer.Lat}
            coordsAvailable={coordsAvailable}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
