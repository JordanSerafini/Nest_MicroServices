import { useEffect, useState } from "react";
import Tableau from "../components/Tableau";

import {
  getChantierById,
  getChantierDocmumentByChantierId,
  getChantiersDocLineByChantierId,
} from "../utils/functions/chantier.function";

import {
  ConstructionSite,
  ConstructionSiteReferenceDocument,
  ConstructionSiteReferenceDocumentLine,
} from "@/@types/chantiers/chantier.type";

function Chantier_Detail({ chantier_id }: { chantier_id: string }) {
  const [chantier, setChantier] = useState<ConstructionSite | null>(null);
  const [chantier_document, setChantierDocument] = useState<ConstructionSiteReferenceDocument | null>(null);
  const [chantier_documents_lines, setChantierDocumentsLines] = useState<ConstructionSiteReferenceDocumentLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await fetchChantier();
        await fetchDocument();
      } catch (error) {
        setError(`Erreur lors du chargement des détails du chantier, ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [chantier_id]);

  useEffect(() => {
    const fetchLinesIfNeeded = async () => {
      if (chantier_document && chantier_document.Id) {
        try {
          setIsLoading(true);
          await fetchDocumentsLines();
        } catch (error) {
          setError(`Erreur lors de la récupération des lignes de documents, ${error}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLinesIfNeeded();
  }, [chantier_document]);

  const fetchChantier = async () => {
    const chantierData = await getChantierById(chantier_id);
    setChantier(chantierData);
  };

  const fetchDocument = async () => {
    const chantierDocument = await getChantierDocmumentByChantierId(chantier_id);
    setChantierDocument(chantierDocument[0]);
  };

  const fetchDocumentsLines = async () => {
    if (chantier_document && chantier_document.Id) {
      const chantierDocumentsLines = await getChantiersDocLineByChantierId(chantier_document.Id);
      setChantierDocumentsLines(chantierDocumentsLines);
    }
  };

  const formattedLines = chantier_documents_lines.map((line) => ({
    description: line.DescriptionClear || "Description manquante",
    price: line.NetPriceVatExcluded || "Prix manquant",
    quantity: line.Quantity || "Quantité manquante",
  }));

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && chantier && <Tableau saleLines={formattedLines} />}
      {!isLoading && !error && !chantier && <p>Aucun détail de chantier disponible.</p>}
    </div>
  );
}


export default Chantier_Detail;
