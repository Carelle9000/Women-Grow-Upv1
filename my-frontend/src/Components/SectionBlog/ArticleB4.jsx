import React from 'react';
import { useNavigate } from 'react-router-dom';
import santeMentaleImage from '/src/assets/images/Bienetre.jpg'; // Remplacez par le bon chemin

const ArticleTechnologieSanteMentale = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            L'impact de la technologie sur la santé mentale : un regard éthique
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            Entre progrès et précautions, la technologie transforme notre rapport au bien-être psychologique.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src={santeMentaleImage}
            alt="Illustration Technologie et Santé Mentale"
            className="w-full h-100 rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              L’émergence de l’intelligence artificielle (IA), des objets connectés et des plateformes numériques
              transforme profondément le champ de la santé mentale. Des outils de diagnostic assisté à la thérapie en ligne,
              la technologie ouvre de nouvelles perspectives... mais soulève aussi de nombreuses questions éthiques.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Des technologies au service du soin</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-fuchsia-500">Diagnostic assisté :</strong> les algorithmes peuvent détecter des signaux faibles de troubles mentaux via
                l’analyse de données comportementales ou vocales.
              </li>
              <li>
                <strong className="text-fuchsia-500">Applications de bien-être :</strong> méditation guidée, suivi de l’humeur, exercices de respiration —
                ces outils offrent un accompagnement quotidien accessible.
              </li>
              <li>
                <strong className="text-fuchsia-500">Thérapies numériques :</strong> la téléconsultation et les plateformes de soutien en ligne
                démocratisent l’accès aux soins psychologiques.
              </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Des enjeux éthiques cruciaux</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-violet-500">Vie privée :</strong> la collecte de données sensibles nécessite un cadre de protection strict et transparent.
              </li>
              <li>
                <strong className="text-violet-500">Biais algorithmiques :</strong> les IA peuvent reproduire des préjugés s’ils sont formés sur des données non neutres.
              </li>
              <li>
                <strong className="text-violet-500">Humanisation du soin :</strong> la relation humaine reste au cœur du processus thérapeutique, et ne peut être entièrement remplacée.
              </li>
            </ul>
            <p className="mb-4">
              Il est essentiel que ces innovations technologiques soient développées avec une gouvernance éthique,
              une transparence des algorithmes et une inclusion des professionnels de santé.
            </p>
            <p className="mb-6 font-semibold text-gray-800">
              La technologie peut être un puissant levier pour améliorer la santé mentale — à condition de toujours
              placer l’humain au centre.
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

export default ArticleTechnologieSanteMentale;
