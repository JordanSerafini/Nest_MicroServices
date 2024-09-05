import { useState } from "react";
import url from "../../utils/url";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "black",
  "white",
  "gray",
  "brown",
];

const OptionModal = ({
  cardId,
  initialData,
  onUpdate,
  setShowOptionModal,
}: {
  cardId: any;
  initialData: any;
  onUpdate: any;
  setShowOptionModal: any;
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [logo, setLogo] = useState(initialData.logo || "");
  const [color, setColor] = useState(initialData.color || "white");
  const [isborder, setIsborder] = useState(initialData.isborder || false);
  const [isshadow, setIsshadow] = useState(initialData.isshadow || false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const fields = { title, logo, color, isborder, isshadow };
    await updateCard(cardId, fields);
    onUpdate();
  };

  const updateCard = async (
    cardId: any,
    fields: { title: any; logo: any; color: any; isborder: any; isshadow: any }
  ) => {
    const response = await fetch(`${url.main}/updateCard/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (response.ok) {
      const updatedCard = await response.json();
      console.log(updatedCard);
      window.location.reload();
    } else {
      console.error("Error while updating the card");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-gray-800 bg-opacity-50 text-xs">
      <div className="bg-white rounded-lg shadow-lg p-3 w-9/10 lg:w-8/10 h-8/10 lg:h-8/10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full justify-between"
        >
          {/*--------------------------------------------------------------------------------------- Hors Btn -------------------------------------------------------------------------------------------*/}
          <div className="flex flex-col h-9/10 justify-evenly">
            {/*--------------------------------------------------------------------------------------- Titre -------------------------------------------------------------------------------------------*/}
            <div className="flex flex-col gap-6">
              <div>
                <label className="">Titre:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input w-full p-2 border rounded"
                />
              </div>
              {/*--------------------------------------------------------------------------------------- Logo -------------------------------------------------------------------------------------------*/}
              <div>
                <label className="">Logo:</label>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="input w-full p-2 border rounded"
                />
              </div>
              {/*--------------------------------------------------------------------------------------- Color -------------------------------------------------------------------------------------------*/}
              <div className="flex flex-col w-full items-center">
                <label className="">Color:</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="input w-full p-2 border rounded"
                >
                  {colors.map((colorName) => (
                    <option key={colorName} value={colorName}>
                      {colorName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-full justify-evenly">
              {/*--------------------------------------------------------------------------------------- Border -------------------------------------------------------------------------------------------*/}
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={isborder}
                  onChange={(e) => setIsborder(e.target.checked)}
                  className=""
                />
                Border
              </div>
              {/*--------------------------------------------------------------------------------------- Shadow -------------------------------------------------------------------------------------------*/}
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={isshadow}
                  onChange={(e) => setIsshadow(e.target.checked)}
                  className=""
                />
                Shadow
              </div>
            </div>
          </div>
          {/*--------------------------------------------------------------------------------------- Buttons -------------------------------------------------------------------------------------------*/}
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="btn btn-secondary p-0 bg-red-600 rounded w-full py-2 text-white tracking-widest font-bold"
              onClick={() => setShowOptionModal(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary p-0 bg-blue-500 w-full py-2 text-white rounded tracking-widest font-bold"
            >
              Update Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OptionModal;
