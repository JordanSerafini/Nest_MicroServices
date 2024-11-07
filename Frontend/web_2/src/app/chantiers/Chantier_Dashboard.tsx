import { useEffect, useRef, useState, useCallback } from "react";
import { getChantiersPaginated } from "../utils/functions/chantier.function";
import { ConstructionSite } from "@/@types/chantiers/chantier.type";
import { useDashboardContext } from "../context/DashboardContext";
import Chantier_Card from "./Chantier_Card";
import Chantier_Detail from "./Chantier_Detail";

function Chantier_Dashboard() {
  const { content } = useDashboardContext();
  const [chantiers, setChantiers] = useState<ConstructionSite[]>([]);
  const [limit] = useState(18);
  const [offset, setOffset] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchChantiers = useCallback(async () => {
    try {
      const data = await getChantiersPaginated("", limit, offset);
      console.log("Data:", data);
      const chantiersData: ConstructionSite[] = data.chantiers;

      const uniqueChantiers = Array.from(
        new Map(chantiersData.map((chantier: ConstructionSite) => [chantier.Id, chantier])).values()
      );

      setChantiers((prevChantiers) => [...prevChantiers, ...uniqueChantiers]);
    } catch (error) {
      console.error(
        "Error fetching all chantiers:",
        error instanceof Error ? error.message : error
      );
    }
  }, [limit, offset]);

  useEffect(() => {
    fetchChantiers();
  }, [offset, fetchChantiers]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        console.log("Le quatrième dernier chantier est visible");
        setOffset((prevOffset) => prevOffset + limit);
      }
    };

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (chantiers.length >= 4) {
      const fourthLastItemIndex = chantiers.length - 4;
      const newTarget = document.getElementById(`chantier-${fourthLastItemIndex}`);
      if (newTarget) {
        targetRef.current = newTarget as HTMLDivElement;
        observerRef.current.observe(targetRef.current);
      }
    }

    return () => observerRef.current?.disconnect();
  }, [chantiers, limit]);


  return (
    <div className="h-10/10 text-gray-500 p-4 flex-col">
      {content === "" && (
        <div className="grid grid-cols-3 gap-6">
          {chantiers.map((chantier, index) => (
            <div id={`chantier-${index}`} key={`${chantier.Id}-${index}`} className="col-span-1">
              <Chantier_Card chantier={chantier} />
            </div>
          ))}
        </div>
      )}
      {content.startsWith("detail-") && <Chantier_Detail chantier_id={content.replace("detail-", "")} />}
    </div>
  );
}

export default Chantier_Dashboard;
