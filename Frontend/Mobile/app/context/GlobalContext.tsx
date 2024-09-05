import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définition de l'interface pour le contexte
interface GlobalContextType {
  menuVisible: boolean;
  toggleMenu: () => void;
}

// Création du contexte avec une valeur par défaut
const GlobalContext = createContext<GlobalContextType>({
  menuVisible: false,
  toggleMenu: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    console.log(menuVisible);
    setMenuVisible(!menuVisible);
  };

  return (
    <GlobalContext.Provider value={{ menuVisible, toggleMenu }}>
      {children}
    </GlobalContext.Provider>
  );
};
