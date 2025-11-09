import { Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'user' | 'trainer')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { authUser } = authStore();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(authUser.role)) {
    // Redirect to appropriate home page based on role
    switch (authUser.role) {
      case 'admin':
        return <Navigate to="/admin/home" replace />;
      case 'user':
        return <Navigate to="/user/home" replace />;
      case 'trainer':
        return <Navigate to="/trainer/home" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;