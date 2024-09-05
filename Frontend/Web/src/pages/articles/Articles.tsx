import { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/nav/navBar/BottomNav";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchItems } from "../../utils/function/function";
import Icon from "../../components/SVG/Icon";
import Badges from "../../components/badges/Badges";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/loader/Loader";
import {
  searchItemFamilly,
  fetchItemFamilly,
} from "../../utils/function/function";

import { usernameRegex } from "../../utils/regex/regex";
import AddItemModal from "../../components/modals/Item/AddItemModal";

import { useSwipeable } from "react-swipeable";
import { AxiosResponse } from "axios";
import { useGlobalContext } from "../../context/globalContext";

interface Family {
  Id: string;
  name: string;
}

function Articles() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItemId, setExpandedItemId] = useState<number | null | string>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const { triggerToast } = useToast();
  const [inputError, setInputError] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [familyName, setFamilyName] = useState<string>("Famille inconnue");
  const [_family, setFamily] = useState<Family[]>([]);
  const [familySearchQuery, setFamilySearchQuery] = useState<string>("");
  const { isAdminPanel } = useGlobalContext();

  useEffect(() => {
    const getItems = async () => {
      await fetchItems(dispatch, limit, offset, searchQuery);
      setLoading(false);
    };

    getItems();
  }, [dispatch, offset, limit, searchQuery]);

  useEffect(() => {
    const getFamily = async () => {
      try {
        const response: AxiosResponse<{ rows: Family[] }> =
          await fetchItemFamilly();
        if (response.data && response.data.rows) {
          setFamily(response.data.rows);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des familles", error);
        setFamily([]);
      }
    };
    getFamily();
  }, []);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleLoadLess = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [items]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setOffset(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (usernameRegex(inputValue)) {
      setSearchQuery(inputValue);
      setOffset(0);
    } else {
      setInputError("Caractères spéciaux non autorisés");
      setTimeout(() => {
        setInputError("");
      }, 2000);
    }
  };

  const handleFamilySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilySearchQuery(e.target.value);
  };

  const getBadgeFamColor = (familyid: string) => {
    switch (familyid) {
      case "AV":
        return "bg-green-500";
      case "BOITEMAIL":
        return "bg-yellow-500";
      case "MULTIFONCT":
        return "bg-blue-500";
      case "LOGI":
        return "bg-red-500";
      case "CM":
        return "bg-purple-500";
      case "PREST":
        return "bg-pink-500";
      case "ADMIN":
        return "bg-indigo-500";
      default:
        return "";
    }
  };

  const getStockColor = (realstock: number) => {
    if (realstock <= 0) {
      return "text-red-500 font-bold";
    } else if (realstock < 5) {
      return "text-orange-400";
    } else {
      return "text-green-500";
    }
  };

  const handleNoStock = () => {
    triggerToast({
      message: "Attention plus de stock",
      css: "",
      duration: 1400,
      position: "top",
    });
  };

  const handleExpand = async (
    itemId: string,
    realStock: number,
    familyId: string
  ) => {
    if (realStock <= 0) {
      handleNoStock();
    }

    try {
      const familyName = await searchItemFamilly(familyId);
      setFamilyName(familyName);
    } catch (error) {
      console.error(
        "Erreur lors de la recherche du nom de la famille :",
        error
      );
    }

    setExpandedItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowAddItemModal(true);
    },
    onSwipedRight: () => {
      setShowAddItemModal(true);
    },
    touchEventOptions: { passive: false },
    trackMouse: true,
  });

  const handleShowPrice = (e: any) => {
    e.stopPropagation();
    setShowPrice(!showPrice);
  };

  const filteredItems = items.filter((item) => {
    if (!familySearchQuery) return true;
    return (
      item.FamilyId &&
      item.FamilyId.toLowerCase().includes(familySearchQuery.toLowerCase())
    );
  });

  const handleConstruction = () => {
    triggerToast({
      message: "Fonctionnalité en cours de construction",
      css: "bg-orange-500 text-white font-bold",
      duration: 1400,
      position: "top",
    });
  };


  const inputCss =
    "text-center rounded-full border-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-700";

  const handleDeleteById = async (id: string | number) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteItem/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        triggerToast({
          message: "Article supprimé",
          css: "bg-green-500",
          duration: 1400,
          position: "top",
        });
      } else {
        triggerToast({
          message: "Erreur lors de la suppression",
          css: "bg-red-500",
          duration: 1400,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start bg-gray-light2 overflow-hidden">
      {showAddItemModal && (
        <AddItemModal onClose={() => setShowAddItemModal(false)} />
      )}
      <div
        {...handlers}
        className={`${
          showAddItemModal
            ? "h-9.5/10 w-full flex flex-col items-center font-Poppins opacity-20"
            : "h-9.5/10 w-full flex flex-col items-center font-Poppins"
        }`}
      >
        {/*-------------------------------------------------------------- Barre recherche --------------------------------------------------------------------------------------------------*/}
        <div className="w-screen min-h-24 items-center flex justify-center flex-row ">
          <div className="w-full h-10/10 flex flex-row items-center justify-evenly border-b-4 bg-gray-light border-blue-perso ">
            <div onClick={handleLoadLess} className="h-full content-center">
              <Icon
                type="chevron_left"
                className="text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
              />
              <div onClick={handleLoadLess}></div>
            </div>
            <div className="flex flex-col gap-2 w-7/10">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Recherche..."
                className={inputCss}
              />
              <div className="w-full flex flex-row gap-1 justify-between">
                <input
                  className="text-center w-8/10 rounded-full border-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-700"
                  type="text"
                  value={familySearchQuery}
                  placeholder="famille"
                  onChange={handleFamilySearchChange}
                />
                <select value={limit} onChange={handleLimitChange} className="">
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>
            <div onClick={handleLoadMore} className="h-full content-center">
              <Icon
                type="chevron_right"
                className="text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
              />
            </div>
          </div>
        </div>
        {/*----------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="flex-1 w-full overflow-auto">
          <div className="flex flex-col gap-2 w-full lg:flex-row lg:flex-wrap lg:justify-center items-center p-1 ">
            <div ref={topRef}></div>
            {loading ? (
              <Loader />
            ) : inputError ? (
              <div className="text-red-500 mt-52 font-bold text-center">
                {inputError}
              </div>
            ) : (
              // ------------------------------------------------------ Liste des articles -----------------------------------------------------------------------------------------------
              filteredItems.map((item: any) => (
                <div className="w-full h-full items-center flex flex-col">
                  <div
                    key={item.Id}
                    onClick={() =>
                      handleExpand(item.Id, item.RealStock, item.FamilyId)
                    }
                    className={`bg-white-perso w-full lg:w-4.5/10 text-xs flex flex-col font-merriweather transition-transform duration-300 ${
                      expandedItemId === item.Id
                        ? "w-full lg:w-full border-2 border-blue-perso"
                        : "w-9.5/10"
                    } mb-2`}
                  >
                    {/*--------------------------------------------------------------------------- Main article ------------------------------------------------------------------------*/}
                    <div className="w-full h-full p-2 text-xs flex relative justify-between items-center">
                      <p className="w-5/10 overflow-auto text-center">
                        {item.Caption}
                      </p>
                      {item.FamilyId && (
                        <div className="w-2.5/10 overflow-hidden">
                          <Badges
                            title={item.FamilyId}
                            color={getBadgeFamColor(item.FamilyId)}
                          />
                        </div>
                      )}
                      <p className="w-2/10 text-center">
                        {item.SalePriceVatExcluded}€
                      </p>
                      <div className="absolute right-0 bottom-0">
                        <Icon
                          type="expand_more"
                          className="text-xl cursor-pointer"
                        />
                      </div>
                    </div>
                    {/*--------------------------------------------------------------------------- Detail article ------------------------------------------------------------------------*/}
                    {expandedItemId === item.Id && (
                      <div className="flex flex-col items-center justify-evenly min-h-32 w-full hover:shadow-2xl p-2 gap-4">
                        {/* -------------------------------------------------------------------------- 2 eme part ----------------------------------------------------------------- */}
                        <div className="border-t-1 flex w-full h-1/2 justify-between items-center ">
                          {/* -------------------------------------------------------------------------- Fournisseur / Famille DIV ----------------------------------------------------------------- */}
                          <div className="text-center w-full flex items-center justify-center h-8/10 overflow-hidden">
                            <div className="flex flex-col justify-evenly h-full font-bold tracking-wider">
                              {item.SupplierId ? (
                                <span className="text-green-600 border-green-700 border-b">
                                  {item.SupplierId}
                                </span>
                              ) : (
                                "Fournisseur inconnu"
                              )}
                              {item.FamilyId && (
                                <span className="text-blue-500">
                                  {familyName}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* -------------------------------------------------------------------------- Stock ----------------------------------------------------------------- */}
                          <p className="w-4.5/10 flex justify-center gap-1">
                            stock:{" "}
                            <span className={getStockColor(item.RealStock)}>
                              {item.RealStock}
                            </span>
                          </p>
                          {/* -------------------------------------------------------------------------- Prix / showPrice ----------------------------------------------------------------- */}
                          <div
                            className="w-4.5/10 flex flex-row items-center justify-center gap-2"
                            onClick={handleShowPrice}
                          >
                            {showPrice ? (
                              <div>
                                Prix achat:{" "}
                                <span className="font-bold">
                                  {item.PurchasePrice}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-row gap-5 w-full items-center justify-center font-semi-bold text-blue-900">
                                <p>{item.SalePriceVatIncluded} TTC</p>
                              </div>
                            )}
                          </div>
                        </div>
                          {/* -------------------------------------------------------------------------- 3eme part / description ----------------------------------------------------------------- */}
                          <div className="text-center flex flex-row w-full h-1/2 justify-center items-center ">
                            <Icon
                              type="description"
                              theme="blue"
                              className="text-xl"
                            />
                            <p>:</p>
                            <p className=" overflow-auto w-full border shadow-inner hover:shadow-2xl">
                              {item.DesComClear || "Description inconnue"}
                            </p>
                          </div>
                        </div>
                    )}
                  </div>
                  {/*--------------------------------------------------------------------------- Admin Panel ------------------------------------------------------------------------*/}
                  {isAdminPanel && expandedItemId === item.Id && (
                    <div className="flex flex-row gap-2">
                      <button
                        className="bg-blue-500 text-white p-1 rounded-md"
                        onClick={handleConstruction}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white p-1 rounded-md"
                        onClick={() =>
                          expandedItemId !== null &&
                          handleDeleteById(expandedItemId as string | number)
                        }
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomNav title="Articles" />
    </div>
  );
}

export default Articles;
