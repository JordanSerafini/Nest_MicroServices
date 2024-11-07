type SaleLine = {
    description: string;
    quantity: number | string;
    price: number | string;
  };
  
  function Tableau({ saleLines }: { saleLines: SaleLine[] }) {
    // Calculer le montant total dû
    const totalDueAmount = saleLines.reduce((total, line) => {
      const quantity = typeof line.quantity === 'string' ? parseFloat(line.quantity) : line.quantity;
      const price = typeof line.price === 'string' ? parseFloat(line.price) : line.price;
      return total + (quantity * price);
    }, 0);
  
    return (
      <div className="">
        <table className="min-w-full bg-white border border-gray-200 overflow-x-auto">
          <thead>
            <tr className="bg-white border-b border-gray-300 text-black">
              <th className="px-4 py-2 w-6/10 text-center border-r italic">Description</th>
              <th className="px-4 py-2 w-0.5/10 text-center border-r italic">Quantité</th>
              <th className="px-4 py-2 w-1/10 text-center italic">Prix TTC</th>
            </tr>
          </thead>
          <tbody>
            {saleLines && saleLines.length > 0 ? (
              saleLines.map((line, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-xs text-gray-700 border-r max-h-20 overflow-y-auto">
                    <div className="max-h-20 overflow-y-auto">
                      {line.description || "description manquante"}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-700 border-r">
                    {line.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-700">
                    {line.price} €
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
        <div className="flex items-end justify-end gap-2 pt-2 w-full pr-6">
          
          <p className="text-base font-bold text-black">Total</p>
          <p className="">{totalDueAmount.toFixed(2)} €</p>
        </div>
      </div>
    );
  }
  
  export default Tableau;
  