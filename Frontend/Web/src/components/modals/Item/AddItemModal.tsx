import React, { useEffect, useState } from "react";
import url from "../../../utils/url";
import Supplier from "../../../types/supplier";
import Icon from "../../SVG/Icon";
import { useNotifications } from "../../../context/NotificationsContext";
import ValidationModal from "../ValidationModal.tsx/ValidationModal";

import { numberRegex, nameRegex, notesRegex } from "../../../utils/regex/regex";

interface AddItemModalProps {
  onClose: () => void;
}


function AddItemModal({ onClose }: AddItemModalProps) {
  const { addNotification } = useNotifications();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [families, setFamilies] = useState<{ Id: string; Caption: string }[]>(
    []
  );
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [formData, setFormData] = useState({
    Caption: "",
    FamilyId: "",
    SupplierId: "",
    SalePriceVatIncluded: "",
    DesComClear: "",
    NotesClear: "",
  });

  const [errorName, setErrorName] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDescribe, setErrorDescribe] = useState(false);
  const [errorNotes, setErrorNotes] = useState(false);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await fetch(`${url.main}/allsupplier`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSuppliers(data.rows);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };

    const getFamilies = async () => {
      try {
        const response = await fetch(`${url.main}/getItemFamily`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setFamilies(data.rows);
      } catch (error) {
        console.error("Failed to fetch families:", error);
      }
    };

    getSuppliers();
    getFamilies();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Clicked");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "Caption") setErrorName(!nameRegex(value));
    if (name === "SalePriceVatIncluded") setErrorPrice(!numberRegex(value));
    if (name === "DesComClear") setErrorDescribe(!notesRegex(value));
    if (name === "NotesClear") setErrorNotes(!notesRegex(value));

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidationModal(true); // Afficher la modale de validation
  };

  const handleConfirm = async () => {
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    console.log(filteredFormData);
    try {
      const result = await fetch(
        `${url.local}/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredFormData),
        }
      );

      if (result.ok) {
        addNotification({
          message: "Article ajouté avec succès!",
          type: "Success",
          bgColor: "green-800",
          textColor: "white",
          icon: "check",
          iconColor: "white",
          deny: () => console.log("Notification fermée"),
          width: "w-9/10",
          position: "top-center",
          onClick: handleClick,
        });
      } else {
        addNotification({
          message: "Erreur lors de l'ajout de l'article!",
          type: "Error",
          bgColor: "red-500",
          textColor: "white",
          icon: "Error",
          iconColor: "red",
          deny: () => console.log("Notification fermée"),
          width: "w-9/10",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  const handleCancel = () => {
    setShowValidationModal(false);
  };


    return (
      <div className="shadow-2xl p-2 h-9.5/10 w-9/10 border-2 fixed bg-white-perso z-50 rounded-lg flex flex-col justify-start items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full h-full flex flex-col items-center relative font-merriweather text-gray-700">
          {/*------------------------------------------------------------------------------------------ Fermeture X ---------------------------------------------------------------*/}
          <Icon
            onClick={onClose}
            className="bg-red-500 text-white text- absolute right-0 top-0 rounded-full p-1 cursor-pointer"
            type="close"
            theme="white"
          >
            X
          </Icon>
          {/*------------------------------------------------------------------------------------------ Form ---------------------------------------------------------------*/}
          <form
            className="w-9.5/10 h-full flex flex-col pt-2 text-sm lg:text-base justify-evenly items-center gap-4 overflow-y-auto"
            onSubmit={handleSubmit}
          >
            <h2 className="font-bold tracking-widest text-base sm:text-lg border-b-1 p-2 pb-4 w-9/10 text-center border-b border-blue-perso">
              Ajouter un Article
            </h2>
            <div className="w-full flex flex-col items-center gap-4">
              {/*------------------------------------------------------------------------------------------ Nom ---------------------------------------------------------------*/}
              <div className="w-full h-full gap-1 flex flex-col">
              <div className="w-full flex flex-col gap-">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="Caption"
                  value={formData.Caption}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                />
              </div>
              {errorName && (
                <p className="text-xs text-s tracking-widest text-red-500">Nom invalide</p>
              )}
              </div>
              {/*------------------------------------------------------------------------------------------ Famille ---------------------------------------------------------------*/}
              <div className="w-full flex flex-col gap-1">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Famille
                </label>
                <select
                  name="FamilyId"
                  value={formData.FamilyId}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                >
                  <option value="">Sélectionner une famille</option>
                  {families.map((family) => (
                    <option key={family.Id} value={family.Id}>
                      {family.Caption}
                    </option>
                  ))}
                </select>
              </div>
              {/*------------------------------------------------------------------------------------------ Fournisseur ---------------------------------------------------------------*/}
              <div className="w-full flex flex-col gap-1">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Fournisseur
                </label>
                <select
                  name="SupplierId"
                  value={formData.SupplierId}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.Id} value={supplier.Id}>
                      {supplier.Name}
                    </option>
                  ))}
                </select>
              </div>
              {/*------------------------------------------------------------------------------------------ Prix ---------------------------------------------------------------*/}
              <div className="w-full flex flex-col gap-1">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Prix
                </label>
                <input
                  type="text"
                  name="SalePriceVatIncluded"
                  value={formData.SalePriceVatIncluded}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                />
                {errorPrice && (
                  <p className="text-xs tracking-widest text-red-500">
                    Prix invalide
                    </p>
                    )}
              </div>
              {/*------------------------------------------------------------------------------------------ Description ---------------------------------------------------------------*/}
              <div className="w-full flex flex-col gap-1">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="DesComClear"
                  value={formData.DesComClear}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                ></textarea>
                {errorDescribe && (
                  <p className="text-xs tracking-widest text-red-500">
                    Description invalide
                    </p>
                    )}
              </div>
              {/*------------------------------------------------------------------------------------------ Note ---------------------------------------------------------------*/}
              <div className="w-full flex flex-col gap-1">
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Note
                </label>
                <textarea
                  name="NotesClear"
                  value={formData.NotesClear}
                  onChange={handleChange}
                  className="w-full rounded-lg p-1 border-2 border-gray-300"
                ></textarea>
                {errorNotes && (
                  <p className="text-xs tracking-widest text-red-500">Note invalide</p>
                )}
              </div>

            </div>
            {/*------------------------------------------------------------------------------------------ Ajouter ---------------------------------------------------------------*/}
            <div className="w-full flex justify-center mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Ajouter
              </button>
            </div>
          </form>
          {showValidationModal && (
            <ValidationModal
              setShowValidationModal={setShowValidationModal}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    );
    
}

export default AddItemModal;
