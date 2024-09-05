import {  useRef, useState } from "react";
import Icon from "../SVG/Icon";
import LogoPickerModal from "./LogoPickerModal";
import axios from "axios";
import url from "../../utils/url";
import { fetchCards } from "../../utils/function/function";
import Homecards from "../../types/homecard";


interface OptionMenuModalProps {
  id: number;
  theme?: string;
  setCardTheme: (theme: string) => void;
  setShowModal: (showModal: boolean) => void;
  setCardType: (type: string) => void;
  setCss: (css: string) => void;
  userId: number;
  setCards: (cards: Homecards[]) => void;
}

function OptionMenuModal({
  id,
  setCardType,
  setShowModal,
  setCss,
  setCards,
}: OptionMenuModalProps) {
  const [selectedIcon, setSelectedIcon] = useState("home");
  const [showLogoPicker, setShowLogoPicker] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowModal(false);
  };

  // ------------------------------------------------ Gestion changement couleur --------------------------------
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const changeColor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
    }
  };

  const handleColorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(`${url.main}/updateCard/${id}`, {
        color: e.target.value,
      });
      if (updateResponse.status === 200) {
        console.log("Update successful, fetching cards...");
        await fetchCards(parseInt(user.id), setCards);
      } else {
        console.log("Failed to update card color", updateResponse.data);
      }
    } catch (error) {
      console.error("Error updating or fetching cards: ", error);
    }
    window.location.reload();
    setShowModal(false);
};



  // ------------------------------------------------ Gestion changement Logo --------------------------------
  const typeChange = (newType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setCardType(newType);
    setSelectedIcon(newType);

    axios.put(`${url.main}/updateCard/${id}`, {
      id: id,
      logo: newType,
    });

    setShowLogoPicker(false);
    setShowModal(false);
  };

  const showLogoPickerModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowLogoPicker(!showLogoPicker);
  };

  // ------------------------------------------------ Gestion des Border --------------------------------

  const handleBorder=()=>{
    setShowBorder(true);
    setCss("border-2 border-black")
    setShowModal(false);

  }

  const removeBorder=()=>{
    setShowBorder(false);
    setCss("")
    setShowModal(false);
  }

  const handleDelete = (id: number) => {
    axios.delete(`${url.main}/deleteCard/${id}`)
        .then(() => {
            fetchCards(parseInt(user.id), setCards);
            setShowModal(false);
        })
        .catch(error => {
            console.error('Failed to delete card:', error);
        });
};


  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  
  return (
    <div className="" onClick={(e)=>(stopPropagation(e))}>
      <Icon
        type="close"
        theme="#990000"
        className="text-xl absolute right-0 top-0"
        onClick={closeModal}
      />
      <div className="flex flex-col items-start text-sm gap-2 pt-4">

        {/*----------------------------------------- COLOR --------------------------------------*/}
        <div className="" onClick={changeColor}>
          Changer couleur
          <input
            ref={colorPickerRef}
            type="color"
            style={{ display: "none" }}
            onChange={handleColorChange}
          />
        </div>
                {/*----------------------------------------- LOGO --------------------------------------*/}

        <div className="flex">
          <div onClick={showLogoPickerModal}>Changer logo</div>
          {showLogoPicker && (
            <LogoPickerModal
              selectedIcon={selectedIcon}
              typeChange={typeChange}
              setSelectedIcon={setSelectedIcon}
            />
          )}
        </div>

                {/*----------------------------------------- DELETE --------------------------------------*/}

        <div className="" onClick={()=>handleDelete(id)}>Supprimer la carte</div>

        {/*----------------------------------------- THEME --------------------------------------*/}

        {showBorder ? (
          <div className="" onClick={removeBorder}>Supprimer contour</div>
        ) : (
          <div className="" onClick={handleBorder}>Ajouter contour</div>
        )}
      </div>
    </div>
  );
}

export default OptionMenuModal;