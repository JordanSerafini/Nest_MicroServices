import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}


const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const getStarColor = (index: number) => {
    const currentRating = hover !== null ? hover : rating;
    if (index <= currentRating) {
      switch (currentRating) {
        case 1:
          return "text-red-600"; 
        case 2:
          return "text-red-400";
        case 3:
          return "text-orange-400";
        case 4:
          return "text-green-300"; 
        case 5:
          return "text-green-600"; 
        default:
          return "text-gray-300";
      }
    } else {
      return "text-gray-300";
    }
  };

  const handleRating = (index: number) => {
    setRating(index);
    onRatingChange(index);
  };

  return (
    <div className="flex flex-row gap-1 md:gap-3 lg:gap-5 xl:gap-8 cursor-pointer">
      {[...Array(5)].map((_star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`text-xl ${getStarColor(index)}`}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
