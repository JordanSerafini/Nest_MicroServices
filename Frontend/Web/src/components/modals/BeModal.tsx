import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchDepot, fetchItems } from "../../utils/function/function";
import Icon from "../SVG/Icon";

import { Storehouse } from "../../types/stockDoc";
import url from "../../utils/url";

function BeModal({ setShowAddModal, setShowDetails }: { setShowAddModal: any, setShowDetails: any}) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);
  const [offset, _setOffset] = useState(0);
  const [limit, _setLimit] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [_loading, setLoading] = useState(true);
  const [storeHouseSelect, setStoreHouseSelect] = useState<Storehouse | null>(
    null
  );
  const [storeHouse, setStoreHouse] = useState<Storehouse[]>([]);
  const [lines, setLines] = useState([
    { articleId: "", articleName: "", quantity: "" },
  ]);
  const todayDate = new Date();

  useEffect(() => {
    const fetchDepotData = async () => {
      const depot = await fetchDepot();
      if (depot && Array.isArray(depot.rows)) {
        setStoreHouse(depot.rows);
      } else {
        setStoreHouse([]);
      }
    };

    fetchDepotData();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      await fetchItems(dispatch, limit, offset, searchQuery);
      setLoading(false);
    };

    getItems();
  }, [dispatch, offset, limit, searchQuery]);

  const handleArticleChange = (index: number, value: string) => {
    setSearchQuery(value);
    const selectedItem = items.find((item: any) => item.DesComClear === value);
    const newLines = [...lines];
    newLines[index].articleId = selectedItem ? selectedItem.Id : "";
    newLines[index].articleName = value;
    setLines(newLines);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const newLines = [...lines];
    newLines[index].quantity = value.toString();
    setLines(newLines);
  };

  const addNewLine = () => {
    setLines([...lines, { articleId: "", articleName: "", quantity: "" }]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      DevisLine: lines,
      StoreHouseId: storeHouseSelect?.Id,
      DocumentType: 2,
      DocumentDate: todayDate,
      prefix: "BE",
    };

    try {
      const response = await fetch(`${url.local}/addBE`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      setShowAddModal(false);
      setShowDetails(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full w-full flex items-start justify-center pt-5">
      <div className="w-9/10 h-9/10 bg-gray-light rounded-xl p-4 relative">
        <div className="w-full h-full p-2 text-gray-700 flex flex-col">
          <h2 className="pt-2 text-center text-xl tracking-widest font-bold pb-6 border-b-1 border-gray-700">
            Créer Bon entrée
          </h2>
          {/*---------------------------------------------------------------- DEPOT -----------------------------------------------------------------------*/}
          <div className="flex flex-row w-full pt-4 mb-6">
            <select
              className="border border-gray-400 rounded ml-2 w-full p-1"
              onChange={(e) =>
                setStoreHouseSelect(
                  storeHouse.find(
                    (depot) => depot.Id.toString() === e.target.value
                  ) || null
                )
              }
            >
              <option value="">Choisir un dépot</option>
              {storeHouse.map((depot) => (
                <option key={depot.Id} value={depot.Id}>
                  {depot.Caption}
                </option>
              ))}
            </select>
          </div>
          {/*---------------------------------------------------------------- LINES -----------------------------------------------------------------------*/}

          <div className="flex flex-col w-full max-h-7.5/10 overflow-auto">
            {lines.map((line, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-400 rounded mr-2"
                  placeholder="Article"
                  value={line.articleName}
                  onChange={(e) => handleArticleChange(index, e.target.value)}
                  list={`article-list-${index}`}
                />
                <datalist id={`article-list-${index}`} className="bg-red-500">
                  {items
                    .filter((item: any) =>
                      item.DesComClear?.toLowerCase().includes(
                        searchQuery.toLowerCase()
                      )
                    )
                    .map((item: any, i) => (
                      <option
                        key={`${item.Id}-${i}`}
                        value={item.DesComClear}
                      />
                    ))}
                </datalist>
                <input
                  type="number"
                  className="w-20 p-2 border border-gray-400 rounded mr-2"
                  placeholder="Quantité"
                  value={line.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>
          <div className="absolute left-2 bottom-2 flex flex-row w-full justify-evenly">
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={addNewLine}
            >
              Ajouter
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded"
              onClick={handleSubmit}
            >
              Envoyer
            </button>
          </div>
        </div>
        <Icon
          type="close"
          theme="red"
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => setShowAddModal(false)}
        />
      </div>
    </div>
  );
}

export default BeModal;
