// components/ActualitesSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import jif from "@/assets/images/fefie.webp";
import mentorat from "@/assets/images/Mentorat.jpg";
import ateliers from "@/assets/images/entrepreneuriat.jpg";

const ActualitesSection = () => {
  const navigate = useNavigate();

  const actualites = [
    {
      titre: "Célébration de la Journée Internationale des Droits des Femmes",
      description:
        "Une journée mémorable de célébration et d'engagement pour l'autonomisation des femmes.",
      image: "@/assets/images/fefie.webp",
      lien: "/actualites/journee-femme",
      taille: "grande",
      lien:"https://blog.babasport.fr/team-building/10-ateliers-essentiels-de-formation-au-leadership",

    },
    {
      titre: "Programme de Mentorat 2024",
      description:
        "Lancement de notre nouveau programme de mentorat pour les femmes entrepreneurs.",
      image: "@/assets/images/Mentorat.jpg",
      lien: "/actualites/mentorat-2024",
      taille: "petite",
      lien:"https://blog.babasport.fr/team-building/10-ateliers-essentiels-de-formation-au-leadership",
    },
    {
      titre: "Ateliers de Formation",
      description:
        "Série d'ateliers pratiques sur le leadership et l'entrepreneuriat  au sein de la communaute feminine.",
      image: "@/assets/images/entrepreneuriat.jpg",
      lien: "/actualites/ateliers-formation",
      taille: "petite",
      lien:"https://blog.babasport.fr/team-building/10-ateliers-essentiels-de-formation-au-leadership",
    },
  ];

  return (
    <section className="py-12 px-4 bg-indigo-50 pl-20 pr-20">
      <h2 className="text-2xl font-bold text-fuchsia-600 mb-8">Actualités</h2>

      {/* Grande carte principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {actualites
          .filter((a) => a.taille === "grande")
          .map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 bg-white col-span-1 lg:col-span-2"
            >
              <img
                src={jif}
                alt={item.titre}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.titre}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  onClick={() => window.location.href = "https://cameroonceo.com/2025/03/10/la-journee-internationale-de-la-femme-au-cameroun-en-2025-le-potentiel-economique-des-femmes-camerounaises-sous-les-projecteurs/"}
                  className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
                >
                  Découvrir
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Deux cartes côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actualites
          .filter((a) => a.taille === "petite")
          .map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 bg-white"
            >
              <img
                src={index === 0 ? mentorat : ateliers}
                alt={item.titre}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.titre}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  onClick={() => window.location.href = "https://cameroonceo.com/2025/03/10/la-journee-internationale-de-la-femme-au-cameroun-en-2025-le-potentiel-economique-des-femmes-camerounaises-sous-les-projecteurs/"}
                  className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
                  href={item.lien}

                >
                  Découvrir
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ActualitesSection;
