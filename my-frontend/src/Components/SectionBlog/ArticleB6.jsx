import React from 'react';
import { useNavigate } from 'react-router-dom';
import citoyenEngageImage from '/src/assets/images/Engagement.jpg'; // Remplacez par le bon chemin

const ArticleCitoyenEngage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            Devenir un citoyen engagé : les clés pour s’impliquer dans la société
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            Comprendre comment chaque individu peut contribuer activement au changement social et démocratique.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src={citoyenEngageImage}
            alt="Illustration Citoyenneté Active"
            className="w-full h-96 rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              Être un citoyen engagé signifie prendre conscience de ses droits et de ses responsabilités envers la société.
              Il s'agit d’agir pour le bien commun, de défendre les valeurs démocratiques et de s’impliquer dans des actions
              concrètes à différents niveaux : local, national ou mondial.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Pourquoi s’engager ?</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-fuchsia-500">Renforcer la démocratie :</strong> une société plus juste et plus représentative repose sur la participation active de ses citoyens.
              </li>
              <li>
                <strong className="text-fuchsia-500">Donner du sens à ses actions :</strong> l’engagement permet de contribuer à une cause qui nous tient à cœur et d’influencer positivement son environnement.
              </li>
              <li>
                <strong className="text-fuchsia-500">Créer du lien social :</strong> les actions collectives favorisent la solidarité et la cohésion entre les individus.
              </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Comment s’impliquer concrètement ?</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-violet-500">Rejoindre une association :</strong> qu’elle soit humanitaire, environnementale ou culturelle, l’action associative est une excellente porte d’entrée vers l’engagement.
              </li>
              <li>
                <strong className="text-violet-500">Participer à la vie locale :</strong> conseils de quartier, réunions publiques, projets citoyens… autant d’occasions d’agir près de chez soi.
              </li>
              <li>
                <strong className="text-violet-500">Utiliser sa voix :</strong> voter, interpeller ses élus, ou encore sensibiliser autour de soi sont autant d’actes d’engagement citoyen.
              </li>
            </ul>
            <p className="mb-4">
              L’engagement citoyen est un levier puissant de transformation sociale. Chacun peut, à son échelle,
              contribuer à construire une société plus inclusive, durable et solidaire.
            </p>
            <p className="mb-6 font-semibold text-gray-800">
              Ne sous-estimez jamais le pouvoir de votre implication. Devenez acteur du changement dès aujourd’hui.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleBack}
              className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCitoyenEngage;
