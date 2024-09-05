import { useEffect, useState } from "react";
import { Item } from "../../types/item"; 
import Icon from "../../components/SVG/Icon";
import BottomNav from "../../components/nav/navBar/BottomNav";

function ItemSyncChecker() {
  const [uniqueToPG, setUniqueToPG] = useState<Item[]>([]);
  const [uniqueToSQL, setUniqueToSQL] = useState<Item[]>([]);
  const [lastChecked, setLastChecked] = useState<string>("");

  const checkItemDifferences = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/findNewItemsbyID"
        );
        
      const data = await response.json(); 
      setUniqueToPG(data.UniqueToPG || []);
      setUniqueToSQL(data.UniqueToSQL || []);
      setLastChecked(new Date().toLocaleString());

    } catch (error) {
      console.error("Error checking item differences:", error);
    }
  };
  useEffect(() => {
    // Effectuer la vérification immédiatement à la première montée du composant
    checkItemDifferences();

    // Définir l'intervalle pour vérifier toutes les heures (3600000 ms)
    const intervalId = setInterval(checkItemDifferences, 3600000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const refreshItemDifferences = () => {
    checkItemDifferences();
  };

  const updateItemPG = async () => {
    const idArray = uniqueToSQL.map(item => item.Id);
    
    try {
      const response = await fetch("http://localhost:5000/updateItemPG", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Ids: idArray }),
      });

      if (!response.ok) {
        throw new Error("Failed to update items in PostgreSQL");
      }

      const data = await response.json();
      console.log("Update response:", data);
      checkItemDifferences();
    } catch (error) {
      console.error("Error updating items in PostgreSQL:", error);
    }
  };

  return (
    <div className="p-2 w-screen h-screen gap-4 flex flex-col items-center justify-center bg-gray-strong">
      <div className="flex flex-row justify-end w-full ">
        
        <Icon
          type="Refresh"
          theme="blue"
          className="bg-white rounded-full p-1 "
          onClick={refreshItemDifferences}
        />
      </div>
      <div className="w-9.5/10 h-7.5/10 flex flex-col justify-between items-center gap-4 border-2 border-white rounded-3xl p-4 text-gray-700 bg-white-perso2">
        <div className="flex flex-row w-full h-full justify-center">
          <div className="w-4.5/10 flex flex-col items-center justify-start border-r-2 border-gray-700">
            <h1 className="text-base font-bold mb-4  w-full flex justify-center pb-2 border-b border-gray-700 ">
              App SLI
            </h1>
            <div className="w-full max-h-8/10 flex justify-center overflow-auto">
              <ul className="">
                {uniqueToPG.map((item) => (
                  <li key={item.Id}>
                    {item.Caption}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-4.5/10 h-full flex flex-col items-center justify-start">
          <h1 className="text-base font-bold mb-4  border-black pb-2">
              EBP
            </h1>
            <div className="w-full max-h-8/10 flex justify-center overflow-auto">
              <ul className="">
                {uniqueToSQL.map((item) => (
                  <li key={item.Id}>
                    {item.Caption}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Dernière vérification : {lastChecked}
        </div>
      </div>
      <div className="flex w-full justify-evenly mb-10">
        <div className="font-bold text-blue-500 border-1 bg-white p-1 rounded-3xl">MAJ vers EBP</div>
        <p className="font-bold text-white">Lancer la Mise a jour</p>
        <div className="font-bold text-green-500 border-1 bg-white p-1 rounded-3xl" onClick={updateItemPG}>MAJ vers App</div>
      </div>
      <BottomNav title="Synchronisation Items" />
    </div>
  );
}

export default ItemSyncChecker;
