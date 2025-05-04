import React from 'react';
import { useNavigate } from 'react-router-dom';
import protectionEnfanceImage from '/src/assets/images/devopp.jpg'; // Remplacez par le chemin de votre image

const ArticleProtectionEnfance = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            Protéger l'Enfance : Un Combat Essentiel
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            L'engagement de Plan International pour la sécurité et le bien-être des enfants.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src={protectionEnfanceImage} // Utilisez l'image importée
            alt="Illustration Protection de l'Enfance"
            className="w-full h-auto rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              Des millions d'enfants à travers le monde sont quotidiennement confrontés à des
              réalités brutales : violence, exploitation, abus et négligence. Pour Plan
              International, la protection de l'enfance n'est pas seulement une nécessité,
              c'est un droit fondamental qui doit être garanti à chaque enfant, partout.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Nos Combats pour la Protection</h2>
            <p className="mb-4">
              Plan International mène des actions concrètes sur plusieurs fronts pour assurer
              la sécurité et le bien-être des enfants :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-fuchsia-500">Lutte contre les violences faites aux filles :</strong>
                Nous nous opposons fermement au mariage d'enfants, aux mutilations génitales
                féminines (MGF) et à toutes formes de violences sexuelles qui brisent la vie
                et l'avenir des jeunes filles.
              </li>
              <li>
                <strong className="text-fuchsia-500">Protection dans les urgences :</strong>
                Dans les contextes de conflits et de catastrophes naturelles, où les enfants
                sont les plus vulnérables, nous intervenons pour leur apporter une aide
                vitale et une protection immédiate.
              </li>
              <li>
                <strong className="text-fuchsia-500">Renforcement des systèmes de protection :</strong>
                Nous travaillons main dans la main avec les communautés, les gouvernements et
                nos partenaires pour bâtir des environnements protecteurs où les droits des
                enfants sont respectés et appliqués.
              </li>
              <li>
                <strong className="text-fuchsia-500">Protection en ligne :</strong>
                Face aux risques croissants du monde numérique, nous sensibilisons aux dangers
                et promouvons un internet plus sûr pour les enfants.
              </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Notre Approche : Agir à Tous les Niveaux</h2>
            <p className="mb-4">
              Notre action se déploie à différents niveaux pour un impact maximal :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-violet-500">Au niveau local :</strong> Nous soutenons
                directement les enfants et leurs familles à travers des programmes d'éducation,
                de sensibilisation et d'aide psychosociale.
              </li>
              <li>
                <strong className="text-violet-500">Au niveau national et international :</strong>
                Nous menons un travail de plaidoyer auprès des décideurs politiques pour
                l'adoption de lois et de politiques plus protectrices pour les enfants.
              </li>
            </ul>
            <p className="mb-4">
              La protection de l'enfance est une responsabilité collective. Chaque individu,
              chaque communauté, chaque gouvernement et chaque organisation a un rôle à jouer
              pour construire un monde où tous les enfants sont en sécurité et peuvent s'épanouir.
            </p>
            <p className="mb-6 font-semibold text-gray-800">
              Ensemble, faisons la différence. Soutenez le travail de Plan International pour
              offrir une enfance digne et sûre à chaque enfant.
            </p>
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

export default ArticleProtectionEnfance;