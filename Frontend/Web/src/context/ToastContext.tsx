import { createContext, useContext } from 'react';

interface ToastParams {
  message: string;
  css?: string;
  duration?: number;
  position?: string;

}

type ToastContextType = {
  triggerToast: (params: ToastParams) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;
