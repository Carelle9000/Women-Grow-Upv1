import { motion } from "framer-motion";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const discussions = [
  {
    id: 1,
    title: "Comment trouver l'inspiration pour la décoration intérieure ?",
    author: "Marie Laurent",
    authorImage: "/src/assets/images/clairemoreau.jpeg", // ← Ton image de profil
    time: "Il y a 2 heures",
    content: "Je cherche à redécorer mon appartement mais je manque d'inspiration. Avez-vous des conseils pour trouver des idées originales sans dépenser une fortune ?",
    tags: ["Épinglé", "Populaire"],
    category: "Style de vie",
    comments: 24,
    views: 152,
  },
  {
    id: 2,
    title: "Astuces pour mieux gérer son temps au travail",
    author: "Sophie Dubois",
    authorImage: "/src/assets/images/femme2.jpg",
    time: "Il y a 5 heures",
    content: "J'ai du mal à organiser mes journées efficacement. Avez-vous des méthodes ou des outils qui fonctionnent pour vous ?",
    tags: ["Populaire"],
    category: "Carrière & Études",
    comments: 15,
    views: 97,
  },
  {
    id: 3,
    title: "Vos livres préférés pour booster la créativité",
    author: "Emma Lefevre",
    authorImage: "/src/assets/images/sophiemartin.jpg",
    time: "Hier",
    content: "Je cherche des livres inspirants pour stimuler mon imagination. Des suggestions ?",
    tags: [],
    category: "Art & Créativité",
    comments: 8,
    views: 75,
  },
];

function RecentDiscussions() {
  return (
    <section className="py-16 px-6 bg-roseClair/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Discussions récentes</h2>

        <div className="flex justify-end gap-4 mb-6">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-roseClair text-gray-700 transition">
            Plus récent
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-roseClair text-gray-700 transition">
            Plus actif
          </button>
        </div>

        <div className="grid gap-6">
          {discussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                {discussion.tags.includes("Épinglé") && (
                  <span className="bg-fuchsia text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Épinglé
                  </span>
                )}
                {discussion.tags.includes("Populaire") && (
                  <span className="bg-pink-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h3 className="font-bold text-lg text-gray-800">{discussion.title}</h3>
              </div>

              {/* Ajout de l'image de l'auteur et du nom */}
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={discussion.authorImage}
                    alt={discussion.author}
                    className="w-8 h-8 rounded-full object-cover shadow-md"
                  />
                  <span>{discussion.author}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{discussion.time}</span>
              </div>

              <p className="text-gray-600 mb-6">
                {discussion.content.length > 200
                  ? discussion.content.substring(0, 200) + "..."
                  : discussion.content}
              </p>

              <div className="flex items-center justify-between border-t pt-4">
                <button className="text-fuchsia hover:underline font-semibold">
                  Lire la suite
                </button>
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <FaRegCommentDots /> {discussion.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <AiOutlineEye /> {discussion.views}
                  </div>
                </div>
              </div>

              {/* Catégorie */}
              <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {discussion.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentDiscussions;
