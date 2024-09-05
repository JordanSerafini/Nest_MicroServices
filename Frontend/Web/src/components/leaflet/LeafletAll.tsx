import  { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import { Customer } from "../../types/customer";
import { addressRegex2 } from "../../utils/regex/regex";

import MarkerImg from "../../assets/markerLogo2.png";
import BottomNav from "../../components/nav/navBar/BottomNav";
import { fetchCustomer } from "../../utils/function/function";
import Icon from "../SVG/Icon";

// Constantes pour Annecy
const INITIAL_CENTER: [number, number] = [45.8992, 6.1294];
const INITIAL_ZOOM: number = 15;
const RADIUS = 500;

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const AllMap: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom] = useState<number>(INITIAL_ZOOM);
  const [radius, setRadius] = useState<number>(RADIUS);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tempCity, setTempCity] = useState<string>("");
  const [tempRadius, setTempRadius] = useState<string>(RADIUS.toString());

  //? ------------------------------------------- Fetch des clients à l'arrivée sur la page
  useEffect(() => {
    fetchCustomer(setCustomers);
  }, []);

  //? ------------------------------------------- Marker

  const MarkerLogo = new L.Icon({
    iconUrl: MarkerImg,
    iconSize: [20, 21],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleCitySearch = async (city: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
      );
      if (response.data && response.data.length > 0) {
        const lat = parseFloat(response.data[0].lat);
        const lon = parseFloat(response.data[0].lon);
        setMapCenter([lat, lon]);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  const handleSearch = async () => {
    if (!addressRegex2(tempCity)) {
      alert("Ville non valide");
      return;
    }
    await handleCitySearch(tempCity);
    setRadius(Number(tempRadius));
  };

  const inRadius = (customerLat: number, customerLon: number) => {
    if (!customerLat || !customerLon) {
      return false;
    }

    const customerLatLng = L.latLng(customerLat, customerLon);
    const centerLatLng = L.latLng(mapCenter);
    return centerLatLng.distanceTo(customerLatLng) <= radius;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center gap-2 p-1 border-b-4 border-blue-900">
        <input
          type="text"
          placeholder="Recherche de ville"
          value={tempCity}
          onChange={(e) => setTempCity(e.target.value)}
          className="border-2 border-gray-300 p-2 w-9.5/10 mt-2 text-center tracking-widest"
        />
        <input
          type="number"
          placeholder="Rayon de recherche en mètres"
          value={tempRadius}
          onChange={(e) => setTempRadius(e.target.value)}
          className="border-2 border-gray-300 p-2 w-9.5/10 text-center tracking-widest"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded w-9/10"
        >
          Rechercher
        </button>
      </div>
      <div className="flex-1 w-full overflow-hidden z-20">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: "92%", width: "100%", zIndex: 10}}
        >
          <ChangeView center={mapCenter} zoom={zoom} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {customers
            .filter((customer) => inRadius(customer.Lat, customer.Lon))
            .map((customer) => {
              const phoneNumber =
                customer.MainDeliveryContact_CellPhone ||
                customer.MainInvoicingContact_Cellphone ||
                customer.MainInvoicingContact_Phone ||
                customer.MainDeliveryContact_Phone;

              return (
                <Marker
                  key={customer.Id}
                  position={[customer.Lat, customer.Lon]}
                  icon={MarkerLogo}
                >
                  <Popup>
                    <div className="flex flex-col h-auto items-center justify-evenly">
                      <h2 className=" font-bold">{customer.Name}</h2>
                      <p className="">
                        {customer.MainDeliveryAddress_Address1},{" "}
                        {customer.MainDeliveryAddress_City},{" "}
                        {customer.MainDeliveryAddress_Zipcode}
                      </p>
                      <div className="flex gap-1 items-center">
                        <Icon type="Person" theme="green" />
                        <div>
                          {customer.MainDeliveryContact_Name}{" "}
                          {customer.MainInvoicingContact_Firstname}
                        </div>
                      </div>

                      <p className="flex items-center gap-1">
                        <Icon type="Phone" theme="blue" />
                        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
      <BottomNav title="Map" />
    </div>
  );
};

export default AllMap;
