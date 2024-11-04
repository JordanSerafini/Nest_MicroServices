// DetailView.tsx
"use client";

import { useEffect, useState } from "react";
import { getSaleById } from "@/app/utils/functions/ventes.function";
import { SaleDocumentWithLines } from "@/@types/sales/SaleDocument.type";

interface DetailViewProps {
  saleId: string;
}

const DetailView: React.FC<DetailViewProps> = ({ saleId }) => {
  const [saleDetail, setSaleDetail] = useState<SaleDocumentWithLines | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getSaleById(saleId);
      console.log(data.saleDocument.SaleDocumentLine); // Vérifie la structure des données
      setSaleDetail(data.saleDocument); // Utilise `data.saleDocument` pour la mise à jour
    };

    fetchDetail();
  }, [saleId]);

  if (!saleDetail) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Détails de la vente</h1>
      <p>ID de la vente : {saleId}</p>
      <p>Client : {saleDetail.CustomerId}</p>
      <p>Montant Total : {saleDetail.TotalDueAmount} €</p>

      {saleDetail.SaleDocumentLine && saleDetail.SaleDocumentLine.length > 0 ? (
        saleDetail.SaleDocumentLine.map((line, index) => (
          <div key={index} className="border-b border-gray-300 mb-2 pb-2">
            <p>Description :</p>
            <div className="whitespace-pre-wrap text-sm text-gray-700">
              {line.Description ? (line.Description) : "Aucune description"}
            </div>
            <p>Quantité : {line.Quantity}</p>
            <p>Quantité réelle : {line.RealQuantity}</p>
            <p>Montant HT : {line.NetAmountVatExcluded} €</p>
            <p>Montant TTC : {line.NetAmountVatIncluded} €</p>
            <p>Montant de la TVA : {line.VatAmount} €</p>
          </div>
        ))
      ) : (
        <p>Aucune ligne de document trouvée.</p>
      )}
    </div>
  );
};

export default DetailView;
