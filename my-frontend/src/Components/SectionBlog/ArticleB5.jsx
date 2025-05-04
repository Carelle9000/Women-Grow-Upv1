import React from 'react';
import { useNavigate } from 'react-router-dom';
import droitsHumainsImage from '/src/assets/images/DroitsHumains.jpg'; 

const ArticleDroitsHumains = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 p-8 text-white">
          <h1 className="font-tienne text-3xl font-bold tracking-tight sm:text-4xl">
            La protection des droits humains : enjeux et défis contemporains
          </h1>
          <p className="mt-2 font-tienne text-lg opacity-80">
            Comprendre l'importance des droits fondamentaux et les efforts pour les garantir à tous.
          </p>
        </div>
        <div className="bg-white py-6 px-4 sm:px-6">
          <img
            src={droitsHumainsImage}
            alt="Illustration Droits Humains"
            className="w-full h-auto rounded-md shadow-md mb-6"
          />
          <div className="font-tienne text-gray-700 leading-relaxed">
            <p className="mb-4">
              Les droits humains sont le socle de toute société juste et équitable. Ils garantissent la dignité,
              la liberté, l’égalité et la justice pour tous, sans distinction. Cependant, leur application reste
              un combat quotidien dans de nombreuses régions du monde.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Les piliers des droits humains</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-fuchsia-500">Libertés fondamentales :</strong> liberté d'expression, de religion, de mouvement, et droit à la vie privée.
              </li>
              <li>
                <strong className="text-fuchsia-500">Égalité et non-discrimination :</strong> tous les individus doivent être traités de manière égale
                quelle que soit leur origine, leur genre ou leur orientation.
              </li>
              <li>
                <strong className="text-fuchsia-500">Accès à la justice :</strong> chacun doit pouvoir faire valoir ses droits devant des institutions
                impartiales.
              </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Défis actuels et priorités</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong className="text-violet-500">Protection des femmes :</strong> garantir leurs droits fondamentaux est crucial pour l’égalité
                des genres et l’autonomisation.
              </li>
              <li>
                <strong className="text-violet-500">Respect des conventions internationales :</strong> telles que la Déclaration universelle des droits de l’homme
                et les traités régionaux, souvent insuffisamment appliqués.
              </li>
              <li>
                <strong className="text-violet-500">Conflits et déplacements forcés :</strong> des millions de personnes sont privées de droits à cause des guerres
                et crises humanitaires.
              </li>
            </ul>
            <p className="mb-4">
              La défense des droits humains nécessite l'engagement de tous — gouvernements, organisations internationales,
              société civile et citoyens. L’éducation aux droits, la vigilance face aux abus et le soutien aux victimes
              sont des leviers puissants de transformation.
            </p>
            <p className="mb-6 font-semibold text-gray-800">
              Défendre les droits humains, c’est défendre l’humanité. Soyons tous acteurs de cette mission essentielle.
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

export default ArticleDroitsHumains;
