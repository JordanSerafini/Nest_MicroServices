import { useEffect, useRef, useState } from "react";
import Icon from "../SVG/Icon";
import Homecards from "../../types/homecard";
import { useDrop, useDrag } from "react-dnd";
import OptionModal from "./optionModal";

interface CardProps {
  id: number;
  title: string;
  type: string;
  className?: string;
  theme?: string;
  isBorder?: boolean;
  isShadow?: boolean;
  color?: string;
  index: number;
  setCards: (cards: Homecards[]) => void;
  onClick?: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setDragEnabled: (dragEnabled: boolean) => void;
  dragEnabled: boolean;
}

const ItemType = "card";

const Cards: React.FC<CardProps> = ({
  id,
  title,
  type,
  theme,
  onClick,
  className,
  index,
  moveCard,
  isBorder,
  isShadow,
  color,
  setDragEnabled,
  dragEnabled,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [cardTheme] = useState(theme);
  const [cardType] = useState(type);
  const [css, setCss] = useState("");
  const [showOptionModal, setShowOptionModal] = useState(false);

  const idString = id.toString();

  const optionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  const iconClass = "text-3xl font-extralight";
  const containerClass = "relative bg-white-perso sm:w-3/10 lg:w-1/10 w-4.5/10 h-36 flex flex-col items-center justify-center rounded-lg shadow-md ";
  const moreHorizIconClass = "absolute top-1 right-2 text-xl";

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { type: string; index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  useEffect(() => {
    let cssClasses = "";
    if (isBorder) {
      cssClasses += " border-2 border-black";
    }
    if (isShadow) {
      cssClasses += " shadow-md";
    }
    if (color) {
      cssClasses += ` border-${cardTheme}-400`;
    }
    setCss(cssClasses);
  }, [isBorder, isShadow, color, cardTheme]);

  const handleDrag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDragEnabled(!dragEnabled);
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      id={idString}
      className={`${containerClass} ${className} ${css} cursor-pointer`}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
    {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {showModal ? (
        <div
          onClick={(e) => handleDetailClick(e)}
          className="w-full h-full flex flex-col justify-start items-center gap-2 p-2"
        >
          <Icon type="close" theme="red" className="text-base self-end" onClick={() => setShowModal(false)} />
          <button
            onClick={(e) => handleDrag(e)}
            className="bg-green-600 text-white p-1 text-xs w-full"
          >
            {dragEnabled ? "Désactiver" : "Déplacer"}
          </button>
          {showOptionModal ? (
            <OptionModal 
              cardId={id} 
              initialData={{ title, logo: type, link: '', color, isborder: isBorder, isshadow: isShadow }} 
              setShowOptionModal={setShowOptionModal} 
              onUpdate={() => setShowModal(false)} 
            />
          ) : (
            <div className="flex gap-1 items-center" onClick={() => setShowOptionModal(true)}>
              <Icon type="settings" theme="blue" className="text-sm" />
              <span className="text-xs text-blue-700 font-bold tracking-wider">Options</span>
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <Icon
            type="More_Horiz"
            theme="black"
            className={moreHorizIconClass}
            onClick={optionClick}
          />
          <Icon type={cardType} theme={cardTheme} className={iconClass} />
          {title ? (
            <div style={{ color: cardTheme }}>{title}</div>
          ) : (
            <div>title</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;
