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
  const [isLoading, setIsLoading] = useState(false);
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
    if (chantier_document && chantier_document.Id) {
      fetchDocumentsLines();
    }
  }, [chantier_document]);

  const fetchChantier = async () => {
    try {
      const chantierData = await getChantierById(chantier_id);
      setChantier(chantierData);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du chantier, ${error}`);
    }
  };

  const fetchDocument = async () => {
    try {
      const chantierDocument = await getChantierDocmumentByChantierId(chantier_id);
      setChantierDocument(chantierDocument[0]);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du document associé, ${error}`);
    }
  };

  const fetchDocumentsLines = async () => {
    try {
      if (chantier_document && chantier_document.Id) {
        const chantierDocumentsLines = await getChantiersDocLineByChantierId(chantier_document.Id);
        setChantierDocumentsLines(chantierDocumentsLines);
      }
    } catch (error) {
      setError(`Erreur lors de la récupération des lignes de documents, ${error}`);
    }
  };

  const formattedLines = chantier_documents_lines.map((line) => ({
    description: line.DescriptionClear || "Description manquante",
    price: line.NetPriceVatExcluded || "Prix manquant",
    quantity: line.Quantity || "Quantité manquante",
  }));

  return (
    <div>
      {isLoading && <p>Chargement en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && chantier && <Tableau saleLines={formattedLines} />}
    </div>
  );
}

export default Chantier_Detail;
