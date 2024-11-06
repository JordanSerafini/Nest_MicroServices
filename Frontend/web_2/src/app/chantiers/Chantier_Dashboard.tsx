import { useEffect, useState } from "react";
import { getChantiersPaginated } from "../utils/functions/chantier.function";
import { ConstructionSite } from "@/@types/chantiers/chantier.type";
import { useDashboardContext } from "../context/DashboardContext";
import Chantier_Card from "./Chantier_Card";

function Chantier_Dashboard() {
  const { content } = useDashboardContext();
  const [chantiers, setChantiers] = useState<ConstructionSite[]>([]);

  useEffect(() => {
    const fetchChantiers = async () => {
      try {
        const data = await getChantiersPaginated("", 10, 0);

        const chantiersData: ConstructionSite[] = data.chantiers;

        const uniqueChantiers = Array.from(
          new Map(chantiersData.map((chantier: ConstructionSite) => [chantier.Id, chantier])).values()
        );

        setChantiers(uniqueChantiers);
      } catch (error) {
        console.error(
          "Error fetching all chantiers:",
          error instanceof Error ? error.message : error
        );
      }
    };

    fetchChantiers();
  }, []);


  return (
    <div className="h-10/10 w-full text-gray-500 p-4 flex-col">
      {content === "" && (
        <div className="flex flex-wrap justify-evenly h-10/10 w-10/10 gap-2">
          {chantiers.map((chantier) => (
            <Chantier_Card key={chantier.Id} chantier={chantier} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Chantier_Dashboard;
