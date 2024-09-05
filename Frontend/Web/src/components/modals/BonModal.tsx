import { useEffect, useState } from "react";

import BeModal from "./BeModal";
import BsModal from "./BsModal";
import BlModal from "./BlModal";
import Icon from "../SVG/Icon";

function BonModal({setShowAddModal, setShowDetails}: {setShowAddModal: any, setShowDetails: any}) {

    const [bonType, setBonType] = useState<string>("");
    const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        switch (bonType) {
            case "BE":
                setModalComponent(<BeModal setShowAddModal={setShowAddModal} setShowDetails={setShowDetails} />);
                break;
            case "BS":
                setModalComponent(<BsModal />);
                break;
            case "BL":
                setModalComponent(<BlModal />);
                break;
            default:
                setModalComponent(null);
                break;
        }
    }, [bonType]);

    const handleTypeClick = (type: string) => {
        setBonType(type);
    }

    return (
        <div className="w-full h-full bg-gray-pers flex justify-center items-center">
            {modalComponent ? (
                modalComponent
            ) : (
                <div className="h-5/10 w-7/10 rounded-xl p-4 bg-gray-light2 text-gray-700 shadow-2xl flex flex-col items-center justify-evenly relative">
                    < Icon type="close" theme="" className="absolute top-1 right-1 text-red-700" onClick={() => setShowAddModal(false)} />
                    <div className="text-center text-base">Quelle type de document souhaitez-vous créer ?</div>
                    <div className="flex flex-col gap-2">
                        <li className="p-2 px-8 border-1 rounded-3xl text-white bg-green-800 cursor-pointer" onClick={() => handleTypeClick("BE")}>Bon entrée</li>
                        <li className="p-2 px-8 border-1 rounded-3xl text-white bg-red-800 cursor-pointer" onClick={() => handleTypeClick("BS")}>Bon sortie</li>
                        <li className="p-2 px-8 border-1 rounded-3xl text-white bg-orange-400 cursor-pointer" onClick={() => handleTypeClick("BL")}>Bon livraison</li>
                        <li className="p-2 px-8 border-1 rounded-3xl text-white bg-yellow-800 cursor-pointer" onClick={() => handleTypeClick("INV")}>Bon inventaire</li>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BonModal;
