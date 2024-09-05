import React, { useState, useEffect } from 'react';
import ToastContext from './ToastContext';
import Toast from '../components/toast/Toast';

interface ToastParams {
  message: string;
  css?: string;
  duration?: number;
  position?: string;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastParams, setToastParams] = useState<ToastParams | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toastParams) {
      timer = setTimeout(() => {
        setToastParams(null);
      }, toastParams.duration || 3000);
    }
    return () => clearTimeout(timer);
  }, [toastParams]);

  const triggerToast = (params: ToastParams) => {
    setToastParams(params);
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      {toastParams && <Toast message={toastParams.message} css={toastParams.css} duration={toastParams.duration} position={toastParams.position} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
