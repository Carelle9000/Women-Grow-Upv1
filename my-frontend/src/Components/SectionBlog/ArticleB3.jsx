import React from 'react';
import { useNavigate } from 'react-router-dom';
import entrepreneuriatImage from '/src/assets/images/entrepreunariat2.webp'; // Assurez-vous que cette image existe

const ArticleEntrepreneuriatSucces = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            L’entrepreneuriat : un chemin vers la réussite et l’indépendance financière
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            Transformer sa passion en impact et son ambition en autonomie.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src={entrepreneuriatImage}
            alt="Illustration Entrepreneuriat"
            className="w-full h-auto rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              L’entrepreneuriat est bien plus qu’un simple choix professionnel. Il s’agit d’une voie
              vers la liberté, l’innovation et l’impact personnel et collectif. De plus en plus de femmes
              à travers le monde choisissent cette voie pour s’émanciper, créer de la valeur et contribuer
              au changement.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Les Clés de l’Indépendance</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-fuchsia-500">Autonomie dans la prise de décision :</strong>{' '}
                être entrepreneure, c’est décider librement de ses orientations stratégiques,
                de ses horaires, de ses partenaires et de sa vision à long terme.
              </li>
              <li>
                <strong className="text-fuchsia-500">Potentiel de revenus évolutif :</strong>{' '}
                contrairement au salariat, l’entrepreneuriat permet une croissance illimitée
                des revenus selon l’effort, l’innovation et la résilience.
              </li>
              <li>
                <strong className="text-fuchsia-500">Alignement avec ses valeurs :</strong>{' '}
                créer son entreprise permet de bâtir un projet qui reflète ses convictions,
                son éthique, et sa mission personnelle.
              </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Défis et Opportunités</h2>
            <p className="mb-4">
              Le parcours entrepreneurial n’est pas exempt de difficultés : incertitude financière,
              charge mentale, équilibre entre vie personnelle et professionnelle. Mais chaque obstacle
              devient une opportunité de grandir, de s’adapter, d’innover.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-violet-500">Résilience :</strong> l’échec fait partie du
                processus. Il enseigne la persévérance et forge le caractère.
              </li>
              <li>
                <strong className="text-violet-500">Réseautage et entraide :</strong> construire une
                communauté d’entrepreneurs est une richesse précieuse, source de collaboration et de
                soutien.
              </li>
              <li>
                <strong className="text-violet-500">Apprentissage continu :</strong> chaque jour est
                une opportunité de développer ses compétences et de repousser ses limites.
              </li>
            </ul>
            <p className="mb-4">
              Pour les femmes en particulier, l’entrepreneuriat est une arme puissante contre les
              inégalités économiques et sociales. C’est un levier d’émancipation et de transformation
              des structures patriarcales.
            </p>
            <p className="mb-6 font-semibold text-gray-800">
              Choisir l’entrepreneuriat, c’est croire en son potentiel, prendre sa place, et créer
              l’impact que l’on souhaite voir dans le monde.
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

export default ArticleEntrepreneuriatSucces;
