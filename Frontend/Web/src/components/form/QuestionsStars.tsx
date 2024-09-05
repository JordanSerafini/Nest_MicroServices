import StarRating from "./StarsRate";

interface QuestionProps {
  question: string;
  onRatingChange: (rating: number) => void;
}

function Question({ question, onRatingChange }: QuestionProps) {
  return (
    <div className="w-full h-full bg-red-5 justify-start items-center flex flex-row gap-4 text-sm font-medium text-gray-700
    lg:justify-center lg:items-center lg:flex-row lg:gap-8 lg:text-lg lg:font-semibold lg:w-7/10 lg:text-gray-800 lg:rounded-lg lg:shadow-lg lg:py-6 lg:px-8 lg:mt-8 lg:mb-8 lg:space-x-4 lg:space-y-4 lg:mx-auto
    ">
      <div className="w-7/10">
        <p>{question}</p>
      </div>
      <StarRating onRatingChange={onRatingChange} />
    </div>
  );
}

export default Question;
