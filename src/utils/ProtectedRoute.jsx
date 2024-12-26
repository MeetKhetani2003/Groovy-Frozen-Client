import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <div>{children}</div> : <Navigate to="/auth/signup" />;
};

export default ProtectedRoute;
