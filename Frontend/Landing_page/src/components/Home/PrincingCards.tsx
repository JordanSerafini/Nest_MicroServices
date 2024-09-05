import React from "react";

interface PricingCardProps {
  badge: string;
  describe: string;
  price: string;
  features: string[];
  onClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  badge,
  describe,
  price,
  features,
  onClick,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-end items-center mb-4 ">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
          {badge}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{describe}</p>
      <p className="text-4xl font-bold text-gray-900 mb-4">{price}</p>
      <ul className="mb-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="h-6 w-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="ml-3">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="mt-8 w-full bg-indigo-600 text-white py-2 rounded-xl"
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
