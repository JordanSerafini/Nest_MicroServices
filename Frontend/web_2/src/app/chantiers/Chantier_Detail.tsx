import { useEffect, useState } from "react";

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
      console.log("chantierData", chantierData);
    } catch (error) {
      console.error("Error fetching chantier data:", error);
    }
  };

  const fetchDocument = async () => {
    try {
      const chantierDocument = await getChantierDocmumentByChantierId(chantier_id);
      setChantierDocument(chantierDocument);
      console.log("chantierDocument", chantierDocument);
    } catch (error) {
      console.error("Error fetching chantier document:", error);
    }
  };

  const fetchDocumentsLines = async () => {
    try {
      if (chantier_document && chantier_document.Id) {
        const chantierDocumentsLines = await getChantiersDocLineByChantierId(chantier_document.Id);
        setChantierDocumentsLines(chantierDocumentsLines);
        console.log("chantierDocumentsLines", chantierDocumentsLines);
      } else {
        console.error("chantier_document is null or Id is missing");
      }
    } catch (error) {
      console.error("Error fetching chantier documents lines:", error);
    }
  };

  return (
    <div>
      <h2>Détails du Chantier {chantier_id}</h2>
      {chantier ? (
        <div>
          <p>Nom du chantier : {chantier.Caption}</p>
          <p>Adresse : {chantier.ConstructionSiteAddress_City}</p>
        </div>
      ) : (
        <p>Chargement des détails du chantier...</p>
      )}

      <h3>Document associé</h3>
      {chantier_document ? (
        <div>
          <p>Document ID: {chantier_document.Id}</p>

        </div>
      ) : (
        <p>Aucun document trouvé.</p>
      )}

      <h3>Lignes de documents</h3>
      {chantier_documents_lines.length > 0 ? (
        chantier_documents_lines.map((line) => (
          <div key={line.Id}>
            <p>Ligne ID: {line.Id}</p>
            <p>Quantité: {line.Quantity}</p>
          </div>
        ))
      ) : (
        <p>Aucune ligne de document trouvée.</p>
      )}
    </div>
  );
}

export default Chantier_Detail;
