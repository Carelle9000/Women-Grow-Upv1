import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleFeminin = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            Leadership Féminin : Définition et Exemples
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            Un aperçu essentiel sur le leadership au féminin dans le monde professionnel.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src="/src/assets/images/empowerment.jpg" // Remplacez par l'URL de l'image que je vous ai montrée
            alt="Illustration Leadership Féminin"
            className="w-full h-80 rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              L'article explore le concept crucial de leadership féminin et sa pertinence
              indéniable dans le paysage professionnel contemporain. Il met en lumière
              les disparités persistantes entre les genres sur le lieu de travail, où
              les femmes sont fréquemment confrontées à des écarts salariaux et à des
              obstacles significatifs dans leur progression vers des postes de direction.
            </p>
            <p className="mb-4">
              Cependant, l'article souligne avec force que le leadership transcende le
              genre. Il n'est pas une prérogative masculine ou féminine, mais plutôt un
              ensemble de compétences et de qualités intrinsèques qui peuvent être
              cultivées et développées par tout individu, indépendamment de son identité
              de genre.
            </p>
            <p className="mb-4">
              Dans cette optique, l'article suggère des actions concrètes que les
              organisations devraient entreprendre pour favoriser activement le leadership
              féminin. Cela inclut l'établissement d'une parité rigoureuse au sein de la
              haute direction, la reconnaissance et la valorisation du développement des
              compétences générales pour l'ensemble des employés, et la mise en place
              d'opportunités structurées de formation, d'encadrement et de mentorat.
            </p>
            <p className="mb-4">
              Parallèlement, l'article encourage vivement les femmes à reconnaître et à
              embrasser leurs atouts uniques, tels que l'empathie et l'intelligence
              émotionnelle, souvent associées au leadership féminin. Il les incite à
              poursuivre leurs ambitions professionnelles avec assurance et détermination.
            </p>
            {/* Vous pouvez ajouter plus de contenu ici en vous basant sur l'article */}
          </div>
          {/* Bouton Retour stylisé */}
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

export default ArticleFeminin;