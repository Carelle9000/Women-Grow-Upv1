import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function AddArticleButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '💼 Entrepreneuriat & Indépendance Financière',
    image: null,
    readTime: 5,
    reportUrl: '', // Nouveau champ pour l'URL du rapport
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirm('Article soumis:', formData);
    setFormData({
      title: '',
      content: '',
      category: '💼 Entrepreneuriat & Indépendance Financière',
      image: null,
      readTime: 5,
      reportUrl: '',
    });
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="sticky bottom-8 right-8 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg transition-all duration-300"
      >
        <Plus size={20} className="mr-2" />
        Ajouter un article
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-bold text-purple-800">Créer un nouvel article</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="💼 Entrepreneuriat & Indépendance Financière">💼 Entrepreneuriat & Indépendance Financière</option>
                  <option value="🌟 Empowerment & Leadership">🌟 Empowerment et Leadership</option>
                  <option value="🎓 Éducation & Développement Personnel">🎓 Éducation & Développement Personnel</option>
                  <option value="👩🏾‍🤝‍👩🏽 Rôle Modèle & Témoignages">👩🏾‍🤝‍👩🏽 Rôle Modèle & Témoignagest</option>
                  <option value="🧘🏽‍♀️ Bien-être & Santé Mentale">🧘🏽‍♀️ Bien-être & Santé Mentale</option>
                  <option value="🌍 Société, Culture & Engagement">🌍 Société, Culture & Engagement</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="readTime">
                  Temps de lecture (minutes)
                </label>
                <input
                  type="number"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  min="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Image de couverture
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportUrl">
                  URL du Rapport (optionnel)
                </label>
                <input
                  type="url"
                  id="reportUrl"
                  name="reportUrl"
                  value={formData.reportUrl}
                  onChange={handleChange}
                  placeholder="Exemple : https://powerdrill.ai/report/123"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Contenu
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}