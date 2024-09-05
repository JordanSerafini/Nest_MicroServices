import { SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCustomersPaginated } from "../../utils/function/function";

import BottomNav from "../../components/nav/navBar/BottomNav";
import { useNavigate } from "react-router-dom";
import url from "../../utils/url";

function SendForm() {

  const [offset] = useState(0);
  const [limit] = useState(50);
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>("");
  const [clientId, setClientId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [editableEmail, setEditableEmail] = useState("");
  const userStorage = JSON.parse(localStorage.getItem("user") || "{}");
  const commercialMail = userStorage.email;
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        await fetchCustomersPaginated(dispatch, limit, offset, clientSearchQuery);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    getCustomers();
  }, [dispatch, limit, offset, clientSearchQuery]);

  const handleClientSelectChange = (newValue: any) => {
    setSelectedCustomer(newValue?.value || undefined);
    setEditableEmail(newValue?.email || "");
    setClientId(newValue?.value || "");
    setClientName(newValue?.label || "");
  };


  const handleInputChange = (inputValue: string) => {
    setClientSearchQuery(inputValue);
  };

  const clientOptions = customers.map((customer) => ({
    value: customer.Id,
    label: customer.Name,
    email: customer.MainInvoicingContact_Email,
  }));

  const handleSendForm = () => {
    if (!selectedCustomer) {
      alert("Pas de client sélectionné");
      return;
    }
    if (!editableEmail) {
      alert("Pas d'email renseigné");
      return;
    }
    if (!clientId) {
      alert("Pas d'Id client renseigné");
      return;
    }
    if (!clientName) {
      alert("Pas de nom client renseigné");
      return;
    }

    try {
      fetch(`${url.main}/sendSatisfactionForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: clientId,
          name: clientName,
          email: editableEmail,
          commercialMail: commercialMail,
        }),
      }).then((response) => {
        if (response.ok) {
          alert("Formulaire envoyé avec succès a l'email: " + editableEmail);
          navigate("/");
        } else {
          alert("Erreur lors de l'envoi du formulaire");
        }
      });
    } catch (error) {
      console.error("Failed to send form:", error);

    }


  };

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEditableEmail(event.target.value);
  };


  return (
    <div className="p-4 w-screen h-screen flex flex-col items-center justify-center bg-gray-strong">
      <h2 className="w-screen text-center text-lg font-bold text-white pb-10">
        Envoyer un formulaire de satisfaction
      </h2>
      <div className="w-9.5/10 h-3/10 flex flex-col items-center gap-4 border-2 border-white rounded-3xl p-4 text-gray-700 bg-white-perso2">
        <h1 className="text-2xl mb-4">Selectionner un client</h1>
        <Select
          options={clientOptions}
          onChange={handleClientSelectChange}
          value={clientOptions.find((option) => option.value === selectedCustomer)}
          placeholder="Rechercher un client"
          className="font-bold text-center w-full"
          onInputChange={handleInputChange}
          styles={{
            control: (base) => ({ ...base, minHeight: 32 }),
            input: (base) => ({ ...base, fontSize: "14px" }),
            placeholder: (base) => ({ ...base, fontSize: "14px" }),
          }}
        />
        {selectedCustomer && (
          <div className="flex flex-col gap-2 h-auto items-center tracking-wide ">
            <input
              type="email"
              value={editableEmail}
              onChange={handleEmailChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
        )}
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded-lg w-full"
          onClick={handleSendForm}
        >
          Envoyer
        </button>
      </div>
      < BottomNav title="Envoi formulaire"/>
    </div>
  );
}

export default SendForm;
