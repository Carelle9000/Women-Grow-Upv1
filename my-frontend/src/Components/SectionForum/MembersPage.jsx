
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import apiEND from '/src/API/axios';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 bg-indigo-50 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Une erreur s'est produite</h3>
          <p className="mt-1 text-sm text-gray-500">Veuillez réessayer plus tard.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const [filter, setFilter] = useState('all');
  const [members, setMembers] = useState([]);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [composeMessage, setComposeMessage] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch users and active sessions from API
  useEffect(() => {
    const fetchUsersAndSessions = async () => {
      try {
        setIsLoading(true);

        const usersResponse = await apiEND.get('/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Users API Response:', usersResponse.data);
        const usersData = Array.isArray(usersResponse.data) ? usersResponse.data : [];

        let activeUserIds = [];
        try {
          const sessionsResponse = await apiEND.get('/sessions', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log('Sessions API Response:', sessionsResponse.data);
          activeUserIds = sessionsResponse.data.map(user => user.id);
        } catch (sessionError) {
          console.error('Error fetching sessions:', sessionError);
          console.warn('No active sessions found, setting all users as offline.');
        }

        const validatedMembers = usersData.map(member => ({
          id: member.id,
          name: `${member.prenom} ${member.nom}`,
          email: member.email,
          telephone: member.telephone,
          joinDate: member.created_at
            ? new Date(member.created_at).toLocaleDateString()
            : 'Inconnu',
          role: member.role || 'Membre',
          online: activeUserIds.includes(member.id),
          topics: member.topics || 0,
          messages: member.messages || 0,
          color: member.color || `bg-${['blue', 'green', 'purple', 'pink'][member.id % 4]}-200`,
          initial: member.prenom ? member.prenom[0].toUpperCase() : '?',
        }));

        console.log('Validated Members:', validatedMembers);
        setMembers(validatedMembers);
      } catch (error) {
        console.error('Error fetching users or sessions:', error);
        setError('Impossible de charger les utilisateurs ou les sessions.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersAndSessions();
  }, []);

  // Handle opening the compose modal
  const handleOpenComposeModal = member => {
    if (!member || !member.id || isNaN(member.id)) {
      console.error('Invalid recipient:', member);
      setError('Utilisateur invalide.');
      return;
    }
    setRecipient(member);
    setComposeMessage('');
    setShowComposeModal(true);
    setSuccessMessage(null);
    setError(null);
  };

  const handleSendMessage = async e => {
    e.preventDefault();
    if (!composeMessage.trim() || !recipient || !recipient.id) {
      setError('Destinataire ou message invalide.');
      return;
    }

    const recipientId = parseInt(recipient.id, 10);
    console.log('Sending message:', { recipientId, content: composeMessage });

    try {
      const response = await apiEND.post(
        '/messages',
        {
          recipientId,
          content: composeMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccessMessage('Message envoyé avec succès !');
      setComposeMessage('');
      setTimeout(() => {
        setShowComposeModal(false);
        setSuccessMessage(null);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      console.log('Full error response:', error.response?.data);
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error('Validation errors:', validationErrors);
        setError(
          validationErrors
            ? Object.values(validationErrors).flat().join(' ')
            : 'Erreur de validation des données.'
        );
      } else {
        setError('Impossible d’envoyer le message.');
      }
    }
  };

  // Handle back button
  const handleBack = () => {
    window.history.back();
  };

  // Memoized filtered and sorted members
  const visibleMembers = useMemo(() => {
    let filtered = [...members];

    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === 'online') {
      filtered = filtered.filter(member => member.online);
    } else if (filter === 'staff') {
      filtered = filtered.filter(
        member => member.role === 'Administrateur' || member.role === 'Modérateur'
      );
    }

    if (sortOption === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'activity') {
      filtered.sort((a, b) => (b.messages || 0) - (a.messages || 0));
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [searchQuery, sortOption, filter, members]);

  if (isLoading) {
    return (
      <div className="w-full py-6 text-center bg-indigo-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-gray-600">Chargement des utilisateurs...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-6 text-center bg-indigo-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full py-6 font-sans bg-indigo-50 min-h-screen">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-fuchsia-600 text-2xl hover:text-violet-700 focus:outline-none transition-colors duration-300"
          aria-label="Retour à la page précédente"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-6 px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Membres de la Communauté
        </motion.h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 px-4">
          <motion.div
            className="relative md:w-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-15 pr-3 py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="relative inline-block text-left"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              className="inline-flex justify-between w-48 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {sortOption === 'recent' && 'Plus récent'}
              {sortOption === 'activity' && 'Plus actif'}
              {sortOption === 'alphabetical' && 'Alphabétique'}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showDropdown && (
              <motion.div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {['recent', 'activity', 'alphabetical'].map(option => (
                    <button
                      key={option}
                      className={`block px-4 py-2 text-sm text-left w-full ${
                        sortOption === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                      onClick={() => {
                        setSortOption(option);
                        setShowDropdown(false);
                      }}
                    >
                      {option === 'recent' && 'Plus récent'}
                      {option === 'activity' && 'Plus actif'}
                      {option === 'alphabetical' && 'Alphabétique'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {['all', 'online', 'staff'].map(f => (
              <button
                key={f}
                className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm ${
                  filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' && 'Tous'}
                {f === 'online' && 'En ligne'}
                {f === 'staff' && 'Staff'}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {visibleMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="p-4 border-b bg-white flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`${member.color} w-12 h-12 flex items-center justify-center rounded-full shadow-sm`}
                  >
                    <span className="text-lg font-medium text-gray-700">{member.initial}</span>
                  </div>
                  {member.online && (
                    <div className="absolute bottom-0 right-0">
                      <span className="flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span
                      className={`${
                        member.role === 'Administrateur'
                          ? 'text-red-600'
                          : member.role === 'Modérateur'
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {member.role}
                    </span>
                    <span>•</span>
                    <span>Membre depuis {member.joinDate}</span>
                    {member.online && (
                      <>
                        <span>•</span>
                        <span className="text-green-600">En ligne</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="flex space-x-6">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{member.topics}</span>
                    <span className="text-gray-500 ml-1">sujets</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{member.messages}</span>
                    <span className="text-gray-500 ml-1">messages</span>
                  </div>
                </div>
                <motion.button
                  className="inline-flex items-center px-3 py-1 text-sm leading-4 font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:shadow-outline-pink shadow-sm transition ease-in-out duration-150"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenComposeModal(member)}
                >
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Message
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md mx-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Aucun utilisateur trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              Essayez d'ajuster vos critères de recherche.
            </p>
            <button
              className="mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
                setSortOption('recent');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {showComposeModal && recipient && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Envoyer un message à {recipient.name}
                </h3>
                <button
                  onClick={() => setShowComposeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {successMessage ? (
                  <p className="text-green-600 text-center">{successMessage}</p>
                ) : (
                  <form onSubmit={handleSendMessage}>
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <textarea
                      value={composeMessage}
                      onChange={e => setComposeMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y"
                      rows="4"
                    />
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowComposeModal(false)}
                        className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                      >
                        Annuler
                      </button>
                      <motion.button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
                        whileTap={{ scale: 0.95 }}
                        disabled={!composeMessage.trim()}
                      >
                        Envoyer
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}
