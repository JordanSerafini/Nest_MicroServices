import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import sliLogo from "../../assets/sli-logo.png";

interface PdfGeneratorProps {
  data: string[];
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ data }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const generatePdf = () => {
    const element = elementRef.current;
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: "document.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { orientation: "portrait", unit: "in", format: "letter" },
        })
        .save();

      html2pdf()
        .from(element)
        .outputPdf("datauristring")
        .then((pdfUrl: string) => {
          setPreviewUrl(pdfUrl);
        });
    }
  };

  console.log(data);

  const currentDate = new Date();
  const validityEndDate = new Date(currentDate);
  validityEndDate.setMonth(validityEndDate.getMonth() + 1);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const devisLineData = [
    {
      articleName: "Isolation des combles",
      quantity: 1,
      puHt: 1000,
      puTtc: 1200,
      totalTtc: 1200,
      totalHt: 1000,
    },
    {
      articleName: "Isolation des murs",
      quantity: 1,
      puHt: 800,
      puTtc: 960,
      totalTtc: 960,
      totalHt: 800,
    },
    {
      articleName: "Isolation des sols",
      quantity: 1,
      puHt: 500,
      puTtc: 600,
      totalTtc: 600,
      totalHt: 500,
    },
    {
      articleName: "Isolation des fenêtres",
      quantity: 1,
      puHt: 300,
      puTtc: 360,
      totalTtc: 360,
      totalHt: 300,
    },
   
    {
      articleName: "Isolation des sols",
      quantity: 1,
      puHt: 500,
      puTtc: 600,
      totalTtc: 600,
      totalHt: 500,
    },
    {
      articleName: "Isolation des portes",
      quantity: 1,
      puHt: 200,
      puTtc: 240,
      totalTtc: 240,
      totalHt: 200,
    },
    {
      articleName: "Isolation des portes",
      quantity: 1,
      puHt: 200,
      puTtc: 240,
      totalTtc: 240,
      totalHt: 200,
    },
    {
      articleName: "Isolation des portes",
      quantity: 1,
      puHt: 200,
      puTtc: 240,
      totalTtc: 240,
      totalHt: 200,
    },

  ];

  return (
    <div className="flex flex-col">
      <div
        ref={elementRef}
        className="w-10/10 h-full flex flex-col items-center gap-8"
      >
        {/* -------------------------------------------------------------------------------------------------------------------------- 1ere partie: Entete ----------------------------------*/}
        <div className="flex justify-between items-center bg-gray-200 w-full p-4">
          {/* -------------------------------------------------------------------------------------------------------------------------- Logo de l'entreprise ----------------------------------*/}
          <div className="w-7/10 flex items-center justify-center">
            <img src={sliLogo} alt="Logo" className="rounded" />
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------------- Info devis ------------------------------------------ */}
          <div className="text-center flex flex-col w-3/10 items-start justify-center">
            <h1 className="w-full items-center font-bold">Devis n° 1</h1>
            <div className="flex flex-col w-full items-start">
              <p>Date d'émission : {formatDate(currentDate)}</p>
              <p>Date de fin de validité : {formatDate(validityEndDate)}</p>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------------------------------------------------------------------------------- 2eme partie Client / commercial ----------------------------------*/}
        <div className="flex justify-between items-center w-9.5/10 p-4 text-sm border border-black">
          {/* -------------------------------------------------------------------------------------------------------------------------- Commercial ----------------------------------*/}
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-center w-full border-b border-black pb-1 mb-2">
              Commercial
            </h2>
            <p>Jean Dupont</p>
            <p>01 02 03 04 05</p>
            <p>test@test.com</p>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------------- Adresse client ----------------------------------*/}
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-center w-full border-b border-black pb-1 mb-2">
              Client
            </h2>
            <p>ABC Isolation</p>
            <p>21, rue de la prairie</p>
            <p>75000 Paris</p>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------- 3eme partie - Tableau----------------------------------*/}
        <div className="flex w-9.5/10 flex-col  justify-evenly text-center">
          {/* -------------------------------------------------------------------------------------------------------------------------- Entete  ----------------------------------*/}
          <div className="flex justify-between w-full p-2 border border-black gap-2 font-bold">
            <p className="w-5/10 border-r border-black">Désignation</p>
            <p className="w-1/10 border-r border-black">Quantité</p>
            <p className="w-1/10 border-r border-black">Pu-HT</p>
            <p className="w-1/10 border-r border-black">Pu-TTC</p>
            <p className="w-1/10 border-r border-black">Total HT</p>
            <p className="w-1/10">Total TTC</p>
            {/* -------------------------------------------------------------------------------------------------------------------------- Lignes  ----------------------------------*/}
          </div>
          <div className="border border-black">
            {devisLineData.map((line, index) => (
              <div
                key={index}
                className={`flex justify-between w-full items-center p-2 border-black gap-2 ${
                  index !== devisLineData.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="w-5/10 border-r border-black text-start">
                  {line.articleName}
                </p>
                <p className="w-1/10 border-r border-black text-center">
                  {line.quantity}
                </p>
                <p className="w-1/10 border-r border-black text-center">
                  {line.puHt}
                </p>
                <p className="w-1/10 border-r border-black text-center">
                  {line.puTtc}
                </p>
                <p className="w-1/10 border-r border-black text-center">
                  {line.totalHt}
                </p>
                <p className="w-1/10 text-center">{line.totalTtc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------------------------------------------------------------------------------- Total ----------------------------------*/}
        <div className="w-9.5/10 flex flex-col items-end justify-end">
          <p className="text-center">
            Montant total HT:{" "}
            {devisLineData.reduce((acc, line) => acc + line.totalHt, 0)}
          </p>
          <p className="text-center">
            Montant total TTC:{" "}
            {devisLineData.reduce((acc, line) => acc + line.totalTtc, 0)}
          </p>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------- Footer ----------------------------------*/}
        <div>
          <p>
            Nous vous remercions d'avoir choisis solution logique Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quam nemo a labore,
            laudantium maiores dicta cupiditate voluptatibus pariatur excepturi
            veritatis, repellat officiis! Excepturi aspernatur earum repudiandae
            maiores unde omnis quae!
          </p>
        </div>
      </div>

      <button onClick={generatePdf}>Générer et Sauvegarder PDF</button>

      {previewUrl && (
        <div style={{}}>
          <h2>Aperçu du PDF</h2>
          <iframe src={previewUrl} width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
