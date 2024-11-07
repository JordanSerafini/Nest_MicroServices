import { useEffect, useRef, useState, useCallback } from "react";
import { getChantiersPaginated } from "../utils/functions/chantier.function";
import { ConstructionSite } from "@/@types/chantiers/chantier.type";
import { useDashboardContext } from "../context/DashboardContext";
import Chantier_Card from "./Chantier_Card";
import Chantier_Detail from "./Chantier_Detail";

function Chantier_Dashboard() {
  const { content, dashboardSearchQuery } = useDashboardContext();
  const [chantiers, setChantiers] = useState<ConstructionSite[]>([]);
  const [limit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //* --------------------------------------------------------------------------  Intersection Observer    */
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchChantiers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getChantiersPaginated("", limit, offset);
      const chantiersData: ConstructionSite[] = data.chantiers;

      const uniqueChantiers = Array.from(
        new Map(
          chantiersData.map((chantier: ConstructionSite) => [
            chantier.Id,
            chantier,
          ])
        ).values()
      );

      setChantiers((prevChantiers) => [...prevChantiers, ...uniqueChantiers]);
    } catch (error) {
      setError("Erreur lors du chargement des chantiers.");
      console.error(
        "Error fetching all chantiers:",
        error instanceof Error ? error.message : error
      );
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset]);

  //* --------------------------------------------------------------------------  useEffect    */
  useEffect(() => {
    if (content === "" || content.startsWith("detail-")) {
      fetchChantiers();
    }
  }, [content, offset, fetchChantiers]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
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
      const newTarget = document.getElementById(
        `chantier-${fourthLastItemIndex}`
      );
      if (newTarget) {
        targetRef.current = newTarget as HTMLDivElement;
        observerRef.current.observe(targetRef.current);
      }
    }

    return () => observerRef.current?.disconnect();
  }, [chantiers, limit]);

  useEffect(() => {
    if (content === "") {
      setChantiers([]);
      setOffset(0);
    }
  }, [content]);

  useEffect(() => {
    if (dashboardSearchQuery == "") {
      setOffset(0);
      setChantiers([]);
      fetchChantiers();
    }
  }, [dashboardSearchQuery]);
  
  //* --------------------------------------------------------------------------  Filtered Chantiers    */
  const filteredChantiers = chantiers.filter((chantier) => {
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

    const query = dashboardSearchQuery.toLowerCase();
    return (
      chantier.Caption?.toLowerCase().includes(query) ||
      chantier.DealId?.toLowerCase().includes(query) ||
      chantier.CustomerId?.toLowerCase().includes(query) ||
      formattedStartDate.includes(query) ||
      formattedEndDate.includes(query) ||
      (chantier.ConstructionSiteAddress_City?.trim()
        .toLowerCase()
        .includes(query) ??
        false) ||
      chantier.customer?.MainInvoicingContact_Name?.toLowerCase().includes(
        query
      )
    );
  });

  return (
    <div className="h-10/10 text-gray-500 p-4 flex-col">
      {isLoading && <p>Chargement en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {content === "" && (
        <div className="grid grid-cols-3 gap-6">
          {filteredChantiers.map((chantier, index) => (
            <div
              id={`chantier-${index}`}
              key={`${chantier.Id}-${index}`}
              className="col-span-1"
            >
              <Chantier_Card chantier={chantier} />
            </div>
          ))}
        </div>
      )}
      {content.startsWith("detail-") && (
        <Chantier_Detail chantier_id={content.replace("detail-", "")} />
      )}
    </div>
  );
}

export default Chantier_Dashboard;
