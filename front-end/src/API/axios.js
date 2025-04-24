import axios from 'axios';

const apiEND = axios.create({
  baseURL: 'http://localhost:8000/api', // Ton URL API Laravel
  
  headers: {
    "Accept": "application/json",
  },
});

// Ajouter le token si présent dans localStorage
apiEND.interceptors.request.use(
  config => {
      const token = localStorage.getItem('authToken');
      if (token) {
          // Ajoute l'en-tête Authorization si un token existe
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  error => {
      // Gérer les erreurs de configuration de requête
      return Promise.reject(error);
  }
);

// Optionnel : Intercepteur de réponse pour gérer les erreurs 401 globales (ex: déconnexion)
apiEND.interceptors.response.use(
  response => response, // Retourne la réponse si tout va bien
  error => {
      if (error.response && error.response.status === 401) {
          // Gérer l'erreur 401 :
          // - Supprimer le token invalide
          localStorage.removeItem('authToken');
          // - Rediriger vers la page de connexion
          //   (Attention : ne pas utiliser useNavigate directement ici,
          //    gérer la redirection dans le composant ou via un état global)
          console.error("Session expirée ou token invalide. Redirection vers login...");
          // window.location.href = '/login'; // Redirection simple mais brutale
      }
      return Promise.reject(error); // Propager l'erreur pour la gestion locale (dans les catch)
  }
);

export default apiEND;