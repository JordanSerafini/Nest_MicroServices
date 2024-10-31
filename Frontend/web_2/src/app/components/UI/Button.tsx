import React from 'react';

interface ButtonProps {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style: string;
}

const Button: React.FC<ButtonProps> = ({ name, onClick, type = 'button', className = 'default', style = 'default' }) => {
    
  const getButtonClasses = () => {
    switch (style) {
      case 'gradient':
        return 'gradient-active focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded';
      case 'gradient-inactive':
        return 'gradient-inactive focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded';
      default:
        return '';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${getButtonClasses()} ${className} tracking-widest w-full`}
    >
      {name}
    </button>
  );
};

export default Button;
