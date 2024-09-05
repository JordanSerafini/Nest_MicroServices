import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import NewToast from '../components/toast/newToast';

type WidthOptions = 'w-full' | 'w-10/10' | 'w-9/10' | 'w-8/10' | 'w-7/10' | 'w-6/10' | 'w-5/10' | 'w-4/10' | 'w-3/10' | 'w-2/10' | 'w-3.5/10';

interface Notification {
  message: string;
  type: string;
  bgColor: string;
  textColor: string;
  icon: string;
  iconColor: string;
  width?: WidthOptions;
  position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  onClick?: (e: React.MouseEvent) => void;
  deny: (e: React.MouseEvent) => void;
}

interface NotificationsContextProps {
  addNotification: (notification: Notification) => void;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  useEffect(() => {
    const timers = notifications.map((_, index) => 
      setTimeout(() => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
      }, 5000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications]);

  return (
    <NotificationsContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-0 right-0 p-4 space-y-4">
        {notifications.map((notification, index) => (
          <NewToast
            key={index}
            onClick={notification.onClick ? notification.onClick : () => {}}
            deny={notification.deny}
            message={notification.message}
            type={notification.type}
            bgColor={notification.bgColor}
            textColor={notification.textColor}
            icon={notification.icon}
            iconColor={notification.iconColor}
            width={notification.width}
            position={notification.position}
          />
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};
