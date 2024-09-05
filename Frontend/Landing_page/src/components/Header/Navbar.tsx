import { useState } from 'react';

function Navbar() {
  const [active, setActive] = useState("Home");

  const handleClick = (item: string) => {
    setActive(item);
    console.log(`${item} cliqué`); 
  };

  return (
    <div>
      <ul className="flex justify-evenly w-full">
        {["Home", "Fonctionnalité", "Prix", "Contact", "Faq"].map((item) => (
          <li
            key={item}
            className={`${active === item ? "font-bold text-blue-800 tracking-wide border-b border-blue-800 pb-" : ""} cursor-pointer`}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
