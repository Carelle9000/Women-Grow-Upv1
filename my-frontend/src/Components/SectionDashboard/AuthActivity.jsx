import { Lock } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { useState, useEffect } from 'react';
import apiEND from '/src/API/axios'; // Assurez-vous que cela pointe vers votre fichier axios configuré

export function AuthActivity() {
  const [lastLogin, setLastLogin] = useState(null);  // État pour la dernière connexion
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const [error, setError] = useState(null);  // Pour gérer les erreurs

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await apiEND.get('/sessions'); // Remplacez cette URL par celle qui correspond à votre backend
        const sessionData = response.data;

        // Assurez-vous que la donnée sessionData contient la dernière connexion
        setLastLogin(sessionData.lastLogin); // Par exemple, si la réponse contient "lastLogin"
        setLoading(false);  // Fin du chargement
      } catch (error) {
        console.error('Erreur lors de la récupération des données de session', error);
        setError('Erreur lors de la récupération des données de session.');
        setLoading(false);
      }
    };

    fetchSessionData(); // Appel de la fonction pour récupérer les informations
  }, []); // L'effet se lance une seule fois au chargement du composant

  if (loading) {
    return (
      <AnimatedCard>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-indigo-500" size={24} />
          <h2 className="text-indigo-500 font-semibold text-xl">Activité de Connexion</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Chargement...</p>
      </AnimatedCard>
    );
  }

  if (error) {
    return (
      <AnimatedCard>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-indigo-500" size={24} />
          <h2 className="text-indigo-500 font-semibold text-xl">Activité de Connexion</h2>
        </div>
        <p className="text-red-600">{error}</p>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard>
      <div className="flex items-center bg-indigo-50 gap-2 mb-4">
        <Lock className="text-indigo-500" size={24} />
        <h2 className="text-indigo-500 font-semibold text-xl">Activité de Connexion</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        Dernière connexion : <span className="text-indigo-600">{lastLogin ? `il y a ${lastLogin}` : 'Information non disponible'}</span> 🔑
      </p>
    </AnimatedCard>
  );
}
