import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import { Customer } from "../../types/customer";

import MarkerImg from "../../assets/markerLogo2.png";
import BottomNav from "../../components/nav/navBar/BottomNav";
import { fetchCustomer } from "../../utils/function/function";

// Constantes pour Annecy
const INITIAL_CENTER: [number, number] = [45.8992, 6.1294];
const INITIAL_ZOOM: number = 16;
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



//? ------------------------------------------- Fetch des clients a l'arrivée sur la page
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
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`
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
    <>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "475px", width: "100%" }}
        className="z-10"
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {customers
          .filter((customer) => inRadius(customer.Lat, customer.Lon))
          .map((customer) => (
            <Marker
              key={customer.Id}
              position={[customer.Lat, customer.Lon]}
              icon={MarkerLogo}
            >
              <Popup>
                <div className="min-w-9.5/10 self-center">
                  <h2 className="text-center font-bold">{customer.Name}</h2>
                  <p>
                    Adresse: {customer.MainDeliveryAddress_Address1},{" "}
                    {customer.MainDeliveryAddress_City},{" "}
                    {customer.MainDeliveryAddress_Zipcode}
                  </p>
                </div>
              </Popup>{" "}
            </Marker>
          ))}
      </MapContainer>
      <div className="flex flex-col items-center gap-2">
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
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded w-9/10">
          Rechercher
        </button>
      </div>
      <BottomNav title="Map" />
    </>
  );
};

export default AllMap;
