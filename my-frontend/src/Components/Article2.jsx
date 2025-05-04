import React from 'react';
import { useNavigate } from 'react-router-dom';
import womhubImage from '../assets/images/Mentorat.jpg'; // Remplacez par le chemin de votre image

const Article2 = () => {
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
          style={{ backgroundImage: `url(${womhubImage})` }}
          aria-label="Femmes sud-africaines dans les STEM participant au programme WomHub 2024"
        >
          <div className="w-full h-full bg-black/30 flex items-center justify-center rounded-lg">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
              WomHub 2024 : Autonomiser les femmes entrepreneures en STEM
            </h1>
          </div>
        </div>

        {/* Crédit à la source */}
        <p className="text-gray-600 mb-4 italic text-center">
          Source :{' '}
          <a
            href="https://www.opportunites.mg/2024/10/programme-de-mentorat-womhub-2024-une.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Opportunités MG
          </a>
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Une initiative pour l’inclusion</h2>
          <p className="text-gray-600 leading-relaxed">
            En 2024, WomHub, une organisation sud-africaine dédiée à l’autonomisation des femmes dans les domaines STEM (sciences, technologie, ingénierie, et mathématiques), lance une nouvelle édition de son programme de mentorat « STEM is Everywhere », en partenariat avec la Fondation Visa. Cette initiative vise à soutenir environ 100 femmes entrepreneures en début de carrière en Afrique du Sud, en leur offrant des ressources, un accompagnement personnalisé, et un accès aux réseaux d’innovation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Un programme axé sur les STEM</h2>
          <p className="text-gray-600 leading-relaxed">
            Le programme s’adresse aux femmes évoluant dans des secteurs technologiques et industriels, où elles restent sous-représentées. Grâce à des ateliers de formation, des sessions de mentorat avec des experts, et des opportunités de financement, WomHub cherche à combler l’écart entre les genres et à libérer le potentiel économique des entrepreneures. Anjani Harjeven, CEO de WomHub, déclare : « Ce programme incarne notre mission d’éliminer les barrières et de créer des opportunités pour les femmes leaders de demain dans les STEM. »
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Réseautage et innovation</h2>
          <p className="text-gray-600 leading-relaxed">
            Les participantes bénéficieront d’un accès aux pôles d’innovation de WomHub, où elles pourront collaborer avec des startups, des investisseurs, et des leaders du secteur. Des événements de réseautage et des formations sur la gestion d’entreprise, le leadership, et les technologies émergentes (comme l’IA et la cybersécurité) sont également prévus. Le programme met un accent particulier sur l’inclusion, en soutenant les femmes issues de communautés marginalisées.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Une inspiration pour Madagascar</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour les entrepreneures malgaches intéressées, le programme offre une inspiration et des opportunités de connexion avec des initiatives similaires à Madagascar. Les candidatures pour 2024 sont ouvertes jusqu’au 30 novembre, et les détails sont disponibles sur le site de WomHub. Ce programme est une chance unique de transformer une idée en entreprise viable et de rejoindre une communauté de femmes entrepreneures dynamiques.
          </p>
        </section>

        <p className="text-gray-600 mb-6 italic">
          Cet article est basé sur les informations publiées par Opportunités MG. Pour plus de détails, consultez l’article original{' '}
          <a
            href="https://www.opportunites.mg/2024/10/programme-de-mentorat-womhub-2024-une.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            ici
          </a>
          .[](https://managers.tn/2024/09/06/afrique-du-sud-womhub-en-soutien-aux-femmes-entrepreneures/)
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

export default Article2;