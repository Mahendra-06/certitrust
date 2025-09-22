import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { userType } = useParams<{ userType?: string }>();

  // Show loading state while checking auth
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/user-type" state={{ from: location }} replace />;
  }

  // Check if the user's role has access to this route
  const hasRequiredRole = allowedRoles ? allowedRoles.includes(user.role) : true;
  const isMatchingRoute = !userType || user.role === userType;

  // If role doesn't match, redirect to the appropriate dashboard
  if (!isMatchingRoute) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // If role is not allowed, show access denied
  if (!hasRequiredRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full text-center">
          <strong className="font-bold">Access Denied! </strong>
          <span className="block sm:inline">You don't have permission to access this page.</span>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return children;
}
