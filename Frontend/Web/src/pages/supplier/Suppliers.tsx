import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import BottomNav from "../../components/nav/navBar/BottomNav"
import { fetchSupplierPaginated } from "../../utils/function/function";
import Supplier from "../../types/supplier";
import Icon from "../../components/SVG/Icon";

function Suppliers() {
  const dispatch = useAppDispatch();

  const { suppliers, totalSuppliers,  } = useAppSelector(
    (state) => state.supplier
  );  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>();
  const [showDetailCard, setShowDetailCard] = useState(false);

  const inputRef = useRef<HTMLHeadingElement>(null); 


  //* ------------------------------------------------ Fetch des fournisseurs a l'ouverture de la page
  useEffect(() => {
    const getSuppliers = async () => {
      try {
        await fetchSupplierPaginated(dispatch, limit, offset, searchQuery);
      } catch (error) {
        console.error("Failed to fetch supplier:", error);
      }
    };
    getSuppliers();
  }, [dispatch, offset, limit, searchQuery]);


  const handleRef = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleLoadMore = () => {
    if (offset + limit < totalSuppliers) {
      setOffset(prev => prev + limit);
    }
    setShowDetailCard(false);
    handleRef();
  };

  const handleLoadLess = () => {
    setOffset(prev => Math.max(0, prev - limit));
    setShowDetailCard(false);
    handleRef();
  };

  const handleDetailCard = (id: string) => {
    const supplier = suppliers.find(supplier => supplier.Id === id);
    setSelectedSupplier(supplier as Supplier);
    setShowDetailCard(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setShowDetailCard(false);
    handleRef();
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    setShowDetailCard(false);
  };

  return (
    <div className="bg-gray-light2 h-screen w-screen flex flex-col items-center">
      <div className=" h-8/10 overflow-auto text-sm border-b-2 border-gray-strong bg-white-perso2 flex flex-col items-center gap-2 w-full">
        <div ref={inputRef}></div>
        {showDetailCard && selectedSupplier ? (
          <div>in progress</div>
        ) : (
          suppliers.map((supplier) => (
            <div
              key={supplier.Id}
              className="min-w-9.5/10 flex justify-between border-b-1 p-1 border-gray-pers bg-white-perso min-h-14 items-center gap-2"
            >
              <div className="w-5/10 overflow-auto">{supplier.Name}</div>
              <Icon
                type="info"
                className="text-2xl theme-blue"
                onClick={() => handleDetailCard(supplier.Id || "")}
              />
            </div>
          ))
        )}
      </div>
      <div className="h-1.5/10 w-full flex flex-row items-center justify-center gap-2">
        <div
          className={`h-full w-1/10 content-center ${
            offset === 0 ? "hidden" : ""
          }`}
        >
          {offset !== 0 && (
            <Icon
              type="chevron_left"
              className="text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
              onClick={handleLoadLess}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 w-7/10 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Recherche..."
            className="text-center"
          />
          <select
            value={limit}
            onChange={handleLimitChange}
            className="text-center"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div
          className={`h-full w-1/10 content-center ${
            offset + limit >= totalSuppliers ? "hidden" : ""
          }`}
        >
          {offset + limit < totalSuppliers && (
            <Icon
              type="chevron_right"
              className="text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
              onClick={handleLoadMore}
            />
          )}
        </div>
      </div>
      <BottomNav title="Fournisseurs" />
    </div>
  );
}

export default Suppliers;
