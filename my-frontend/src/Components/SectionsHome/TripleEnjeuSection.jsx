import React, { useState } from "react";
import imgEconomie from "@/assets/images/economie1.jpeg";
import imgSocial from "@/assets/images/social.jpg";
import imgSocietal from "@/assets/images/societal.jpeg";
import { PlusCircle } from "lucide-react";

const TripleEnjeuSection = () => {
  const [activeBlock, setActiveBlock] = useState("economique");

  const renderFullBlock = (title, image, content, key, bgColor) => (
    <div className="flex max-w-3xl shadow-lg">
      <img src={image} alt={title} className="w-[200px] h-[400px] object-cover rounded-2xl z-20" />
      <div className={`${bgColor} text-white p-8 max-w-[600px] rounded-2xl pl-10 z-10`}>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-lg leading-relaxed ml-2.5">{content}</p>
      </div>
    </div>
  );
  

  const renderCollapsedBlock = (title, image, key) => (
    <div
      onClick={() => setActiveBlock(key)}
      className="cursor-pointer relative w-[180px] h-[400px] rounded-2xl overflow-hidden shadow-md"
    >
      <img src={image} alt={title} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black/20 flex flex-col gap-5 justify-center items-center">
        <PlusCircle className="text-white mb-7" />
        <h3 className="text-white text-2xl rotate-90 origin-center">{title}</h3>
      </div>
    </div>
  );

  return (
    <section className="px-10 py-16 bg-indigo-50 text-white font-Tienne justify-center  pr-4">
      <h2 className="text-2xl font-bold text-fuchsia-600 ml-6 mb-8">Un triple enjeu</h2>

      <div className="flex flex-wrap gap-10 justify-center items-center pr-4">
        {activeBlock === "economique"
          ? renderFullBlock(
              "Économique",
              imgEconomie,
              `Dans un monde où l’économie repose de plus en plus sur l’innovation et la
               productivité, la protection et l’insertion des femmes dans la société ne sont
               pas seulement une question de justice sociale, mais aussi un impératif
               économique. Au Cameroun comme ailleurs, garantir la sécurité, l’éducation et
               l’inclusion professionnelle des femmes constitue un puissant moteur de
               croissance et de développement durable.`,
              "economique",
              "bg-fuchsia-800"
            )
          : renderCollapsedBlock("Économique", imgEconomie, "economique")}

        {activeBlock === "social"
          ? renderFullBlock(
              "Social",
              imgSocial,
              `Le lien social est renforcé lorsque les femmes ont les moyens d’agir, de participer
               et de contribuer aux décisions collectives. Favoriser l’égalité réduit les
               discriminations et les tensions, et renforce la cohésion dans toutes les
               sphères de la société. Au Cameroun encore, les associations et les regroupements
               sociales du genre contribuent de plus a leur epanouissement.`,
              "social",
              "bg-green-800" 
            )
          : renderCollapsedBlock("Social", imgSocial, "social")}

        {activeBlock === "societal"
          ? renderFullBlock(
              "Sociétal",
              imgSocietal,
              `Les enjeux de société exigent une transformation profonde des mentalités et des
               structures. L’égalité femmes-hommes est un pilier des sociétés inclusives,
               justes et résilientes face aux défis actuels.`,
              "societal",
              "bg-blue-800"
            )
          : renderCollapsedBlock("Sociétal", imgSocietal, "societal")}
      </div>
    </section>
  );
};

export default TripleEnjeuSection;
