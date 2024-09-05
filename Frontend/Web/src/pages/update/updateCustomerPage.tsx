import { useEffect, useState } from "react";
import { Customer } from "../../types/customer";
import Icon from "../../components/SVG/Icon";
import BottomNav from "../../components/nav/navBar/BottomNav";

function CustomerSyncChecker() {
  const [uniqueToPG, setUniqueToPG] = useState<Customer[]>([]);
  const [uniqueToSQL, setUniqueToSQL] = useState<Customer[]>([]);
  const [lastChecked, setLastChecked] = useState<string>("");

  const checkCustomerDifferences = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/findNewCustoById"
      );
      const data = await response.json(); 
      setUniqueToPG(data.UniqueToPG || []);
      setUniqueToSQL(data.UniqueToSQL || []);
      setLastChecked(new Date().toLocaleString());
    } catch (error) {
      console.error("Error checking customer differences:", error);
    }
  };

  useEffect(() => {
    // Effectuer la vérification immédiatement à la première montée du composant
    checkCustomerDifferences();

    // Définir l'intervalle pour vérifier toutes les heures (3600000 ms)
    const intervalId = setInterval(checkCustomerDifferences, 3600000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const refreshCustomerDifferences = () => {
    checkCustomerDifferences();
  };

  const updateCustomerPG = async () => {
    const idArray = uniqueToSQL.map(customer => customer.Id);
    
    try {
      const response = await fetch("http://localhost:5000/updateCustomerPG", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Ids: idArray }),
      });

      if (!response.ok) {
        throw new Error("Failed to update customers in PostgreSQL");
      }

      const data = await response.json();
      console.log("Update response:", data);
      checkCustomerDifferences();
    } catch (error) {
      console.error("Error updating customers in PostgreSQL:", error);
    }
  };


  return (
    <div className="p-2 w-screen h-screen gap-4 flex flex-col items-center justify-center bg-gray-strong">
      <div className="flex gap-4">
        <h2 className="text-center text-lg font-bold text-white">
          Vérification des différences de clients
        </h2>
        <Icon
          type="Refresh"
          theme="blue"
          className="bg-white rounded-full p-1"
          onClick={refreshCustomerDifferences}
        />
      </div>
      <div className="w-9.5/10 h-7.5/10 flex flex-col justify-between items-center gap-4 border-2 border-white rounded-3xl p-4 text-gray-700 bg-white-perso2">
        <div className="flex flex-row w-full h-full justify-center">
          <div className="w-4.5/10 flex flex-col items-center justify-start border-r-2 border-gray-700">
            <h1 className="text-2xl mb-4 border-b-1 border-black pb-4">
              Clients uniques à PostgreSQL
            </h1>
            <div className="w-full max-h-8/10 flex justify-center overflow-auto">
              <ul className="">
                {uniqueToPG.map((customer) => (
                  <li key={customer.Id}>
                    {customer.Name} - {customer.Accounts_Account}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-4.5/10 h-full flex flex-col items-center justify-start">
            <h1 className="text-2xl mb-4 border-b-1 border-black pb-4 ml-4">
              Clients uniques à SQL Server
            </h1>
            <div className="w-full max-h-8/10 flex justify-center overflow-auto">
              <ul className="">
                {uniqueToSQL.map((customer) => (
                  <li key={customer.Id}>
                    {customer.Name} - {customer.Accounts_Account}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/*
        <div>
          <div>Mettre a jour un client spécifique:</div>
          <div></div>
          <div></div>
        </div>
        */}
        <div className="text-sm text-gray-500">
          Dernière vérification : {lastChecked}
        </div>
      </div>
        <div className="flex w-full justify-evenly mb-10">
            <div className="font-bold  text-blue-500 border-1 bg-white p-1 rounded-3xl">MAJ vers EBP</div>
            <p className="font-bold  text-white">Lancer la Mise a jour</p>
            <div className="font-bold text-green-500 border-1 bg-white p-1 rounded-3xl" onClick={updateCustomerPG}>MAJ vers App</div>

        </div>
        <BottomNav title="Synchronisation Clients"/>
    </div>
  );
}

export default CustomerSyncChecker;
