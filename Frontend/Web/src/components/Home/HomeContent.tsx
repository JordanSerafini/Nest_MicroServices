import { useEffect, useState } from "react";
import { To, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, createTransition } from "react-dnd-multi-backend";
import Cards from "../Cards/Cards";
import Homecards from "../../types/homecard";
import { fetchCards } from "../../utils/function/function";
import Loader from "../loader/Loader";

function HomeContent() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Homecards[]>([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dragEnabled, setDragEnabled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userID = user.id;

  useEffect(() => {
    fetchCards(userID, (fetchedCards) => {
      const sortedCards = fetchedCards.sort((a, b) => a.position - b.position);
      setCards(sortedCards);
      setLoading(false);
    });
    setReload(false);
  }, [userID, reload]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    if (!dragEnabled) return;

    const dragCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setCards(newCards);

    fetch("https://sli-back-964256b21f2d.herokuapp.com/updateCardPosition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cards: newCards.map((card, index) => ({
          id: card.id,
          position: index,
        })),
      }),
    });
  };

  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
        id: "html5",
      },
      {
        backend: TouchBackend,
        preview: true,
        id: "touch",
        transition: createTransition("touchstart", (event) => {
          return !!(event as TouchEvent).targetTouches;
        }),
      },
    ],
  };

  const handleNavigate = (link: To) => {
    navigate(link);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="h-full w-full overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-row flex-wrap h-full gap-x-2 gap-y-1 justify-center items-start font-Poppins text-center font-extralight overflow-y-auto p-4">
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <Cards
                    key={card.id}
                    index={index}
                    id={parseInt(card.id)}
                    title={card.title}
                    type={card.logo}
                    theme={card.color || ""}
                    moveCard={moveCard}
                    setCards={setCards}
                    onClick={() => handleNavigate(card.link)}
                    isBorder={card.isBorder}
                    isShadow={card.isShadow}
                    color={card.color}
                    setDragEnabled={setDragEnabled}
                    dragEnabled={dragEnabled}
                  />
                ))
              ) : (
                <div className="text-center w-full mt-4 text-lg text-gray-500">
                  Ajouter des liens
                </div>
              )}
              
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
}

export default HomeContent;
