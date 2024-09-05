import { useEffect, useState } from "react";
import BottomNav from "../../components/nav/navBar/BottomNav";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import Select from "react-select"; // Import de react-select
import Icon from "../../components/SVG/Icon";
//import url from "../../utils/url";
import jsPDF from "jspdf";
import {
  fetchItems,
  fetchCustomersPaginated,
} from "../../utils/function/function";
//import { emailRegex } from "../../utils/regex/regex";

type DevisLineField = "article" | "quantity" | "price";

type OptionType = {
  value: string;
  label: string;
  price?: number;
  email?: string;
};

type SingleValue<T> = T | null;

type DevisLine = {
  article: string;
  quantity: number;
  price: number;
};

type FormDevisData = {
  date: Date;
  email: string;
  total: number;
  commercial: string;
  client: string;
  devisLines: DevisLine[];
  clientAddress: string;
  clientAddress2: string;
};

function DevisPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);
  const { customers } = useAppSelector((state) => state.customers);
  const [offset] = useState(0);
  const [limit] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientSearchQuery, setClientSearchQuery] = useState("");

  const [formDevisData, setFormDevisData] = useState({
    date: new Date(),
    email: "",
    commercial: "",
    clientAddress: "adresse inconnue",
    clientAddress2: " ",
    client: "",
    total: 0,
    devisLines: [
      {
        article: "",
        quantity: 0,
        price: 0,
      },
    ],
  });

  const formatDate = (date: Date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const date = new Date();
  const formattedDate = formatDate(date);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  formDevisData.commercial = `${user.nom} ${user.prenom}`;
  //* -------------------------------------------------------------------------- USEEFFECT FETCH------------------------------------------------------------------------------------

  useEffect(() => {
    fetchItems(dispatch, limit, offset, searchQuery);
  }, [dispatch, limit, offset, searchQuery]);

  useEffect(() => {
    fetchCustomersPaginated(dispatch, limit, offset, clientSearchQuery);
  }, [dispatch, limit, offset, clientSearchQuery]);

  //* --------------------------------------------------------------------------- GESTION ETAT -------------------------------------------------------------------------------------

  const handleLineChange = (
    option: SingleValue<OptionType>,
    index: number,
    field: DevisLineField
  ) => {
    setFormDevisData((prevState: FormDevisData) => {
      const newData = { ...prevState };
      if (option === null) {
        newData.devisLines[index].article = "";
        newData.devisLines[index].price = 0;
      } else {
        if (field === "article") {
          newData.devisLines[index][field] = option.label || "";
          newData.devisLines[index].price = option.price || 0;
        } else {
          newData.devisLines[index][field] = Number(option.value);
        }
      }
      return newData;
    });
  };

  const handleNumericChange = (
    value: string,
    index: number,
    field: "quantity" | "price"
  ) => {
    setFormDevisData((prevState: FormDevisData) => {
      const newData = { ...prevState };
      newData.devisLines[index][field] = Number(value);
      return newData;
    });
  };

  const addDevisLine = () => {
    const newLine = { article: "", quantity: 0, price: 0 };
    setFormDevisData((prev) => ({
      ...prev,
      devisLines: [...prev.devisLines, newLine],
    }));
  };

  const removeDevisLine = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newLines = [...formDevisData.devisLines];
    newLines.splice(index, 1);
    setFormDevisData({
      ...formDevisData,
      devisLines: newLines,
    });
  };

  // Mapping des articles aux options de react-select
  const options = items.map((item) => ({
    value: item.Id,
    label: item.Caption,
    price: item.SalePriceVatIncluded,
  }));

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------

  //*------------------------------------------------------------------------ Calcul du total
  const calculateTotal = (devisLines: DevisLine[]) => {
    const total = devisLines.reduce((total, line) => {
      return total + line.quantity * line.price;
    }, 0);
    return parseFloat(total.toFixed(2));
  };

  // Utilisation de calculateTotal dans votre composant pour afficher le total
  const total = calculateTotal(formDevisData.devisLines);
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleOption = () => {
    //setShowSendOptions(!showSendOptions);
    console.log("handleOption");
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  const clientOptions: CustomerOption[] = customers.map((customer) => ({
    value: customer.Id ? parseInt(customer.Id) : 0, // Convertissez la valeur de l'ID du client en nombre
    label: `${customer.Name} `,
    email: customer.MainInvoicingContact_Email || "", // Assurez-vous de traiter les valeurs null ou undefined
    address: `${customer.MainDeliveryAddress_Address1}`,
    address2: ` ${customer.MainDeliveryAddress_Zipcode} ${customer.MainDeliveryAddress_City}`,
  }));

  interface CustomerOption {
    value: number;
    label: string;
    email: string;
    address: string;
    address2: string;
  }

  const buildAddress = (address: string | null, address2: string | null) => {
    const effectiveAddress = address || "adresse inconnue";
    const effectiveAddress2 = address2 || " ";

    setFormDevisData((prevState) => ({
      ...prevState,
      clientAddress: effectiveAddress,
      clientAddress2: effectiveAddress2,
    }));
  };

  const handleClientSelectChange = (
    newValue: SingleValue<CustomerOption> | null
  ) => {
    if (newValue) {
      const { label, email, address, address2 } = newValue;

      const updatedAddress = address === "null" ? null : address;
      const updatedAddress2 = address2 === " null null" ? null : address2;

      buildAddress(updatedAddress, updatedAddress2);

      setFormDevisData((prevState) => ({
        ...prevState,
        client: label || "",
        email: email || "",
      }));
    } else {
      setFormDevisData((prevState) => ({
        ...prevState,
        client: "",
        email: "",
        clientAddress: "adresse inconnue",
        clientAddress2: " ",
      }));
    }
  };

  // *-------------------------------------------------------------------------- HANDLE PDF -----------------------------------------------------------------------------------------------
  const imgData =
    "data:image/png;base64,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";

  const savePDF = (e: React.MouseEvent) => {
    e.preventDefault();
    const doc = new jsPDF();
    let startY = 20; // Position verticale initiale pour commencer le contenu
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    // Fonction pour ajouter une nouvelle page si nécessaire et réinitialiser startY
    const addNewPageIfNeeded = (lineHeight: number) => {
      if (startY + lineHeight > pageHeight - 20) {
        doc.addPage();
        startY = 20; // Réinitialiser la position verticale pour la nouvelle page
      }
      return startY; // Retourner la position y mise à jour
    };

    //*--------------------------------------------------------------------------------- Configuration de l'en-tête
    startY = addNewPageIfNeeded(60); // Hauteur prévue pour l'en-tête

    doc.setFillColor(70, 130, 180); // Couleur bleu-400
    doc.rect(0, 0, pageWidth, pageHeight * 0.2, "F"); // Bandeau sur 20% de la hauteur

    const logoHeight = pageHeight * 0.13;
    const logoWidth = logoHeight * 1.41;
    const logoX = 10;
    const logoY = (pageHeight * 0.2 - logoHeight) / 2;

    doc.setFillColor(70, 130, 180);
    doc.roundedRect(logoX, logoY, logoWidth, logoHeight, 10, 10, "F");
    doc.addImage(imgData, "JPEG", logoX, logoY, logoWidth, logoHeight);

    doc.setFontSize(15);
    doc.setTextColor(255);
    doc.text(`Devis N°1`, pageWidth - 10, pageHeight * 0.1, { align: "right" });

    const emissionDate = new Date();
    const echeanceDate = new Date(
      emissionDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );
    doc.setFontSize(12);
    doc.text(
      `Date d'émission: ${emissionDate.toLocaleDateString()}`,
      pageWidth - 10,
      pageHeight * 0.125,
      { align: "right" }
    );
    doc.text(
      `Date d'échéance: ${echeanceDate.toLocaleDateString()}`,
      pageWidth - 10,
      pageHeight * 0.15,
      { align: "right" }
    );

    //*------------------------------------------------------------------------------------------ Informations client et commercial
    startY = addNewPageIfNeeded(80); // Hauteur prévue pour cette section

    const gapHeight = pageHeight * 0.05;
    const headerEndY = pageHeight * 0.2;
    const padding = 5;
    const lineHeight = 6;

    // Informations commerciales à gauche
    const commercialInfoX = 20;
    const commercialInfoY = headerEndY + gapHeight + padding;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12); // Smaller font if you need more space
    const commercialText = `Commercial: ${formDevisData.commercial}`;
    doc.text(commercialText, commercialInfoX, commercialInfoY);

    // Informations client à droite
    const clientInfoStartY = commercialInfoY; // Aligner verticalement avec les informations commerciales
    const clientInfoHeight = lineHeight * 3 + padding * 2;
    const clientTextWidth = Math.max(
      doc.getTextWidth(`Client: ${formDevisData.client}`),
      doc.getTextWidth(formDevisData.clientAddress),
      doc.getTextWidth(formDevisData.clientAddress2)
    );
    const clientInfoWidth = clientTextWidth + padding * 2;

    const clientInfoX = pageWidth - clientInfoWidth - 20; // Adjusted for better alignment

    // Ensure there is a gap between client and commercial infos
    doc.setFontSize(12); // Smaller font if you need more space
    doc.text(
      `Commercial: ${formDevisData.commercial}`,
      commercialInfoX,
      commercialInfoY,
      { maxWidth: clientInfoX - commercialInfoX - padding } // Ensure the text is wrapped if too long
    );

    doc.setDrawColor(0);
    doc.rect(clientInfoX, clientInfoStartY, clientInfoWidth, clientInfoHeight);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Client: ${formDevisData.client}`,
      clientInfoX + padding,
      clientInfoStartY + lineHeight
    );
    doc.setFont("helvetica", "normal");
    doc.text(
      formDevisData.clientAddress,
      clientInfoX + padding,
      clientInfoStartY + lineHeight * 2
    );
    doc.text(
      formDevisData.clientAddress2,
      clientInfoX + padding,
      clientInfoStartY + lineHeight * 3
    );

    // Mise à jour de startY pour le début du tableau
    // Calculate the space above the header (this is the space you want to match below the client info)
    const headerTopMargin = logoY;

    // Set startY to be after the client info, with an additional space equivalent to headerTopMargin
    startY = clientInfoStartY + clientInfoHeight + headerTopMargin;
    //*------------------------------------------------------------------------------------------- Entete tableau de devis
    startY = addNewPageIfNeeded(15); // Hauteur prévue pour l'en-tête du tableau

    const cellHeight = 10;

    startY = addNewPageIfNeeded(20); // Allow space for the table header

    // Set the fill color for the header background
    doc.setFillColor(70, 130, 180);
    // Set the text color for header text to white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    // Define column widths
    const totalTableWidth = pageWidth - 20; // Assuming a 10 unit margin on both sides
    const articleColumnWidth = totalTableWidth * 0.7;
    const quantityColumnWidth = totalTableWidth * 0.15;
    const priceColumnWidth = totalTableWidth * 0.15;

    // Calculate the starting X position for the table to center it
    const tableStartX = (pageWidth - totalTableWidth) / 2;

    // Set the fill color for the header background
    doc.setFillColor(70, 130, 180);
    // Set white color for header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    // Draw the headers
    doc.rect(tableStartX, startY, articleColumnWidth, cellHeight, "F");
    doc.rect(
      tableStartX + articleColumnWidth,
      startY,
      quantityColumnWidth,
      cellHeight,
      "F"
    );
    doc.rect(
      tableStartX + articleColumnWidth + quantityColumnWidth,
      startY,
      priceColumnWidth,
      cellHeight,
      "F"
    );

    // Text for headers
    doc.text("Article", tableStartX + 5, startY + cellHeight / 2 + 3);
    doc.text(
      "Quantité",
      tableStartX + articleColumnWidth + quantityColumnWidth / 2,
      startY + cellHeight / 2 + 3,
      { align: "center" }
    );
    doc.text(
      "Prix Unitaire",
      tableStartX +
        articleColumnWidth +
        quantityColumnWidth +
        priceColumnWidth / 2,
      startY + cellHeight / 2 + 3,
      { align: "center" }
    );

    startY += cellHeight; // Move to the start of the table content

    // Reset text color to black for table content
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    //*-------------------------------------------------------------------------------------- Start of table content
    formDevisData.devisLines.forEach((line) => {
      startY = addNewPageIfNeeded(cellHeight);

      // Cell border and content for article column
      doc.rect(tableStartX, startY, articleColumnWidth, cellHeight);
      doc.text(line.article, tableStartX + 5, startY + cellHeight / 2 + 3);

      // Cell border and content for quantity column
      doc.rect(
        tableStartX + articleColumnWidth,
        startY,
        quantityColumnWidth,
        cellHeight
      );
      doc.text(
        line.quantity.toString(),
        tableStartX + articleColumnWidth + quantityColumnWidth / 2,
        startY + cellHeight / 2 + 3,
        { align: "center" }
      );

      // Cell border and content for price column
      doc.rect(
        tableStartX + articleColumnWidth + quantityColumnWidth,
        startY,
        priceColumnWidth,
        cellHeight
      );
      doc.text(
        `${line.price}€`,
        tableStartX +
          articleColumnWidth +
          quantityColumnWidth +
          priceColumnWidth / 2,
        startY + cellHeight / 2 + 3,
        { align: "center" }
      );

      startY += cellHeight;
    });

    // Total
    startY = addNewPageIfNeeded(30);
    doc.setFontSize(14);
    doc.text(`Total TTC: ${total}€`, pageWidth - 60, startY + 20);

    //*-------------------------------------------------------------------------------------- Footer
    const footerText = "Merci d'avoir choisi solution logique. blablabla";
    startY = addNewPageIfNeeded(20);
    doc.setFontSize(12);
    const footerTextWidth = doc.getTextWidth(footerText);
    const footerX = (pageWidth - footerTextWidth) / 2;
    doc.text(footerText, footerX, pageHeight - 10);

    //*-------------------------------------------------------------------------------- Sauvegarde du PDF
    doc.save("devis.pdf");
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  /*
  const generatePDF = (e: React.MouseEvent) => {
    e.preventDefault();

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    //*--------------------------------------------------------------------------------- Configuration de l'en-tête
    doc.setFillColor(70, 130, 180); // Couleur bleu-400
    doc.rect(0, 0, pageWidth, pageHeight * 0.2, "F"); // Bandeau sur 20% de la hauteur

    // Préparer le rectangle arrondi pour le logo
    const logoHeight = pageHeight * 0.13; // Hauteur du logo
    const logoWidth = logoHeight * 1.41; // Largeur du logo
    const logoX = 10; // Position X de l'image
    const logoY = (pageHeight * 0.2 - logoHeight) / 2; // Position Y centrée dans l'en-tête

    // Dessiner un rectangle arrondi sous l'image pour simuler les coins arrondis du logo
    doc.setFillColor(70, 130, 180); // La même couleur que l'en-tête
    doc.roundedRect(logoX, logoY, logoWidth, logoHeight, 10, 10, "F");

    // Dessiner l'image du logo
    doc.addImage(imgData, "JPEG", logoX, logoY, logoWidth, logoHeight);

    // Numéro de devis à droite
    doc.setFontSize(15);
    doc.setTextColor(255);
    doc.text(`Devis N°1`, pageWidth - 10, pageHeight * 0.1, { align: "right" });

    // Dates d'émission et d'échéance
    const emissionDate = new Date();
    const echeanceDate = new Date(
      emissionDate.getTime() + 30 * 24 * 60 * 60 * 1000
    ); // +30 jours
    doc.setFontSize(12);
    doc.text(
      `Date d'émission: ${emissionDate.toLocaleDateString()}`,
      pageWidth - 10,
      pageHeight * 0.125,
      { align: "right" }
    );
    doc.text(
      `Date d'échéance: ${echeanceDate.toLocaleDateString()}`,
      pageWidth - 10,
      pageHeight * 0.15,
      { align: "right" }
    );

    //*------------------------------------------------------------------------------------------ Informations client et commercial
    const gapHeight = pageHeight * 0.05;
    const headerEndY = pageHeight * 0.2;
    const padding = 5; // Marge intérieure réduite autour du texte
    const lineHeight = 6; // Hauteur de ligne pour le texte réduite

    // Informations client
    const clientInfoStartY = headerEndY + gapHeight + padding; // Déplacement vers le haut pour l'alignement horizontal
    const clientInfoHeight = lineHeight * 3 + padding * 2; // Hauteur du cadre client
    // Calculer la largeur et la position de départ X pour le cadre client
    const clientTextWidth = Math.max(
      doc.getTextWidth(`Client: ${formDevisData.client}`),
      doc.getTextWidth(formDevisData.clientAddress),
      doc.getTextWidth(formDevisData.clientAddress2)
    );
    const clientInfoWidth = clientTextWidth + padding * 2;
    const clientInfoX = pageWidth - clientInfoWidth - padding; // Aligné à droite avec le padding

    // Dessiner le cadre pour les informations du client
    doc.setDrawColor(0); // Couleur noire pour le cadre
    doc.rect(clientInfoX, clientInfoStartY, clientInfoWidth, clientInfoHeight);

    // Texte pour le client
    doc.setTextColor(0, 0, 0); // Couleur noire pour le texte
    doc.setFont("helvetica", "bold");
    doc.text(
      `Client: ${formDevisData.client}`,
      clientInfoX + padding,
      clientInfoStartY + lineHeight
    );
    doc.setFont("helvetica", "normal");
    doc.text(
      formDevisData.clientAddress,
      clientInfoX + padding,
      clientInfoStartY + lineHeight * 2
    );
    doc.text(
      formDevisData.clientAddress2,
      clientInfoX + padding,
      clientInfoStartY + lineHeight * 3
    );

    // Calculer la position X pour le texte du commercial (aligné à gauche avec le padding)
    const commercialInfoX = 10; // Bordure gauche du tableau
    // Position Y alignée avec la première ligne du cadre client
    const commercialInfoY = clientInfoStartY + lineHeight;
    // Texte du commercial
    doc.setFont("helvetica", "normal");
    doc.text(
      `Commercial: ${formDevisData.commercial}`,
      commercialInfoX,
      commercialInfoY
    );

    //*------------------------------------------------------------------------------------------- Entete tableau de devis

    let startY = headerEndY + gapHeight * 2 + pageHeight * 0.1 + 20; // Décalage vers le bas
    const cellHeight = 10;

    // Définir les couleurs pour l'en-tête du tableau
    doc.setFillColor(70, 130, 180); // Couleur de fond bleu-400
    doc.setTextColor(255, 255, 255); // Couleur de texte blanc

    // Position de l'en-tête du tableau
    const headerStartY = startY - cellHeight; // Commencer au-dessus de la première ligne du tableau
    const headerWidth = pageWidth - 20; // La largeur de l'en-tête correspond à celle du tableau

    // Dessiner l'en-tête du tableau
    doc.rect(10, headerStartY, headerWidth, cellHeight, "F");

    // Texte de l'en-tête du tableau
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    // Texte pour la colonne "Article x Quantité"
    const textArticleXQuantity = "Article x Quantité";
    doc.text(textArticleXQuantity, 12, headerStartY + cellHeight - 3);

    // Texte pour la colonne "PU TTC"
    const textPUHT = "PU TTC";
    const textPUHTWidth = doc.getTextWidth(textPUHT);
    doc.text(
      textPUHT,
      pageWidth - 12 - textPUHTWidth,
      headerStartY + cellHeight - 3
    );

    // Réinitialiser la couleur pour le texte suivant
    doc.setTextColor(0, 0, 0); // Couleur de texte noire pour les lignes suivantes
    //*-------------------------------------------------------------------------------------- Début des lignes de devis
    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);
    formDevisData.devisLines.forEach((line) => {
      doc.rect(10, startY, pageWidth - 20, cellHeight);
      const articleTitle = `${line.article}`;
      const quantity = `x ${line.quantity}`;
      const articlePrice = `${line.price}€`;
      doc.setTextColor(0);
      doc.text(articleTitle, 12, startY + cellHeight - 3);
      doc.setTextColor(0, 128, 0); // Vert pour la quantité
      doc.text(
        quantity,
        doc.getTextWidth(articleTitle) + 15,
        startY + cellHeight - 3
      );
      doc.setTextColor(0);
      doc.text(articlePrice, pageWidth - 12, startY + cellHeight - 3, {
        align: "right",
      });
      startY += cellHeight;
    });

    // Total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total TTC: ${total}€`, pageWidth - 60, startY + 20);
    doc.setFont("helvetica", "normal");

    //*-------------------------------------------------------------------------------------- Footer
    doc.setFontSize(12);
    const footerText =
      "Solution Logique Informatique, 475 Route des Vernes, 74370 Annecy, 04 50 64 02 33";
    const footerTextWidth = doc.getTextWidth(footerText);
    const footerX = (pageWidth - footerTextWidth) / 2; // Centrage horizontal pour le texte

    // Dessiner le texte du footer centré
    doc.text(footerText, footerX, pageHeight - 10);
    // Return a Blob containing the PDF
    return doc.output("blob");
  };
*/
  /*
  const handleSendMail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Vérifier si l'email est valide
    if (!emailRegex(formDevisData.email)) {
      alert("Veuillez entrer un email valide.");
      return;
    }

    const pdfBlob = generatePDF(e);
    const formData = new FormData();
    formData.append("file", pdfBlob, "devis.pdf");
    formData.append("email", formDevisData.email);

    try {
      const response = await fetch(`${url.main}/sendpdf`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Email sent successfully", result);
        alert("Le devis a été envoyé par e-mail avec succès.");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error: Error | unknown) {
      console.error("Error sending email:", error);
      alert("Erreur lors de l'envoi de l'email : " + (error as Error).message);
    }
  };
*/
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  // *----------------------------------------------------------------------------- RENDER -------------------------------------------------------------------------------
  return (
    <div className="h-9.5/10 w-screen flex flex-col items-center justify-start bg-gray-light2">
      <form
        action=""
        className="font-merriweather text-gray-700 h-10/10 w-10/10 flex flex-col items-center justify-start bg-white-perso2 p-2"
      >
        {/*---------------------------------------------ENTETE----------------------------------------------*/}
        <div className="w-full border-b-2 pb-4 border-blue-perso flex flex-col gap-4 text-xs resw400:text-sm ">
          <div className="w-full flex">
            <Select
              options={clientOptions}
              onChange={(newValue) => handleClientSelectChange(newValue)}
              value={clientOptions.find(
                (option) => option.label === formDevisData.client
              )}
              placeholder="Sélectionner un client"
              className="w-full h-full text-center text-xs resw400:text-sm"
              onInputChange={(inputValue) => setClientSearchQuery(inputValue)}
            />
          </div>

          <div className="w-full">
            <input
              type="email"
              value={formDevisData.email}
              onChange={(e) =>
                setFormDevisData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              placeholder="Email"
              className="w-full h-full text-center text-xs resw400:text-sm"
            />
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <h3>Commercial :</h3>
              <div>
                {user.nom} {user.prenom}
              </div>
            </div>
            <div className="font-semibold">{formattedDate}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1 h-6.5/10 w-full overflow-auto items-center justify-start border-b-2 mt-8 border-blue-perso">
          {/*---------------------------------------------DevisLine----------------------------------------------*/}
          {formDevisData.devisLines.map((line, index) => (
            <div
              key={index}
              className="text-sm flex w-full justify-between items-center relative"
            >
              {/*---------------------------------------------Item----------------------------------------------*/}
              <div className="w-full">
                <Select
                  options={options}
                  onChange={(option) =>
                    handleLineChange(option, index, "article")
                  }
                  value={options.find(
                    (option) =>
                      option.value === formDevisData.devisLines[index].article
                  )}
                  placeholder="Sélectionner un article"
                  className="w-full h-full text-center text-xs resw400:text-sm"
                  classNamePrefix="select"
                  isSearchable={true}
                  onInputChange={(inputValue) => setSearchQuery(inputValue)}
                />
              </div>
              {/*---------------------------------------------Detail----------------------------------------------*/}
              <div className="w-4/10 flex h-full ">
                <input
                  type="number"
                  value={line.quantity ? line.quantity.toString() : ""}
                  onChange={(e) =>
                    handleNumericChange(e.target.value, index, "quantity")
                  }
                  placeholder="Qte"
                  className="border h-full w-8/10 text-xs text-center"
                />
                <input
                  type="number"
                  value={line.price ? line.price.toString() : ""}
                  onChange={(e) =>
                    handleNumericChange(e.target.value, index, "price")
                  }
                  placeholder="Prix"
                  className="border p-2 h-full text-xs text-center flex overflow-x-auto"
                />
                <Icon
                  type="close"
                  theme=""
                  onClick={(event: React.MouseEvent<Element, MouseEvent>) =>
                    removeDevisLine(index, event)
                  }
                  className=" text-lg flex items-center justify-center h-full text-red-600"
                />
              </div>
            </div>
          ))}
        </div>
        {/*---------------------------------------------AddLine----------------------------------------------*/}
        <div className="w-full flex justify-end pt-3 absolute right-2 bottom-2/10">
          <Icon
            type="Add"
            theme="white"
            onClick={addDevisLine}
            className="px-2 py-2 text-white-perso bg-blue-500 rounded-full "
          ></Icon>
        </div>
        <div className="w-full justify-between lg:justify-end flex font-Poppins font-semi-bold p-2">
          <h3>Total : </h3>
          <div>{total}</div>
        </div>
        {/*---------------------------------------------Option Menu----------------------------------------------*/}
        <div className="w-10/10 flex justify-evenly bg-white border border-gray-600 p-1 rounded-2xl">
          <div className="flex items-center gap-1">
            <p>Email</p>
            <Icon
              type="Send"
              theme=""
              className="text-xl text-blue-800 "
              onClick={handleOption}
            />
          </div>
          <div className="flex items-center gap-1">
            <p>Enregistrer</p>
            <Icon
              type="Save"
              theme=""
              className="text-2xl text-green-800 "
              onClick={(e) => savePDF(e)}
            />
          </div>
        </div>
      </form>
      <BottomNav title="Devis" css="" />
    </div>
  );
}

export default DevisPage;
