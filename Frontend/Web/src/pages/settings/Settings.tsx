import { useState } from "react";
import axios from "axios";
import url from "../../utils/url";
import {
  nameRegex,
  emailRegex,
  phoneNumberRegex,
} from "../../utils/regex/regex";

import BottomNav from "../../components/nav/navBar/BottomNav";
import Icon from "../../components/SVG/Icon";

interface Errors {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
}

function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [userData, setUserData] = useState({
    nom: user.nom || "",
    prenom: user.prenom || "",
    email: user.email || "",
    telephone: user.telephone || "",
  });

  // État pour stocker les erreurs de validation
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const newErrors: Errors = {};
    if (!nameRegex(userData.nom)) {
      newErrors["nom"] = "Le nom est invalide.";
    }
    if (!nameRegex(userData.prenom)) {
      newErrors["prenom"] = "Le prénom est invalide.";
    }
    // Validation de l'email
    if (!emailRegex(userData.email)) {
      newErrors["email"] = "L'email est invalide.";
    }

    if (userData.telephone && !phoneNumberRegex(userData.telephone)) {
      newErrors["telephone"] = "Le numéro de téléphone est invalide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUserData = async () => {
    if (validateFields()) {
      try {
        localStorage.setItem("user", JSON.stringify({ ...user, ...userData }));
        await axios.post(`${url.main}/updateUser`, {
          id: user.id,
          ...userData,
        });
        console.log("Données de l'utilisateur mises à jour avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des données de l'utilisateur :",
          error
        );
      }
    } else {
      console.error(
        "Erreurs de validation empêchent la sauvegarde des données."
      );
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-light2 flex items-start justify-center pt-4 font-merriweather">
      <div className="w-9/10 h-9/10 bg-white-perso border-2 rounded-2xl flex flex-col items-center justify-between text-gray-600">
        <div className="w-full h-full flex flex-col justify-evenly items-center">
          <h4 className="text-lg border-b border-gray-700 w-8/10 text-center pb-2 font-bold tracking-widest">Profil utilisateur</h4>
          <div className="h-8/10  w-9/10 text-sm">
            <div className="flex flex-col w-full items-center">
              <Icon type="Person" theme="" className="text-2xl text-blue-700" />
              <input
                type="text"
                name="nom"
                value={userData.nom}
                onChange={handleInputChange}
                className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 py-2 my-2 focus:outline-none focus:border-blue-perso"
              />
            </div>
            {errors.nom && (
              <div className="text-red-500 text-sm">{errors.nom}</div>
            )}
            <div className="flex flex-col w-full items-center">

              <input
                type="text"
                name="prenom"
                value={userData.prenom}
                onChange={handleInputChange}
                className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 py-2 my-2 focus:outline-none focus:border-blue-perso"
              />
            </div>
            {errors.prenom && (
              <div className="text-red-500 text-sm">{errors.prenom}</div>
            )}
            <div className="flex flex-col w-full items-center">
              <Icon type="Mail" theme="green" className="text-2xl" />
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 py-2 my-2 focus:outline-none focus:border-blue-perso"
              />
            </div>
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
            <div className="flex flex-col w-full items-center">
              <Icon type="Call" theme="" className="text-2xl text-blue-400" />
              <input
                type="text"
                name="telephone"
                value={userData.telephone}
                onChange={handleInputChange}
                className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 py-2 my-2 focus:outline-none focus:border-blue-perso"
              />
            </div>
            {errors.telephone && (
              <div className="text-red-500 text-sm">{errors.telephone}</div>
            )}
          </div>
        </div>

        <button
          onClick={saveUserData}
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline tracking-widest"
        >
          Enregistrer
        </button>
      </div>
      <BottomNav title="Parametres" />
    </div>
  );
}

export default Settings;
