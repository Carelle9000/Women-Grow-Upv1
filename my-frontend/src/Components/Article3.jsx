import React from 'react';
import { useNavigate } from 'react-router-dom';
import comhafatImage from '../assets/images/entrepreneuriat.jpg'; // Remplacez par le chemin de votre image

const Article3 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        {/* Image en tête d’affiche */}
        <div
          className="w-full h-64 md:h-96 mb-6 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${comhafatImage})` }}
          aria-label="Communauté de pêche côtière africaine soutenant les pêcheries durables avec COMHAFAT"
        >
          <div className="w-full h-full bg-black/30 flex items-center justify-center rounded-lg">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
              COMHAFAT 2024 : Une pêche durable pour l’avenir de l’Afrique
            </h1>
          </div>
        </div>

        {/* Crédit à la source */}
        <p className="text-gray-600 mb-4 italic text-center">
          Source :{' '}
          <a
            href="https://www.comhafat.org/en/files/actualites/doc_actualite_1590299.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            COMHAFAT
          </a>
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Renforcer la coopération régionale</h2>
          <p className="text-gray-600 leading-relaxed">
            En 2024, la Conférence Ministérielle sur la Coopération Halieutique entre les États Africains Riverains de l’Océan Atlantique (COMHAFAT), également connue sous le nom d’ATLAFCO, intensifie ses efforts pour promouvoir une gestion durable des pêcheries le long de la côte atlantique africaine. Basée à Rabat, au Maroc, COMHAFAT réunit 22 États membres pour relever des défis majeurs tels que la surpêche, la pêche illégale et la préservation des écosystèmes marins.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Lutter contre la pêche illégale</h2>
          <p className="text-gray-600 leading-relaxed">
            Cette année, COMHAFAT a lancé plusieurs initiatives pour améliorer la gestion des ressources halieutiques et stimuler le développement économique. Un axe prioritaire est la mise en place de programmes conjoints de surveillance pour lutter contre la pêche illégale, non déclarée et non réglementée (INN), qui menace la biodiversité marine et les moyens de subsistance des communautés côtières. En partenariat avec des organisations comme le Bureau Interafricain pour les Ressources Animales de l’Union Africaine (UA-BIRA) et la Commission Sous-Régionale des Pêches (CSRP), COMHAFAT développe des technologies de surveillance avancées et des programmes de formation pour les agents des pêches locaux.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Autonomiser les communautés</h2>
          <p className="text-gray-600 leading-relaxed">
            Par ailleurs, COMHAFAT a organisé un atelier régional en 2024, réunissant des décideurs politiques, des scientifiques et des communautés de pêcheurs pour discuter des pratiques d’aquaculture durable. Cet événement a mis en lumière le rôle des femmes dans les pêcheries artisanales, soulignant leur contribution à la sécurité alimentaire et à la résilience économique. L’organisation a également présenté un nouveau cadre politique visant à promouvoir l’emploi des jeunes dans le secteur halieutique, afin de créer des opportunités dans les communautés côtières.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Un engagement pour la durabilité</h2>
          <p className="text-gray-600 leading-relaxed">
            Les efforts de COMHAFAT s’inscrivent dans le cadre de l’Objectif de Développement Durable 14 des Nations Unies (Vie aquatique), renforçant l’engagement de l’Afrique pour la conservation marine et la croissance économique. En favorisant la coopération entre les États membres et les partenaires internationaux, COMHAFAT ouvre la voie à un avenir durable pour les pêcheries atlantiques africaines.
          </p>
        </section>

        <p className="text-gray-600 mb-6 italic">
          Cet article est basé sur les informations publiées par COMHAFAT. Pour plus de détails, consultez le document original{' '}
          <a
            href="https://www.comhafat.org/en/files/actualites/doc_actualite_1590299.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            ici
          </a>
          .
        </p>

        {/* Bouton Retour */}
        <div className="flex justify-end">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article3;