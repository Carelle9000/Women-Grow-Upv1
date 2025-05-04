import React, { useState, useEffect } from 'react';
import apiEND from 'axios';
import useUser from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, MessageSquare, MessageCircle, Trash2, Edit, Users } from 'lucide-react';

const api = apiEND.create({
  baseURL: 'http://localhost:8000/api',
});

const ForumSection = () => {
  const [thematics, setThematics] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [selectedThematic, setSelectedThematic] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [editReply, setEditReply] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, token } = useUser();

  useEffect(() => {
    fetchThematics();
    console.log('User:', user, 'Token:', token); // Debug auth
    console.log('LocalStorage:', {
      token: localStorage.getItem('token'),
      user_id: localStorage.getItem('user_id'),
      is_admin: localStorage.getItem('is_admin'),
    }); // Debug localStorage
  }, []);

  const fetchThematics = async () => {
    try {
      const response = await api.get('/forum');
      console.log('API response:', response.data); // Debug response
      setThematics(response.data.data.data);
      console.log('Thematics:', response.data.data.data); // Debug thematics
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des sujets');
      console.error(err);
    }
  };

  const fetchThematic = async (slug) => {
    try {
      const response = await api.get(`/forum/${slug}`);
      console.log('Selected thematic:', response.data.data); // Debug thematic
      setSelectedThematic(response.data.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement du sujet');
      console.error(err);
    }
  };

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchedUsers([]);
      return;
    }
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchedUsers(response.data.data);
      console.log('Searched users:', response.data.data); // Debug users
    } catch (err) {
      setError('Erreur lors de la recherche d’utilisateurs');
      console.error(err);
    }
  };

  const handleCreateThematic = async (e) => {
    e.preventDefault();
    // Fallback to localStorage if token from useUser is undefined
    const authToken = token || localStorage.getItem('token');
    console.log('Attempting to create thematic with token:', authToken); // Debug token
    if (!authToken || typeof authToken !== 'string' || authToken.trim() === '') {
      setError('Vous devez être connecté pour créer un sujet');
      console.log('Token invalid or missing:', authToken); // Debug token issue
      return;
    }
    if (!formData.title.trim() || formData.title.length > 255) {
      setError('Le titre est requis et doit contenir moins de 255 caractères');
      return;
    }
    if (!formData.content.trim() || formData.content.length < 10) {
      setError('Le contenu est requis et doit contenir au moins 10 caractères');
      return;
    }
    try {
      console.log('Sending API request with formData:', formData); // Debug request
      const response = await api.post('/forum', formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log('API response:', response.data); // Debug response
      setThematics([response.data.data, ...thematics]);
      setFormData({ title: '', content: '' });
      setSuccess('Sujet créé avec succès');
      setError('');
      setIsPopupOpen(false);
    } catch (err) {
      console.error('Create thematic error:', err.response?.data, err.response?.status); // Debug error
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(', '));
      } else if (err.response?.status === 401) {
        setError('Session invalide. Veuillez vous reconnecter.');
      } else if (err.response?.status === 403) {
        setError('Vous n’êtes pas autorisé à créer un sujet.');
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la création du sujet');
      }
    }
  };

  const handleCreateReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim() || newReply.length < 5) {
      setError('La réponse doit contenir au moins 5 caractères');
      return;
    }
    try {
      const response = await api.post(
        `/forum/${selectedThematic.slug}/replies`,
        { content: newReply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedThematic({
        ...selectedThematic,
        replies: [...selectedThematic.replies, response.data.data],
      });
      setNewReply('');
      setSuccess('Réponse ajoutée');
      setError('');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(', '));
      } else if (err.response?.status === 404) {
        setError('Sujet non trouvé. Vérifiez que le sujet existe.');
      } else if (err.response?.status === 403) {
        setError('Ce débat est clos et n’accepte plus de réponses.');
      } else {
        setError(err.response?.data?.message || "Erreur lors de l'ajout de la réponse");
      }
      console.error('Reply error:', err.response?.data);
    }
  };

  const handleUpdateReply = async (e, replyId) => {
    e.preventDefault();
    if (!editReply.content.trim() || editReply.content.length < 5) {
      setError('La réponse doit contenir au moins 5 caractères');
      return;
    }
    try {
      const response = await api.put(
        `/forum/replies/${replyId}`,
        { content: editReply.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedThematic({
        ...selectedThematic,
        replies: selectedThematic.replies.map((r) =>
          r.id === replyId ? response.data.data : r
        ),
      });
      setEditReply(null);
      setSuccess('Réponse mise à jour');
      setError('');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(', '));
      } else {
        setError('Erreur lors de la mise à jour de la réponse');
      }
      console.error(err);
    }
  };

  const handleDeleteThematic = async (thematicSlug) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce sujet ?')) return;
    try {
      await api.delete(`/forum/${thematicSlug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setThematics(thematics.filter((t) => t.slug !== thematicSlug));
      if (selectedThematic?.slug === thematicSlug) {
        setSelectedThematic(null);
      }
      setSuccess('Sujet supprimé avec succès');
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression du sujet');
      console.error(err);
    }
  };

  const handleCloseThematic = async (thematicSlug) => {
    try {
      await api.post(
        `/forumრંઍ(forum/${thematicSlug}/close`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThematics(
        thematics.map((t) =>
          t.slug === thematicSlug ? { ...t, is_open: false } : t
        )
      );
      if (selectedThematic?.slug === thematicSlug) {
        setSelectedThematic({ ...selectedThematic, is_open: false });
      }
      setSuccess('Sujet clos avec succès');
      setError('');
    } catch (err) {
      setError('Erreur lors de la fermeture du sujet');
      console.error(err);
    }
  };

  const handleAddUsers = async (e) => {
    e.preventDefault();
    if (!selectedUserIds.length) {
      setError('Veuillez sélectionner au moins un utilisateur');
      return;
    }
    try {
      await api.post(
        `/forum/${selectedThematic.slug}/users`,
        { user_ids: selectedUserIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUserIds([]);
      setUserSearch('');
      setSearchedUsers([]);
      setSuccess('Utilisateurs ajoutés avec succès');
      setError('');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(', '));
      } else {
        setError("Erreur lors de l'ajout des utilisateurs");
      }
      console.error(err);
    }
  };

  const handleUserSearchChange = (e) => {
    const query = e.target.value;
    setUserSearch(query);
    searchUsers(query);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="px-8 md:px-16 py-12 bg-rose-100/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl text-purple-500 font-bold">Sujets</h2>
          <p className="text-gray-600 mt-2">Explorez les discussions ou démarrez la vôtre.</p>
        </div>
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
            onClick={() => {
              console.log('Opening new thematic popup'); // Debug
              setIsPopupOpen(true);
            }}
          >
            <Plus size={18} />
            Nouveau sujet
          </motion.button>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {/* Thematics List or Selected Thematic */}
      {!selectedThematic ? (
        <div className="grid md:grid-cols-2 gap-6">
          {thematics.length === 0 ? (
            <p className="text-gray-600">Aucun sujet disponible.</p>
          ) : (
            thematics.map((thematic, index) => (
              <motion.div
                key={thematic.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-2xl font-bold text-indigo-900 cursor-pointer hover:underline"
                    onClick={() => fetchThematic(thematic.slug)}
                  >
                    {thematic.title}
                  </h3>
                  <div className="flex gap-2">
                    {!thematic.is_open && (
                      <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">Clos</span>
                    )}
                    {(thematic.user_id === user?.id || user?.is_admin) && (
                      <motion.button
                        onClick={() => handleDeleteThematic(thematic.slug)}
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{thematic.content.substring(0, 100)}...</p>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> {thematic.replies_count || 0} réponses
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> Par {thematic.user?.nom || 'Utilisateur'}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div>
          <motion.button
            onClick={() => setSelectedThematic(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour
          </motion.button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{selectedThematic.title}</h2>
            {(selectedThematic.user_id === user?.id || user?.is_admin) && (
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleDeleteThematic(selectedThematic.slug)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Supprimer le sujet
                </motion.button>
                {selectedThematic.is_open && (
                  <motion.button
                    onClick={() => handleCloseThematic(selectedThematic.slug)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Fermer le sujet
                  </motion.button>
                )}
              </div>
            )}
          </div>
          {selectedThematic && (
            <div className="p-4 bg-gray-100 rounded-2xl mb-4">
              <p>{selectedThematic.content}</p>
              <p className="text-gray-600 mt-2">
                Par {selectedThematic.user?.nom || 'Utilisateur'} |{' '}
                {new Date(selectedThematic.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4">Réponses</h3>
          <div className="space-y-4 mb-4">
            {selectedThematic.replies?.length ? (
              selectedThematic.replies.map((reply) => (
                <motion.div
                  key={reply.id}
                  className="p-4 bg-white rounded-2xl shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {editReply?.id === reply.id ? (
                    <form onSubmit={(e) => handleUpdateReply(e, reply.id)}>
                      <textarea
                        value={editReply.content}
                        onChange={(e) => setEditReply({ ...editReply, content: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 min-h-24 mb-4"
                        rows={4}
                      />
                      <div className="flex gap-3 justify-end">
                        <motion.button
                          type="button"
                          onClick={() => setEditReply(null)}
                          className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 shadow-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Annuler
                        </motion.button>
                        <motion.button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white shadow-md font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Enregistrer
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <>
                     <p>{reply.content}</p>
                      <p className="text-gray-600 mt-2">
                        Par {reply.user?.nom || 'Utilisateur'} |{' '}
                        {new Date(reply.created_at).toLocaleDateString()}
                        {reply.edited_at && ' (modifié)'}
                      </p>
                      {reply.user_id === user?.id && (
                        <motion.button
                          onClick={() => setEditReply({ id: reply.id, content: reply.content })}
                          className="mt-2 text-fuchsia-500 hover:text-fuchsia-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit size={16} />
                        </motion.button>
                      )}
                    </>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">Aucune réponse pour ce sujet.</p>
            )}
          </div>

          {selectedThematic.is_open && token && (
            <div className="p-4 bg-gray-100 rounded-2xl mb-4">
              <h3 className="text-lg font-semibold mb-4">Ajouter une réponse</h3>
              <textarea
                placeholder="Votre réponse"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 min-h-24 mb-4"
              />
              <motion.button
                onClick={handleCreateReply}
                className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white shadow-md font-medium flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                Répondre
              </motion.button>
            </div>
          )}

          {(selectedThematic.user_id === user?.id || user?.is_admin) && (
            <div className="p-4 bg-gray-100 rounded-2xl mb-4">
              <h3 className="text-lg font-semibold mb-4">Ajouter des utilisateurs</h3>
              <form onSubmit={handleAddUsers}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Rechercher par prénom ou nom..."
                    value={userSearch}
                    onChange={handleUserSearchChange}
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {searchedUsers.length > 0 && (
                  <div className="mb-4 max-h-48 overflow-y-auto bg-white rounded-lg shadow-sm p-2">
                    {searchedUsers.map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(u.id)}
                          onChange={() => toggleUserSelection(u.id)}
                          className="h-4 w-4 text-fuchsia-600"
                        />
                        <span>{u.prenom} {u.nom}</span>
                      </div>
                    ))}
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white shadow-md font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users size={16} />
                  Ajouter
                </motion.button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Popup for new thematic */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl z-50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-fuchsia-500">Créer un nouveau sujet</h3>
                <motion.button
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPopupOpen(false)}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <form onSubmit={handleCreateThematic}>
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
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Votre message
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
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
                    onClick={() => setIsPopupOpen(false)}
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
};

export default ForumSection;