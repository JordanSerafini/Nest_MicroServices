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


  //* ---------------------------------------------------------------------------------- UseEffect
  useEffect(() => {
    const fetchAllData = async () => {
      await fetchChantier();
      await fetchDocument();
    };

    fetchAllData();
  }, [chantier_id]);

  useEffect(() => {
    if (chantier_document && chantier_document.Id) {
      fetchDocumentsLines();
    }
  }, [chantier_document]);

  //* ---------------------------------------------------------------------------------- Fetch Functions
  const fetchChantier = async () => {
    try {
      const chantierData = await getChantierById(chantier_id);
      setChantier(chantierData);
    } catch (error) {
      console.error("Error fetching chantier data:", error);
    }
  };

  const fetchDocument = async () => {
    try {
      const chantierDocument = await getChantierDocmumentByChantierId(chantier_id);
      setChantierDocument(chantierDocument[0]);
    } catch (error) {
      console.error("Error fetching chantier document:", error);
    }
  };

  const fetchDocumentsLines = async () => {
    try {
      if (chantier_document && chantier_document.Id) {
        const chantierDocumentsLines = await getChantiersDocLineByChantierId(chantier_document.Id);
        setChantierDocumentsLines(chantierDocumentsLines);
      } else {
        console.error("chantier_document is null or Id is missing");
      }
    } catch (error) {
      console.error("Error fetching chantier documents lines:", error);
    }
  };

  const formattedLines = chantier_documents_lines.map((line) => ({
    description: line.DescriptionClear || "Description manquante",
    price: line.NetPriceVatExcluded || "Prix manquant",
    quantity: line.Quantity || "Quantité manquante",
  }));

  return (
    <div>

    < Tableau saleLines={formattedLines} />
      
    </div>
  );
}

export default Chantier_Detail;
