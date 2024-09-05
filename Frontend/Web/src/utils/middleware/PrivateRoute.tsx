import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";

const PrivateRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const { triggerToast } = useToast();

  if (!isAuthenticated) {
    setTimeout(() => {
      triggerToast({ message: 'Vous devez être connecté pour accéder à cette page.', css: '', duration: 1500, position: 'center'});
    }, 0);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
