import { Navigate, Outlet } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';

const ProtectedRoute = () => {
  const isAuthenticated = useUIStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
