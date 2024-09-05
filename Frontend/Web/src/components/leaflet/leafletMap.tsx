import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import houseLogo from "../../assets/markerLogo2.png";

interface LeafletMapProps {
  lon: string | null;
  lat: string | null;
  coordsAvailable?: boolean;
}

import AdressNotFound from "../../assets/addressNotFound.jpg";
import Icon from "../SVG/Icon";

const LeafletMap: React.FC<LeafletMapProps> = ({
  lon,
  lat,
  coordsAvailable,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (coordsAvailable && lon && lat && mapContainerRef.current) {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      // Créez la carte Leaflet et définissez la vue sur les coordonnées spécifiées
      mapRef.current = L.map(mapContainerRef.current).setView(
        [latNum, lonNum],
        18
      );

      // Ajoutez une couche de tuiles OpenStreetMap à la carte
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 29,
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Ajoutez un marqueur à la carte pour indiquer la position spécifiée
      L.marker([latNum, lonNum], {
        icon: L.icon({
          iconUrl: houseLogo,
          iconSize: [28, 35],
          iconAnchor: [12, 41],
          shadowAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
      }).addTo(mapRef.current);
    }
  }, [lon, lat, coordsAvailable]);

  return (
    <div className="h-full w-full rounded-lg">
      {coordsAvailable ? (
        <div
          className="rounded-2xl "
          ref={mapContainerRef}
          style={{ height: "100%", width: "100%", zIndex: 10 }}
        ></div>
      ) : (
        <div className="h-10/10 w-full flex flex-col items-center justify-evenly text-red-600 font-bold">
          <div className="text-center flex items-center">
            <Icon theme="red" type="warning" className="text-4xl" />
            L'adresse n'a pas permis de déterminer les coordonnées
            géographiques.
          </div>
          <div className=" overflow-hidden flex justify-center items-center w-8/10 h-9/10">
            <img src={AdressNotFound} alt="" className="object-contain max-h-9/10 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
