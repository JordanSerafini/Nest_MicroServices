import { useState } from "react";
import url from "../../../utils/url";
import ValidationModal from "../ValidationModal.tsx/ValidationModal";

import {
  phoneNumberRegex,
  nameRegex,
  addressRegex2,
  postalCodeRegex,
  cityRegex,
  notesRegex,
} from "../../../utils/regex/regex";
import Icon from "../../SVG/Icon";
import { useNotifications } from "../../../context/NotificationsContext";

interface AddCustomerModalProps {
  onClose: () => void;
}

interface FormData {
  Name: string;
  MainDeliveryContact_CellPhone: string;
  MainDeliveryAddress_Address1: string;
  MainInvoicingAddress_Address1: string;
  MainDeliveryAddress_City: string;
  MainDeliveryAddress_ZipCode: string;
  addressType: "MainDeliveryAddress_Address1" | "MainInvoicingAddress_Address1";
  NotesClear: string;
}

function AddCustomerModal({ onClose }: AddCustomerModalProps) {
  const [formData, setFormData] = useState<FormData>({
    Name: "",
    MainDeliveryContact_CellPhone: "",
    MainDeliveryAddress_Address1: "",
    MainInvoicingAddress_Address1: "",
    MainDeliveryAddress_City: "",
    MainDeliveryAddress_ZipCode: "",
    addressType: "MainDeliveryAddress_Address1",
    NotesClear: "",
  });

  const [errorPhone, setErrorPhone] = useState<string | undefined>(undefined);
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [errorAddress, setErrorAddress] = useState<string | undefined>(
    undefined
  );
  const [errorCity, setErrorCity] = useState<string | undefined>(undefined);
  const [errorPostalCode, setErrorPostalCode] = useState<string | undefined>(
    undefined
  );
  const [errorNotes, setErrorNotes] = useState<string | undefined>(undefined);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const { addNotification } = useNotifications();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //? ------------------------------------------------------------------------------------------------------- Validation
    //* ---------------------------------------------------------------------------------------------------- Nom
    if (name === "Name") {
      if (!nameRegex(value)) {
        setErrorName("Le format du nom est incorrect.");
      } else {
        setErrorName(undefined);
      }
    }
    //* ---------------------------------------------------------------------------------------------------- Telephone
    if (name === "MainDeliveryContact_CellPhone") {
      if (!phoneNumberRegex(value)) {
        setErrorPhone("Le numéro de téléphone doit contenir 8 ou 13 chiffres.");
      } else {
        setErrorPhone(undefined);
      }
    }
    //* ---------------------------------------------------------------------------------------------------- Adresse
    if (
      name == "MainDeliveryAddress_Address1" ||
      name == "MainInvoicingAddress_Address1"
    ) {
      if (!addressRegex2(value)) {
        setErrorAddress("Le format de l'adresse est incorrect.");
      } else {
        setErrorAddress(undefined);
      }
    }
    //* ---------------------------------------------------------------------------------------------------- Ville
    if (
      name === "MainDeliveryAddress_City" ||
      name === "MainDeliveryAddress_City"
    ) {
      if (!cityRegex(value)) {
        setErrorCity("Le format de la ville est incorrect.");
      } else {
        setErrorCity(undefined);
      }
    }
    //* ---------------------------------------------------------------------------------------------------- Code Postal
    if (
      name === "MainDeliveryAddress_ZipCode" ||
      name === "MainDeliveryAddress_ZipCode"
    ) {
      if (!postalCodeRegex(value)) {
        setErrorPostalCode("Le code postal doit contenir 5 chiffres.");
      } else {
        setErrorPostalCode(undefined);
      }
    }
    //* ---------------------------------------------------------------------------------------------------- Notes
    if (name === "NotesClear") {
      if (!notesRegex(value)) {
        setErrorNotes("Le format des notes est incorrect.");
      } else {
        setErrorNotes(undefined);
      }
    }
  };
  const handleAddressTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      addressType: value as
        | "MainDeliveryAddress_Address1"
        | "MainInvoicingAddress_Address1",
      MainDeliveryAddress_Address1:
        value === "MainDeliveryAddress_Address1"
          ? prevState.MainDeliveryAddress_Address1
          : "",
      MainInvoicingAddress_Address1:
        value === "MainInvoicingAddress_Address1"
          ? prevState.MainInvoicingAddress_Address1
          : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowValidationModal(true);
  };

  const handleConfirm = async () => {
    const { addressType, ...formDataToSend } = formData;
    console.log("Form data:", formDataToSend);

    try {
      const response = await fetch(`${url.local}/addCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        addNotification({
          message: "Client ajouté avec succès!",
          type: "Success",
          bgColor: "green-800",
          textColor: "white",
          icon: "check",
          iconColor: "white",
          deny: () => console.log("Notification fermée"),
          width: "w-9/10",
          position: "top-center",
        });
      } else {
        addNotification({
          message: "Erreur lors de l'ajout du client!",
          type: "Error",
          bgColor: "red-500",
          textColor: "white",
          icon: "error",
          iconColor: "red",
          deny: () => console.log("Notification fermée"),
          width: "w-9/10",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }

    setShowValidationModal(false);
    onClose();
  };

  const handleCancel = () => {
    setShowValidationModal(false);
  };

  return (
    <div className="shadow-2xl p-2 h-9/10 w-9/10 border border-gray-800  fixed bg-gray-light z-50 rounded-lg flex flex-col justify-start items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      
      <div className="w-full h-full flex flex-col items-center relative font-merriweather text-gray-700">
        {/* ----------------------------------------------------------------------------- Entete ------------------------------------------------------------------------------- */}
        <h1 className="font-bold border-b-1 p-2 pb-4 w-9/10 text-center tracking-widest border-b border-blue-perso">
          Ajouter un client
        </h1>
        {/* ----------------------------------------------------------------------------- Form ------------------------------------------------------------------------------- */}
        <form
          onSubmit={handleSubmit}
          className="w-9.5/10 h-full flex flex-col "
        >
          <div className="flex flex-col justify-between h-full">
            <div className="h-10/10 flex flex-col w-full items-center justify-start gap-4">
              <div className="h-4/10 w-full flex flex-col justify-evenly">
                <div className="flex flex-row w-full justify-between gap-2">
                {/* ----------------------------------------------------------------------------- Nom ------------------------------------------------------------------------------- */}
                <div className="flex flex-col gap- items-center w-10/10 ">
                  <Icon type="Person" theme="" className="text-3xl text-blue-800" />
                  <div className="flex flex-col gap-1 w-full">
                    <input
                      type="text"
                      name="Name"
                      placeholder="Nom"
                      value={formData.Name}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-1 border-2 ${
                        errorName ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errorName && (
                      <p className="text-red-600 tracking-wider">{errorName}</p>
                    )}
                  </div>
                </div>
                {/* ----------------------------------------------------------------------------- Telephone ------------------------------------------------------------------------------- */}
                <div className="flex flex-col gap- items-center w-5/10">
                  <Icon type="Phone" theme="" className="text-3xl text-blue-600" />
                  <div className="flex flex-col gap-1">
                    <input
                      type="number"
                      name="MainDeliveryContact_CellPhone"
                      placeholder="Numéro de téléphone"
                      value={formData.MainDeliveryContact_CellPhone}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-1 border-2 ${
                        errorPhone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errorPhone && <p className="text-red-600">{errorPhone}</p>}
                  </div>
                </div>
                </div>
                {/* ----------------------------------------------------------------------------- Adresse ------------------------------------------------------------------------------- */}
                <div className="flex flex-row gap-2 items-center w-full ">
                  <Icon type="Home" theme="" className="text-3xl text-green-600" />
                  <div className="flex flex-col gap-1 w-full">
                    <input
                      type="text"
                      name="MainDeliveryAddress_Address1"
                      placeholder="Adresse"
                      value={formData.MainDeliveryAddress_Address1}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-1 border-2 ${
                        errorPhone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errorAddress && (
                      <p className="text-red-600">{errorAddress}</p>
                    )}
                  </div>
                </div>
                {/* ----------------------------------------------------------------------------- Ville ------------------------------------------------------------------------------- */}
                <div className="relative w-full">
                  <div className="flex w-full gap-2 justify-between">
                    <div className="flex flex-row w-full gap-2 items-center">
                      <Icon type="map" theme="" className="text-3xl text-green-600" />
                      <div className="flex flex-col gap-1 w-full">
                        <input
                          type="text"
                          name="MainDeliveryAddress_City"
                          placeholder="Ville"
                          value={formData.MainDeliveryAddress_City}
                          onChange={handleChange}
                          className={`w-full rounded-lg p-1 border-2 ${
                            errorCity ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-3/10">
                      <div className="flex flex-col gap-1 w-full">
                        <input
                          type="number"
                          name="MainDeliveryAddress_ZipCode"
                          placeholder="Code Postal"
                          value={formData.MainDeliveryAddress_ZipCode}
                          onChange={handleChange}
                          className={`w-full rounded-lg p-1 border-2 ${
                            errorPostalCode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute w-full text-center ${
                      errorCity && errorPostalCode ? "-bottom-14" : "-bottom-8"
                    }`}
                  >
                    {errorCity && <p className="text-red-600">{errorCity}</p>}
                    {errorPostalCode && (
                      <p className="text-red-600">{errorPostalCode}</p>
                    )}
                  </div>
                </div>

                {/* ----------------------------------------------------------------------------- Option Adresse Type ------------------------------------------------------------------------------- */}
              </div>
              <div className="flex flex-col w-full ">
                <div className="text-center border-b-1 border-black pb-1">
                  Type d'adresse :
                </div>
                <div className="w-full justify-evenly flex pt-1 ">
                  <label className="bg-white p-2 rounded-xl flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      name="addressType"
                      value="MainDeliveryAddress_Address1"
                      checked={
                        formData.addressType === "MainDeliveryAddress_Address1"
                      }
                      onChange={handleAddressTypeChange}
                      className=""
                    />{" "}
                    Livraison
                  </label>
                  <label className="bg-white p-2 rounded-xl flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      name="addressType"
                      value="MainInvoicingAddress_Address1"
                      checked={
                        formData.addressType === "MainInvoicingAddress_Address1"
                      }
                      onChange={handleAddressTypeChange}
                    />{" "}
                    Facturation
                  </label>
                </div>
              </div>
              {/* ----------------------------------------------------------------------------- Note Textarea ------------------------------------------------------------------------------- */}
              <textarea
                name="NotesClear"
                placeholder="A noter..."
                value={formData.NotesClear}
                onChange={handleChange}
                rows={4}
                className={`w-full rounded-lg p-1 border-2 ${
                  errorNotes ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errorNotes && <p className="text-red-600">{errorNotes}</p>}
            </div>
            {/* ----------------------------------------------------------------------------- Button add client ------------------------------------------------------------------------------- */}
            <div className="w-full h-1/10 flex">
              <button
                type="submit"
                className="w-full min-h- p-2 bg-blue-500 text-white rounded-full"
              >
                Ajouter Client
              </button>
            </div>
          </div>
        </form>
        {/* ----------------------------------------------------------------------------- Button close ------------------------------------------------------------------------------- */}
        <button
          onClick={onClose}
          className="bg-red-500 text-white text-xs absolute right-0 top-0 rounded-full px-1"
        >
          X
        </button>
      </div>
      {showValidationModal && (
        <ValidationModal
          setShowValidationModal={setShowValidationModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default AddCustomerModal;
