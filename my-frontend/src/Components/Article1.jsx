import React from 'react';
import { useNavigate } from 'react-router-dom';
import womenEmpowermentImage from '/src/assets/images/fefie.webp'; // Remplacez par le chemin de votre image

const Article1 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        {/* Image en tête d’affiche */}
        <div className="w-full h-64 md:h-96 mb-6 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${womenEmpowermentImage})` }}>
          <div className="w-full h-full bg-black/30 flex items-center justify-center rounded-lg">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
              Journée internationale de la femme 2025 : Autonomisation économique au Cameroun
            </h1>
          </div>
        </div>

        {/* Crédit à la source */}
        <p className="text-gray-600 mb-4 italic text-center">
          Source :{' '}
          <a
            href="https://cameroonceo.com/2025/03/10/la-journee-internationale-de-la-femme-au-cameroun-en-2025-le-potentiel-economique-des-femmes-camerounaises-sous-les-projecteurs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Cameroon CEO
          </a>
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Un événement sous le signe de l’inclusion</h2>
          <p className="text-gray-600 leading-relaxed">
            Le 8 mars 2025, le Cameroun célébrera la Journée internationale de la femme avec une ferveur particulière, mettant en lumière le rôle crucial des femmes dans le développement économique du pays. Sous le thème national « L’inclusion des femmes dans tous les secteurs pour un développement durable », cette édition vise à promouvoir l’autonomisation économique des femmes camerounaises, reconnues pour leur dynamisme et leur résilience dans des secteurs clés comme l’agriculture, le commerce, la technologie et l’entrepreneuriat.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Le rôle économique des femmes</h2>
          <p className="text-gray-600 leading-relaxed">
            Les femmes camerounaises représentent une force économique croissante. Selon des études récentes, elles contribuent de manière significative à l’économie nationale, notamment à travers les petites et moyennes entreprises (PME). Des initiatives comme le programme <strong>Ellever</strong> d’Ecobank Cameroun jouent un rôle déterminant en facilitant l’accès au financement pour les entrepreneuses, leur permettant de développer leurs activités et de créer des emplois. Ce programme, récemment amélioré, propose des solutions de crédit adaptées et des formations pour renforcer les compétences des femmes dans la gestion d’entreprise.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Événements et célébrations</h2>
          <p className="text-gray-600 leading-relaxed">
            La Journée internationale de la femme 2025 sera également marquée par des événements culturels et économiques à travers le pays. À Yaoundé, des conférences réuniront des leaders féminines, des entrepreneuses et des décideurs pour discuter des opportunités et des défis liés à l’inclusion économique. À Douala, des ateliers pratiques mettront en avant les innovations technologiques portées par des femmes dans le secteur du numérique. Le pagne officiel, dévoilé en janvier 2025 par le ministère de la Promotion de la Femme et de la Famille, incarne les valeurs de solidarité et de résilience, avec des motifs colorés symbolisant la diversité des contributions féminines.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Soutien international et local</h2>
          <p className="text-gray-600 leading-relaxed">
            En parallèle, des organisations locales et internationales, telles que l’Alliance internationale des femmes (AIF) et ONU-Femmes Cameroun, soutiennent ces efforts en promouvant l’égalité des genres et l’accès à l’éducation. Ces initiatives rappellent que l’autonomisation des femmes n’est pas seulement une question de justice sociale, mais aussi un levier essentiel pour la croissance économique et le développement durable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Un avenir prometteur</h2>
          <p className="text-gray-600 leading-relaxed">
            En célébrant les réalisations des femmes camerounaises, le Cameroun réaffirme son engagement à créer un avenir où chaque femme a les moyens de réaliser son plein potentiel. Que ce soit dans les champs, les bureaux ou les salles de conférence, les femmes camerounaises continuent de prouver qu’elles sont des actrices incontournables du progrès national.
          </p>
        </section>

        <p className="text-gray-600 mb-6 italic">
          Cet article est basé sur les informations publiées par Cameroon CEO. Pour plus de détails, consultez l’article original{' '}
          <a
            href="https://cameroonceo.com/2025/03/10/la-journee-internationale-de-la-femme-au-cameroun-en-2025-le-potentiel-economique-des-femmes-camerounaises-sous-les-projecteurs/"
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

export default Article1;