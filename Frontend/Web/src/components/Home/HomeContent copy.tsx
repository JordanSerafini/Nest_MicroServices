/*
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from "../Cards/Cards";
import Homecards from '../../types/homecard'; 
import { fetchCards } from '../../utils/function/function';
import Icon from '../SVG/Icon';

import AddCardModal from '../modals/AddCardModal';


function HomeContent() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Homecards[]>([]);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const userID = user.id;

  

  useEffect(() => {
    fetchCards(userID, setCards);
    setReload(false);
  }, [userID, reload]);

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const handleAddClick = () => {
    setShowModal(prev => !prev);
  };
  
  return (
    <div className="h-full overflow-auto">
      {showModal ? (
        <div className='h-full w-full flex justify-center'>
          <AddCardModal onClose={() => setShowModal(false)} />
        </div>
      ) : (
        <div className="h-full w-full flex flex-row flex-wrap gap-x-2 gap-y-1 justify-center items-start font-Poppins text-center font-extralight h- overflow-auto">
          {cards.length > 0 ? (
            cards.map((card) => (
              <Cards
                key={card.id}
                id={parseInt(card.id)}
                title={card.title}
                type={card.logo}
                theme={card.color || ""}
                onClick={() => handleNavigate(card.link)}
                isBorder={card.isBorder}
                isShadow={card.isShadow}
                setCards={setCards}
              />
            ))
          ) : (
            <div className="text-center w-full mt-4 text-lg text-gray-500">Ajouter liens</div>
          )}
          <div className="bg-white-perso sm:w-3/10 w-4.5/10 h-36 flex flex-col items-center justify-center rounded-lg shadow-md cursor-pointer">
            <Icon type="add" theme="#000000" className="text-3xl font-bold" onClick={handleAddClick} />
          </div>
        </div>
      )}
    </div>
  );
}


export default HomeContent;
*/