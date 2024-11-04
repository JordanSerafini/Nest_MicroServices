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
      console.log(data.saleDocument.SaleDocumentLine);
      setSaleDetail(data.saleDocument);
    };

    fetchDetail();
  }, [saleId]);

  if (!saleDetail) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Détails de la vente</h1>
      <p><strong>ID de la vente :</strong> {saleId}</p>
      <p><strong>Client :</strong> {saleDetail.CustomerId}</p>
      <p><strong>Montant Total :</strong> {saleDetail.TotalDueAmount} €</p>
    
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-white border-b border-gray-300">
              <th className="px-4 py-2 w-6/10 text-center border-r">Description</th>
              <th className="px-4 py-2 w-0.5/10 text-center border-r">Quantité</th>
              <th className="px-4 py-2 w-1/10 text-center">Prix TTC</th>
            </tr>
          </thead>
          <tbody>
            {saleDetail.SaleDocumentLine && saleDetail.SaleDocumentLine.length > 0 ? (
              saleDetail.SaleDocumentLine.map((line, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700 border-r max-h-20 overflow-y-auto">
                    <div className="max-h-20 overflow-y-auto">
                      {line.Description || "Aucune description"}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-700 border-r">
                    {line.Quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-700">
                    {line.NetAmountVatIncluded} €
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-700">
                  Aucune ligne de document trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
};

export default DetailView;
