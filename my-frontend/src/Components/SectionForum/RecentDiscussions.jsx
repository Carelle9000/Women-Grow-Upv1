import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Eye, Plus } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';


// Axios instance for API requests
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});


// Placeholder image for users without avatars
const defaultAvatar ='../assets/images/userpp.jpeg';; // Replace with your default avatar image path};

function RecentDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState('recent'); // 'recent' or 'active'
  const [replyInputs, setReplyInputs] = useState({}); // { discussionId: inputValue }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isAuthenticated = !!localStorage.getItem('token');

  // Fetch discussions on mount
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/forum');
        const fetchedDiscussions = response.data.data.data.map((item) => {
          if (!item.slug) {
            console.warn('Discussion missing slug:', item);
          }
          {console.log(item.user.photo)}
          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            author: item.user?.nom || 'Utilisateur',
            authorImage: item.user.photo? `http://localhost:8000/storage/${item.user.photo}` : {defaultAvatar},
            time: formatDistanceToNow(parseISO(item.created_at), { addSuffix: true, locale: fr }),
            created_at: item.created_at,
            content: item.content,
            tags: item.tags || [],
            category: item.category || 'Général',
            comments: item.replies_count || 0,
            views: item.views_count || 0,
            replies: item.replies || [],
            is_open: item.is_open !== false, // Default to true if not provided
          };
        });
        console.log('Fetched discussions:', response.data.data.data); // Debug log
        setDiscussions(fetchedDiscussions);
        setError('');
      } catch (err) {
        setError('Erreur lors du chargement des discussions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  // Handle reply input changes
  const handleReplyChange = (discussionId, value) => {
    setReplyInputs((prev) => ({ ...prev, [discussionId]: value }));
  };

  // Submit a reply
  const handleCreateReply = async (e, discussion) => {
    e.preventDefault();
    const content = replyInputs[discussion.id] || '';
    console.log('Posting reply to slug:', discussion.slug); // Debug log
    if (!content.trim() || content.length < 5) {
      setError('La réponse doit contenir au moins 5 caractères');
      return;
    }
    if (!discussion.slug) {
      setError('Erreur : Discussion non valide');
      return;
    }

    try {
      const response = await api.post(
        `/forum/${discussion.slug}/replies`,
        { content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const newReply = response.data.data;
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussion.id
            ? {
                ...d,
                comments: d.comments + 1,
                replies: [...d.replies, newReply],
              }
            : d
        )
      );
      setReplyInputs((prev) => ({ ...prev, [discussion.id]: '' }));
      setSuccess('Réponse ajoutée avec succès');
      setError('');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(', '));
      } else if (err.response?.status === 401) {
        setError('Vous devez être connecté pour répondre');
      } else if (err.response?.status === 403) {
        setError('Ce débat est clos et n’accepte plus de réponses');
      } else if (err.response?.status === 404) {
        setError('Discussion non trouvée. Vérifiez que le sujet existe.');
      } else {
        setError('Erreur lors de l’ajout de la réponse');
      }
      console.error('Reply error:', err.response?.data);
    }
  };

  // Sort discussions based on filter
  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (filter === 'recent') {
      // Sort by created_at (most recent first)
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      // Sort by activity (higher comments + views first)
      const activityA = a.comments + a.views;
      const activityB = b.comments + b.views;
      return activityB - activityA;
    }
  });

  return (
    <section className="px-8 md:px-16 py-12 bg-rose-100/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-500 ">Discussions récentes</h2>

        {/* Filter Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <motion.button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'recent'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-100'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter('recent')}
          >
            Plus récent
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'active'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-100'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter('active')}
          >
            Plus actif
          </motion.button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600">Chargement des discussions...</div>
        )}

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Discussion Cards */}
        {!loading && (
          <div className="grid gap-6">
            {sortedDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                className="bg-white rounded-2xl shadow-md p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Tags and Title */}
                <div className="flex items-center gap-2 mb-4">
                  {discussion.tags.includes('Épinglé') && (
                    <span className="bg-fuchsia-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Épinglé
                    </span>
                  )}
                  {discussion.tags.includes('Populaire') && (
                    <span className="bg-fuchsia-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Populaire
                    </span>
                  )}
                  <h3 className="font-bold text-xl text-indigo-900">{discussion.title}</h3>
                </div>

                {/* Author Info */}
                {console.log(discussion)}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={discussion.authorImage}
                      alt={discussion.author}
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                    />
                    <span>{discussion.author}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <span>{discussion.time}</span>
                </div>

                {/* Content Preview */}
                <p className="text-gray-600 mb-6">
                  {discussion.content.length > 200
                    ? discussion.content.substring(0, 200) + '...'
                    : discussion.content}
                </p>

                {/* Actions and Stats */}
                <div className="flex items-center justify-between border-t pt-4">
                       <button className="text-fuchsia-500 hover:underline font-semibold">
                    Lire la suite
                  </button>
                  
                  
                </div>

                {/* Category */}
                <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {discussion.category}
                </div>

                {/* Reply Form */}
                <AnimatePresence>
                  {isAuthenticated && discussion.slug && discussion.is_open ? (
                    <motion.div
                      className="mt-4 p-4 bg-gray-100 rounded-2xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-lg font-semibold mb-2">Ajouter une réponse</h4>
                      <form onSubmit={(e) => handleCreateReply(e, discussion)}>
                        <textarea
                          placeholder="Votre réponse"
                          value={replyInputs[discussion.id] || ''}
                          onChange={(e) => handleReplyChange(discussion.id, e.target.value)}
                          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 min-h-24 mb-4"
                          rows={4}
                        />
                        <motion.button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white shadow-md font-medium flex items-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus size={16} />
                          Répondre
                        </motion.button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="mt-4 text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {isAuthenticated
                        ? discussion.slug
                          ? 'Ce débat est clos et n’accepte plus de réponses.'
                          : 'Cette discussion n’est pas disponible pour répondre.'
                        : 'Connectez-vous pour répondre à cette discussion.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Display Replies */}
                {discussion.replies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Réponses</h4>
                    <div className="space-y-4">
                      {discussion.replies.map((reply) => (
                        <motion.div
                          key={reply.id}
                          className="p-4 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {console.log(reply)}
                          <p className="text-gray-600">{reply.content}</p>
                          <p className="text-gray-500 text-sm mt-2">
                            Par {reply.user?.nom || 'Utilisateur'} |{' '}
                            {formatDistanceToNow(parseISO(reply.created_at), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentDiscussions;