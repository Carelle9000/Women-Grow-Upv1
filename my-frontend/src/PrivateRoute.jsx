import { Navigate, Outlet } from 'react-router-dom';

// Composant de route protégée
const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Si pas de token, redirige vers la page de login
    return <Navigate to="/login" />;
  }

  // Si le token est présent, afficher le contenu de la route protégée
  return <Outlet />;
};

export default PrivateRoute;
