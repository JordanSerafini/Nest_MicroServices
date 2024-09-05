import { useEffect, useState } from "react";

import BottomNav from "../../components/nav/navBar/BottomNav";
import BonModal from "../../components/modals/BonModal.tsx";
import Icon from "../../components/SVG/Icon";

// Import des types depuis vos fichiers de type
import StockDocument from "../../types/stockDoc";
import StockDocumentLineWithPrice from "../../types/stockDoc";
import {Storehouse} from "../../types/stockDoc";

import {
  fetchStockDocLinesWithPrice,
  fetchStockDoc,
  fetchDepot,
} from "../../utils/function/function";
import { useSwipeable } from "react-swipeable";

  // doctype 2 = BE, inv = 3, BS = 1, BT = 6

  interface selectedDocDetail {
    DocumentNumber: string;
    Reference?: string | null;
    
  }

function Stock() {
  const [stockDocs, setStockDocs] = useState<StockDocument[]>([]);
  const [docLines, setDocLines] = useState<StockDocumentLineWithPrice[]>([]);
  const [depots, setDepots] = useState<Storehouse[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<StockDocument | null>(null);
  const [docLineSelected, setDocLineSelected] = useState<
    StockDocumentLineWithPrice[] | null
  >(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const  [showAddModal, setShowAddModal] = useState(false);
  const [selectedDocDetail, setSelectedDocDetail] = useState<selectedDocDetail | null>(null);


  useEffect(() => {
    if (selectedDoc) {
       setSelectedDocDetail({
        DocumentNumber: selectedDoc.DocumentNumber,
        Reference: selectedDoc.Reference,
      });
    }
    }, [selectedDoc]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchStockDoc();
        setStockDocs(result);
        const linesResult = await fetchStockDocLinesWithPrice();
        setDocLines(linesResult?.data);
        const depotsResult = await fetchDepot();
        setDepots(depotsResult.rows);
      } catch (err: unknown) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const getDepotName = (id: string) => {
    const depot = depots.find((depot) => depot.Id === id);
    return depot?.Caption || "Dépôt inconnu";
  };

  function getColor(prefix: string): string {
    switch (prefix) {
      case "BE":
        return "bg-green-500";
      case "BS":
        return "bg-blue-500";
      case "BL":
        return "bg-red-500";
      case "INV":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }


  const handleDetails = (id: string) => () => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
      const doc = stockDocs.find((doc) => doc.Id === id);
      setSelectedDoc(doc || null);
      if (doc) {
        const relatedDocLines = docLines.filter(
          (line) => line.DocumentId === doc.Id
        );
        setDocLineSelected(relatedDocLines);
      }
    }
  };

  const closeDetails = () => {
    setShowDetails(null);
    setSelectedDoc(null);
  };

  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowAddModal(true);
    },
    onSwipedRight: () => {
      setShowAddModal(true);
    },
    touchEventOptions: { passive: false },
    trackMouse: true,
  });


  return (
    <div className="h-screen w-screen bg-gray-light2 overflow-hidden"  >
      {showAddModal ? (< BonModal setShowAddModal={setShowAddModal} setShowDetails={setShowDetails} />) : (
      
      <div className="flex flex-col gap-2 h-8.5/10 overflow-auto pt-4 relative font-merriweather" {...handlers}>
        {stockDocs.map((doc) => (
          <div key={`doc-${doc.Id}`} className="flex flex-col ">
            <div className={`flex gap-2 w-full justify-between p-2 bg-white-perso text-sm ${showDetails ? 'opacity-25' : ''}`}>
              <p
                className={`${getColor(
                  doc.NumberPrefix
                )} w-2/10 justify-center flex`}
              >
                {doc.NumberPrefix}
              </p>
              <p>{getDepotName(doc.StorehouseId)}</p>
              <p>{formatDate(doc.DocumentDate)}</p>
              <Icon type="info" theme="blue" onClick={handleDetails(doc.Id)} />
            </div>
            {showDetails === doc.Id && (
              <div className="overflow-auto max-h-96 min-h-52 w-9/10 border-2 self-center border-blue-perso scale-110 bg-white-perso flex flex-col gap-2 items-center pt- p-2 relative">
                < Icon type="close" theme="white" className="sticky top-0 left-9.5/10 border-1 border-red-700 bg-red-600 rounded-full text-sm px-1" onClick={closeDetails} />
                { selectedDocDetail && (
                  <div className="flex flex-col w-10/10 text-xs sm:text-sm border-b-2 border-gray-700 pb-4">
                    <div className="flex justify-between gap-4">
                      <p className="text-green-700">{selectedDocDetail.DocumentNumber}</p>
                      <p className="text-blue-700">{selectedDocDetail.Reference}</p>
                    </div>
                  </div>
                )}

                {/*-------------------------------------details-----------------------------------*/}
                {docLineSelected &&
                  docLineSelected.map((line, index) => (
                    <div className="w-10/10 border-blue-perso pb-2 text-xs flex flex-col justify-start border-b text-gray-700 pt-4">
                      <p key={`${doc.Id}-${index}`}>
                        {line.DescriptionClear} 
                      </p>
                      <div className="font-bold text-blue-perso flex w-full justify-end">Qte: {line.Quantity}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )} 
     
      <BottomNav title="Stock" />
    </div>
  );
}

export default Stock;
