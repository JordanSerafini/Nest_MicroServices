import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from '../SVG/Icon';

type WidthOptions = 'w-full' | 'w-10/10' | 'w-9/10' | 'w-8/10' | 'w-7/10' | 'w-6/10' | 'w-5/10' | 'w-4/10' | 'w-3/10' | 'w-2/10' | 'w-3.5/10';

interface NewToastProps {
  onClick?: (e: React.MouseEvent) => void;
  message: string;
  type: string;
  deny: (e: React.MouseEvent) => void;
  bgColor: string;
  textColor: string;
  icon: string;
  iconColor: string;
  width?: WidthOptions;
  position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

function NewToast({ onClick, message, type, deny, bgColor, textColor, icon, iconColor, width = 'w-full', position = 'top-right' }: NewToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
      );

      const timer = setTimeout((e) => {
        if (toastRef.current) {
          gsap.to(toastRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power3.in',
            onComplete: () => {
              if (toastRef.current) {
                toastRef.current.style.display = 'none';
              }
              deny(e);
            },
          });
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [deny]);

  const handleDeny = (e: React.MouseEvent) => {
    e.preventDefault();
    deny(e);
    if (toastRef.current) {
      toastRef.current.style.display = 'none';
    }
  };


  // Classes pour gérer la position
  const positionClasses = {
    'top-left': 'fixed top-0 left-0',
    'top-center': 'fixed top-0 left-1/2 transform -translate-x-1/2',
    'top-right': 'fixed top-0 right-0',
    'center-left': 'fixed top-1/2 left-0 transform -translate-y-1/2',
    'center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'center-right': 'fixed top-1/2 right-0 transform -translate-y-1/2',
    'bottom-left': 'fixed bottom-0 left-0',
    'bottom-center': 'fixed bottom-0 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'fixed bottom-0 right-0',
  };

  // Classes pour gérer la taille de la police
  const textSizeClasses: Record<WidthOptions, string> = {
    'w-full': 'text-base',
    'w-10/10': 'text-base',
    'w-9/10': 'text-base',
    'w-8/10': 'text-xs',
    'w-7/10': 'text-base',
    'w-6/10': 'text-base',
    'w-5/10': 'text-sm',
    'w-4/10': 'text-xs',
    'w-3/10': 'text-xs',
    'w-2/10': 'text-xs',
    'w-3.5/10': 'text-xs',
  };

  // Détecter si la largeur de l'écran est inférieure à 500px
  const isSmallScreen = window.innerWidth < 500;
  const effectiveWidth = isSmallScreen ? 'w-10/10' : width;
  const effectiveTextSize = isSmallScreen ? 'text-xs' : textSizeClasses[effectiveWidth as WidthOptions];

  return (
    <div className={`${positionClasses[position]} p-4 z-100 ${effectiveWidth}`}>
      <div
        ref={toastRef}
        className={`bg-${bgColor} shadow-2xl rounded-2xl h-auto p-4 flex flex-row items-center justify-between ${effectiveTextSize}`}
        style={{ color: textColor }}
      >
        <div className="flex gap-3">
          <Icon type={icon} theme={iconColor} />
          <div className="flex flex-row gap-2" style={{ color: textColor }}>
            <div className="font-bold tracking-wider">{type} : </div>
            <div>{message}</div>
          </div>
        </div>

        <div className={`flex flex-row ${isSmallScreen ? 'gap-2' : 'gap-4'}`}>
          <div
            className={`bg-green-600 rounded-full ${isSmallScreen ? 'p-1 px-' : 'p-2 px-4'} flex ${type === 'Success' ? 'border border-white' : ''}`}
            style={{ color: 'white' }}
            onClick={(e) => onClick && onClick(e)}
          >
            <Icon type="check" theme="white" />
            <p className={`${isSmallScreen ? 'hidden' : ''}`}>Accepter</p>
          </div>

          <div
            className={`${isSmallScreen ? 'p-1' : 'px-2'} h-auto items-center justify-center flex rounded-full`}
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={handleDeny}
          >
            <Icon type="close" theme="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewToast;
