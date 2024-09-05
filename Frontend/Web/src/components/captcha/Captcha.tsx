import React, { useState, useEffect } from "react";

interface CaptchaProps {
  setIsCaptchaCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

function Captcha({ setIsCaptchaCorrect }: CaptchaProps) {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [totalExpected, setTotalExpected] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setIsCaptchaCorrect(false);
    generateNumbers();
  }, [setIsCaptchaCorrect]);

  const generateNumbers = () => {
    const num1 = getRandomInteger();
    const num2 = getRandomInteger();
    setFirstNumber(num1);
    setSecondNumber(num2);
    setTotalExpected(num1 + num2);
  };

  const getRandomInteger = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userTotal = parseInt(userAnswer);
    setHasSubmitted(true);
    if (!isNaN(userTotal) && userTotal === totalExpected) {
      setIsCorrect(true);
      setIsCaptchaCorrect(true);
    } else {
      setIsCorrect(false);
      generateNumbers();  
      setUserAnswer("");  
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-6 w-9/10 h-9/10 border-1 border-black z-50 items-center flex flex-col justify-center gap-4">
      <h2 className="text-center mb-4">Captcha</h2>
      <p className="text-center">Résolvez l'addition suivante :</p>
      <form onSubmit={handleSubmit} className="text-center mt-4">
        <p>
          {firstNumber} + {secondNumber} = ?
        </p>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required
          className="block mx-auto mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          min="1"
          max="40"
        />
        <button
          type="submit"
          className="block mx-auto mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Valider
        </button>
      </form>
      {hasSubmitted && (
        <p className={`text-center mt-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? "Correct !" : "Incorrect ! Veuillez réessayer."}
        </p>
      )}
    </div>
  );
}

export default Captcha;
