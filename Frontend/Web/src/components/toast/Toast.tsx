import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ToastProps {
  message: string;
  css?: string;
  duration?: number;
  position?: string;
}

const Toast = ({ message, css, duration = 3000, position = 'top-right' }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Animation d'entrée
      gsap.fromTo(toastRef.current, { x: '100%', autoAlpha: 0 }, { x: '0%', autoAlpha: 1, duration: 0.5, ease: "power3.out" });

      const hideTimeout = setTimeout(() => {
        // Animation de sortie
        gsap.to(toastRef.current, { x: '-100%', autoAlpha: 0, duration: 0.5, ease: "power3.in" }).then(() => {
          setIsVisible(false);  // Cache le toast après l'animation
        });
      }, duration);

      return () => clearTimeout(hideTimeout);
    }
  }, [message, duration]);

  // Ajoutez ou ajustez la position ici en fonction de la prop 'position'
  const positionClasses = {
    'top': 'top-5',
    'top-left': 'top-5 left-5',
    'top-right': 'top-5 right-5',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'center-left': 'top-1/2 left-5 transform -translate-y-1/2',
    'center-right': 'top-1/2 right-5 transform -translate-y-1/2',
    'bottom-left': 'bottom-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom': 'bottom-5',
  }[position] || 'top-5 right-5';

  const defaultClasses = "bg-black-pers border-1 text-white flex justify-center items-center rounded-md shadow-xl";
  const classNames = `${css ? css : defaultClasses} ${positionClasses} fixed min-h-14 w-full p-2 text-center text-sm z-50`;

  return (
    <div ref={toastRef} className={classNames} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {message}
    </div>
  );
};

export default Toast;
