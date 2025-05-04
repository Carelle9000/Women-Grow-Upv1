import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [isOpen, setIsOpen] = useState(true); // Modale ouverte par défaut
  const [isChecked, setIsChecked] = useState(false); // État de la case à cocher
  const navigate = useNavigate(); // Pour la navigation

  const handleAccept = () => {
    if (isChecked) {
      // Enregistrer l'acceptation (exemple : dans localStorage)
      localStorage.setItem('privacyPolicyAccepted', 'true');
      setIsOpen(false); // Ferme la modale
      // Optionnel : Rediriger vers une page spécifique
      navigate('/');
    }
  };

  const handleBack = () => {
    setIsOpen(false); // Ferme la modale
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Voir la Politique de Confidentialité
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Politique de Confidentialité</h1>
            <p className="text-gray-600 mb-4">
              Nous nous engageons à protéger vos informations personnelles. Voici un aperçu de notre politique :
            </p>
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Collecte d'Informations</h2>
              <p className="text-gray-600">
                Nous collectons des données lorsque vous vous inscrivez, remplissez un formulaire ou interagissez avec notre site.
              </p>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Utilisation des Données</h2>
              <p className="text-gray-600">
                Vos informations peuvent être utilisées pour personnaliser votre expérience, améliorer notre site ou vous envoyer des mises à jour.
              </p>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Protection des Données</h2>
              <p className="text-gray-600">
                Nous mettons en œuvre diverses mesures de sécurité pour protéger vos informations.
              </p>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Partage des Informations</h2>
              <p className="text-gray-600">
                Nous ne vendons ni ne louons vos données à des tiers.
              </p>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Droits des Utilisateurs</h2>
              <p className="text-gray-600">
                Vous avez le droit d'accéder à vos données, de les corriger ou de demander leur suppression.
              </p>
            </section>
            <p className="text-gray-600 mb-4">
              Pour plus de détails, veuillez consulter notre politique complète sur notre site.
            </p>

            {/* Case à cocher pour accepter */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="acceptPolicy"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <label htmlFor="acceptPolicy" className="ml-2 text-gray-600">
                J'accepte la politique de confidentialité
              </label>
            </div>

            {/* Boutons Accepter et Retour */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Retour
              </button>
              <button
                onClick={handleAccept}
                disabled={!isChecked}
                className={`px-4 py-2 rounded text-white ${
                  isChecked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;