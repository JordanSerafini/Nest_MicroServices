import React from 'react';

interface YesNoQuestionProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ question, value, onChange }) => {
  return (
    <div className="flex flex-row w-9/10 justify-between items-center md:w-9/10 md:justify-start lg:justify-between lg:items-center lg:gap-8 lg:text-lg lg:text-gray-800 lg:rounded-lg lg:shadow-lg lg:py-6 lg:px-8 lg:mt-8 lg:mb-8 lg:space-x-4 lg:space-y-4 lg:w-10/12 lg:mx-auto">

      <p className="text-sm font-medium lg:text-base lg:font-bold text-gray-700 pl-8">{question}</p>
      <div className="flex gap-2 sm:gap-6 md:gap-10">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={question}
            value="Oui"
            checked={value === 'Oui'}
            onChange={(e) => onChange(e.target.value)}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Oui</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={question}
            value="Non"
            checked={value === 'Non'}
            onChange={(e) => onChange(e.target.value)}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Non</span>
        </label>
      </div>
    </div>
  );
};

export default YesNoQuestion;
