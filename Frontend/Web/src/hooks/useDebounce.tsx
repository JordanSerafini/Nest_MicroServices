import { useCallback, useRef } from 'react';

/**
 * Un hook personnalisé pour créer une fonction debounce.
 *
 * @param duration La durée du délai en millisecondes.
 * @returns Une fonction qui accepte une callback et la retarde de la durée spécifiée.
 */
function useDebounce(duration: number = 300): (callback: () => void) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((callback: () => void) => {
    // Effacer le timer existant pour réinitialiser le délai
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Définir un nouveau timer
    timerRef.current = setTimeout(callback, duration);
  }, [duration]); // Reconstruire la fonction si la durée change

  return debounce;
}

export default useDebounce;
