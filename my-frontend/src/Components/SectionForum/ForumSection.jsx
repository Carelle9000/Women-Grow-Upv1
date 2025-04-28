import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, MessageSquare, User, MessageCircle } from "lucide-react";

function ForumSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Actualités & Événements",
    message: "",
  });

  const categories = [
    {
      title: "Actualités & Événements",
      description: "Restez informé des dernières nouvelles et événements",
      topics: 126,
      messages: 1358,
      isNew: true,
    },
    {
      title: "Style de vie",
      description: "Mode, beauté, décoration et tout ce qui concerne votre quotidien",
      topics: 98,
      messages: 845,
      isNew: false,
    },
    {
      title: "Carrière & Études",
      description: "Conseils professionnels, orientation et développement personnel",
      topics: 87,
      messages: 723,
      isNew: true,
    },
    {
      title: "Art & Créativité",
      description: "Partagez vos créations et trouvez l'inspiration",
      topics: 74,
      messages: 620,
      isNew: false,
    },
  ];

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous traiteriez l'envoi du formulaire
    console.log("Nouveau sujet créé:", formData);
    alert(`Nouveau sujet créé: ${formData.title}`);
    setFormData({ title: "", category: "Actualités & Événements", message: "" });
    handleClosePopup();
  };

  return (
    <section className="px-8 md:px-16 py-12 bg-roseClair/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-4xl text-fuchsia-500 font-bold text-indigoClair">Categories</h2>
          <p className="text-gray-600 mt-2">Explorez les discussions ou démarrez la vôtre.</p>
        </div>
        
        {/* Search + Button */}
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-white rounded-2xl py-2 px-10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 placeholder-gray-400 shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <motion.button 
            className="flex items-center gap-2 bg-fuchsia-600 text-white pl-5 px-12 py-2 rounded-lg hover:bg-fuchsia-800 transition shadow-md text-sm font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenPopup}
          >
            <Plus size={18} />
            Nouveau sujet
          </motion.button>
        </div>
      </div>
      
      {/* Catégories */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-indigoClair">{cat.title}</h3>
              {cat.isNew && (
                <span className="text-xs bg-fuchsia-500 text-white px-2 py-1 rounded-full">Nouveau</span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{cat.description}</p>
            <div className="flex gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><MessageSquare size={14} /> {cat.topics} sujets</span>
              <span className="flex items-center gap-1"><MessageCircle size={14} /> {cat.messages} messages</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup pour nouveau sujet */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePopup}
            />
            
            {/* Modal */}
            <motion.div 
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl z-50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-fuchsia-500">Créer un nouveau sujet</h3>
                <motion.button 
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClosePopup}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Titre du sujet
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Entrez le titre de votre sujet..."
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Catégorie
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50"
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Écrivez votre message ici..."
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 min-h-32"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <motion.button
                    type="button"
                    className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 shadow-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClosePopup}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white shadow-md font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={16} />
                    Créer le sujet
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ForumSection;