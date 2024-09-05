import { createContext, useContext as useReactContext, useState, useEffect } from 'react';

// Créez le contexte
const GlobalContext = createContext({
  isFullscreen: false,
  enterFullscreen: () => {},
  exitFullscreen: () => {},
  isAdminPanel: false,
  swapAdminPanel: () => {},
});

// Créez le fournisseur de contexte
export const GlobalProvider = ({ children }: any) => {
  //* ----------------------------- Fullscreen ----------------------------- *//
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement != null);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  //* ----------------------------- IsAdminPanel ----------------------------- *//
  const [isAdminPanel, setIsAdminPanel] = useState(false);

  const swapAdminPanel = () => {
    setIsAdminPanel(!isAdminPanel);
  };

  return (
    <GlobalContext.Provider value={{ isFullscreen, enterFullscreen, exitFullscreen, swapAdminPanel, isAdminPanel }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Créez un hook pour utiliser le contexte plus facilement
export const useGlobalContext = () => {
  return useReactContext(GlobalContext);
};
