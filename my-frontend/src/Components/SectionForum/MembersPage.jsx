// MembersPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const [filter, setFilter] = useState('all');
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Sophie Dubois',
      role: 'Administrateur',
      joinDate: 'Mars 2025',
      topics: 34,
      messages: 287,
      initial: 'S',
      color: 'bg-pink-200',
      online: true
    },
    {
      id: 2,
      name: 'Claire Martin',
      role: 'Modérateur',
      joinDate: 'Janvier 2025',
      topics: 19,
      messages: 142,
      initial: 'C',
      color: 'bg-pink-200',
      online: false
    },
    {
      id: 3,
      name: 'Marie Laurent',
      role: 'Membre',
      joinDate: 'Avril 2025',
      topics: 7,
      messages: 53,
      initial: 'M',
      color: 'bg-pink-200',
      online: true
    },
    {
      id: 4,
      name: 'Lucie Girard',
      role: 'Membre',
      joinDate: 'Février 2025',
      topics: 12,
      messages: 89,
      initial: 'L',
      color: 'bg-pink-200',
      online: false
    },
    {
      id: 5,
      name: 'Emma Petit',
      role: 'Membre',
      joinDate: 'Mars 2025',
      topics: 5,
      messages: 41,
      initial: 'E',
      color: 'bg-pink-200',
      online: true
    },
    {
      id: 6,
      name: 'Léa Bernard',
      role: 'Modérateur',
      joinDate: 'Janvier 2025',
      topics: 23,
      messages: 176,
      initial: 'L',
      color: 'bg-pink-200',
      online: true
    },
    {
      id: 7,
      name: 'Camille Rousseau',
      role: 'Membre',
      joinDate: 'Avril 2025',
      topics: 8,
      messages: 67,
      initial: 'C',
      color: 'bg-pink-200',
      online: false
    },
    {
      id: 8,
      name: 'Chloé Lemoine',
      role: 'Membre',
      joinDate: 'Février 2025',
      topics: 15,
      messages: 124,
      initial: 'C',
      color: 'bg-pink-200',
      online: false
    },
    {
      id: 9,
      name: 'Inès Durand',
      role: 'Membre',
      joinDate: 'Mars 2025',
      topics: 4,
      messages: 29,
      initial: 'I',
      color: 'bg-pink-200',
      online: true
    }
  ]);
  const [visibleMembers, setVisibleMembers] = useState([]);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter and sort members
  useEffect(() => {
    let filtered = [...members];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply role filter
    if (filter === 'online') {
      filtered = filtered.filter(member => member.online);
    } else if (filter === 'staff') {
      filtered = filtered.filter(member => 
        member.role === 'Administrateur' || member.role === 'Modérateur'
      );
    }
    
    // Apply sorting
    if (sortOption === 'recent') {
      // Sort by newest members first (assuming April > Mars > Février > Janvier)
      const dateOrder = { 'Avril': 4, 'Mars': 3, 'Février': 2, 'Janvier': 1 };
      filtered.sort((a, b) => {
        const monthA = a.joinDate.split(' ')[0];
        const monthB = b.joinDate.split(' ')[0];
        return dateOrder[monthB] - dateOrder[monthA];
      });
    } else if (sortOption === 'activity') {
      filtered.sort((a, b) => b.messages - a.messages);
    } else if (sortOption === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setVisibleMembers(filtered);
  }, [searchQuery, sortOption, filter, members]);

  // Handle sending a message
  const handleMessageClick = (memberId) => {
    // Animation for message button
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return { ...member, messageClicked: true };
      }
      return member;
    });
    
    setMembers(updatedMembers);
    
    // Reset animation after a moment
    setTimeout(() => {
      const resetMembers = members.map(member => {
        if (member.id === memberId) {
          return { ...member, messageClicked: false };
        }
        return member;
      });
      setMembers(resetMembers);
    }, 500);
    
    alert(`Message envoyé à ${members.find(m => m.id === memberId).name}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Membres
      </motion.h1>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        {/* Search bar */}
        <motion.div 
          className="relative md:w-64"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm"
            placeholder="Rechercher un membre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Dropdown for sort options */}
        <motion.div 
          className="relative inline-block text-left"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <button
              type="button"
              className="inline-flex justify-between w-48 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {sortOption === 'recent' && 'Plus récent'}
              {sortOption === 'activity' && 'Plus actif'}  
              {sortOption === 'alphabetical' && 'Alphabétique'}
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {showDropdown && (
            <motion.div 
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className={`block px-4 py-2 text-sm text-left w-full ${sortOption === 'recent' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => {
                    setSortOption('recent');
                    setShowDropdown(false);
                  }}
                >
                  Plus récent
                </button>
                <button
                  className={`block px-4 py-2 text-sm text-left w-full ${sortOption === 'activity' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => {
                    setSortOption('activity');
                    setShowDropdown(false);
                  }}
                >
                  Plus actif
                </button>
                <button
                  className={`block px-4 py-2 text-sm text-left w-full ${sortOption === 'alphabetical' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                  onClick={() => {
                    setSortOption('alphabetical');
                    setShowDropdown(false);
                  }}
                >
                  Alphabétique
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm ${filter === 'online' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('online')}
          >
            En ligne
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm ${filter === 'staff' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('staff')}
          >
            Staff
          </button>
        </motion.div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className={`${member.color} w-12 h-12 flex items-center justify-center rounded-full shadow-sm`}>
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
                  <span className={`${member.role === 'Administrateur' ? 'text-red-600' : member.role === 'Modérateur' ? 'text-blue-600' : 'text-gray-600'}`}>
                    {member.role}
                  </span>
                  <span>•</span>
                  <span>Membre depuis {member.joinDate}</span>
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
                className={`inline-flex items-center px-3 py-1 text-sm leading-4 font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:shadow-outline-pink shadow-sm transition ease-in-out duration-150 ${member.messageClicked ? 'scale-95' : ''}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMessageClick(member.id)}
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
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun membre trouvé</h3>
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
    </div>
  );
}