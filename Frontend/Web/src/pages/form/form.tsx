import { useEffect, useState } from "react";
import sliLogo from "../../assets/sli-logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCustomersPaginated } from "../../utils/function/function";

import QuestionsStars from "../../components/form/QuestionsStars";
import TextArea from "../../components/form/TextArea";
import YesNoQuestion from "../../components/form/YesNoQuestion";
import { Customer } from "../../types/customer";
import url from "../../utils/url";

interface Ratings {
  [key: string]: number;
}
interface Comments {
  [key: string]: string;
}

interface YesNoAnswers {
  [key: string]: string;
}

interface User {
  email: string;
  prenom: string;
  nom: string;
  telephone: string;
}

function Form() {
  const [offset] = useState(0);
  const [limit] = useState(50);
  const [clientSearchQuery] = useState("");

  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);
  const [ratings, setRatings] = useState<Ratings>({});
  const [comments, setComments] = useState<Comments>({});
  const [yesNoAnswers, setYesNoAnswers] = useState<YesNoAnswers>({});
  const [clientToken, setClientToken] = useState(null);
  const [client, setClient] = useState<Customer | null>(null);
  const [usersList, setUsersList] = useState<User[] | null >([]);
  const [commercial, setCommercial] = useState<User | null>(null);


  //* --------------------------------------------------------------------------------------------------------- Recupération et Set des données
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${url.main}/decode-token?token=${token}`
        );
        const data = await response.json();
        setClientToken(data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [location]);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const result = await fetch(`${url.main}/getAllUsers`);
        const data = await result.json();
        setUsersList(data);
        
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    getUsersList();
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        await fetchCustomersPaginated(
          dispatch,
          limit,
          offset,
          clientSearchQuery
        );
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    getCustomers();
  }, [dispatch, limit, offset, clientSearchQuery]);

  const addCommercial = clientToken && usersList
    ? usersList.find((user) => user.email === (clientToken as any).commercialMail)
    : null;

  useEffect(() => {
    if (addCommercial) {
      setCommercial(addCommercial);
    }
  }, [addCommercial]);

  const addClient = clientToken && customers
    ? customers.find((customer) => customer.Id === (clientToken as any).id)
    : null;

    useEffect(() => {
      if (addClient) {
        setClient(addClient);
      }
    }, [addClient]);

    useEffect(() => {
      const NbrOfRates = Object.keys(ratings).length;
      if (NbrOfRates > 0) {
        const total = Object.values(ratings).reduce(
          (acc, rating) => acc + rating,
          0
        );
        setAverageRating(roundToHalf((total / NbrOfRates) * 4));
      } else {
        setAverageRating(0);
      }
    }, [ratings]);

  //* -------------------------------------------------------------------------------------------------------- FORMULAIRE

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: rating,
    }));
  };

  const handleCommentChange = (commentId: string, comment: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [commentId]: comment,
    }));
  };

  const handleYesNoChange = (questionId: string, answer: string) => {
    setYesNoAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  //* -------------------------------------------------------------------------------------------------------- DATE
  const dailyDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [averageRating, setAverageRating] = useState<number>(0);

  function roundToHalf(num: number): number {
    return Math.round(num * 2) / 2;
  }

  //? ------------------------------------------------------------------------------------------------------- Send form

  const handleSendForm = () => {
    const formValues = {
      ratings,
      comments,
      yesNoAnswers,
    };
    console.log("formValues", formValues);
    alert("Fonctionnalité en construction");
  };


  return (
    <div className="h-screen w-10/10  flex flex-col justify-evenly gap-4 p-4 bg-white">
      {/* ------------------------------------------------------------------------------ HEADER ------------------------------------------------------------------------------------------ */}

      <header className="w-full min-h-2/10 flex flex-row items-center justify-between p-4 gap-2 text-xs sm:text-sm md:text-base lg:text-lg">
        <div className="w-4.5/10  items-center justify-center flex flex-row">
          <img className="" src={sliLogo} alt="logoSLI" />
        </div>
        <div className="flex flex-col w-4.5/10">
          <div className="border-1 border-black rounded-xl shadow-md p-5 bg-white ">
            {client && (
              <div className=" ">
                <div className="flex w-full justify-between">
                <div>{client.Accounts_Account}</div>
                <p>
                  {client.MainInvoicingContact_Cellphone}{" "}
                  {client.MainInvoicingContact_Phone}
                </p>
                </div>
                <p>
                  {client.MainDeliveryAddress_Address1}{" "}
                  {client.MainDeliveryAddress_Address2}
                </p>
                <p>
                  {client.MainDeliveryAddress_Address3}{" "}
                  {client.MainDeliveryAddress_Address4}
                </p>
                <p>
                  {client.MainDeliveryAddress_City}{" "}
                  {client.MainDeliveryAddress_Zipcode}
                </p>
              </div>
            )}
          </div>
          <div className="w-10/10 max-w-4xl flex flex-col text-sm gap-1 sm:flex-row justify-between px-2 mt-4">
            <p className="flex flex-row gap-2">
              <span className="hidden md:flex">Commercial : </span>
              {commercial?.prenom} {commercial?.nom}
            </p>
            <p className="tracking-wide lg:tracking-widest">
              {commercial?.telephone}
            </p>
          </div>
          <div className="text-sm px-2">Fait le : {dailyDate}</div>
        </div>
      </header>

      {/* --------------------------------------------------------------------- MAIN CONTENT ------------------------------------------------------------------------------------ */}
      <main className="w-full h- flex flex-col gap-8 text-sm sm:text-lg">
        <div className="">
          <h2 className="bg-blue-500 text-white p-2 text-center tracking-max font-bold">
            ÉTUDE DE SATISFACTION CLIENT
          </h2>
          <div className="flex flex-col gap-4 pt-8">
            <p>Bonjour Madame, Monsieur</p>
            <p>
              Votre avis sur la réalisation de votre projet informatique nous
              est très utile afin d'optimiser le suivi de votre dossier et
              d'améliorer nos services. Nous vous demandons de bien vouloir
              remplir l'étude de satisfaction ci-dessous.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------------- 1ere Phase -------------------------------------------------------------------------------------- */}
        <div className="flex flex-col h-full gap-8">
          <h2 className="bg-blue-500 text-white p-2 text-center font-bold">
            1ère PHASE: QUALIFICATION DE VOS BESOINS ET PROPOSITION D'UNE
            SOLUTION
          </h2>
          <div>
            <div className="flex flex-col gap-6 w-full items-center justify-center">
              <QuestionsStars
                question="1- Compréhension de vos besoins par notre service commercial ?"
                onRatingChange={(rating) => handleRatingChange("1-1", rating)}
              />
              <QuestionsStars
                question="2- Solution proposée et clarté des explications ?"
                onRatingChange={(rating) => handleRatingChange("1-2", rating)}
              />
              <TextArea
                label="Commentaire général sur le service commercial"
                value={comments["1-8"] || ""}
                onChange={(value) => handleCommentChange("1-3", value)}
              />
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------- 2eme Phase -------------------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-8">
          <h2 className="bg-blue-500 text-white p-2 text-center font-bold">
            2ème PHASE: INFORMATIONS SUR LE SUIVI DE LA LIVRAISON
          </h2>
          <div>
            <div className="flex flex-col gap-6 w-full items-center justify-center">
              <QuestionsStars
                question="1- Délai du traitement de la demande ?"
                onRatingChange={(rating) => handleRatingChange("2-1", rating)}
              />
              <QuestionsStars
                question="2- Qualité des renseingements communiqués lors de la prise de rendez-vous ?"
                onRatingChange={(rating) => handleRatingChange("2-2", rating)}
              />
              <TextArea
                label="Autres remarques sur le suivi de la livraison"
                value={comments["2-3"] || ""}
                onChange={(value) => handleCommentChange("2-3", value)}
              />
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------- 3eme Phase -------------------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-8">
          <h2 className="bg-blue-500 text-white p-2 text-center font-bold">
            3ème PHASE: INSTALLATION DE LA SOLUTION
          </h2>
          <div>
            <div className="flex flex-col gap-6 w-full items-center justify-center">
              <QuestionsStars
                question="1- Satisfaction sur le délai de livraison ?"
                onRatingChange={(rating) => handleRatingChange("3-1", rating)}
              />
              <QuestionsStars
                question="2- Satisfaction sur la qualité de l'installation ?"
                onRatingChange={(rating) => handleRatingChange("3-2", rating)}
              />
              <YesNoQuestion
                question="L'installation est-elle terminée ?"
                value={yesNoAnswers["3-3"] || ""}
                onChange={(value) => handleYesNoChange("3-3", value)}
              />
              <TextArea
                label="Autres remarques"
                value={comments["3-4"] || ""}
                onChange={(value) => handleCommentChange("3-4", value)}
              />
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------- 4eme Phase -------------------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-8">
          <h2 className="bg-blue-500 text-white p-2 text-center font-bold">
            4ème PHASE: FINALITE
          </h2>
          <div>
            <div className="flex flex-col gap-6 w-full items-center justify-center">
              <QuestionsStars
                question="1- D'une manière générale, êtes-vous satisfait: ?"
                onRatingChange={(rating) => handleRatingChange("4-1", rating)}
              />
              <QuestionsStars
                question="2- D'une manière générale, solution logique a répondu a vos attentes ?"
                onRatingChange={(rating) => handleRatingChange("4-2", rating)}
              />
              <YesNoQuestion
                question="L'installation est-elle terminée ?"
                value={yesNoAnswers["4-3"] || ""}
                onChange={(value) => handleYesNoChange("4-3", value)}
              />
              <YesNoQuestion
                question="Recommanderiez-vous solution logique auprès de vos connaissances ?"
                value={yesNoAnswers["4-5"] || ""}
                onChange={(value) => handleYesNoChange("4-5", value)}
              />
              <TextArea
                label="Quelles sont vos suggestions pour les améliorations a apporter ?"
                value={comments["4-4"] || ""}
                onChange={(value) => handleCommentChange("4-4", value)}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- CONCLUSION -------------------------------------------------------------------------------------- */}
        <div className="w-9/10 flex flex-row gap-3 justify-end pt-5 text-blue-700 text-xl font-bold">
          <p>Note moyenne : </p>
          {averageRating && (
            <p className="tracking-widest">{averageRating}/20</p>
          )}
        </div>
      </main>
      {/* -------------------------------------------------------------------- SEND FORM -------------------------------------------------------------------------------------- */}
      <footer className="w-full  flex flex-col gap-4 ">
        <button
          className="bg-blue-600 text-white p-2 text-center font-bold mb-2 rounded-xl hover:bg-blue-700"
          onClick={handleSendForm}
        >
          Envoyer
        </button>
      </footer>
    </div>
  );
}

export default Form;
