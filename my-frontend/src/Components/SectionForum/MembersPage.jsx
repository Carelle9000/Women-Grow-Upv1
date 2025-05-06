import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiEND from '/src/API/axios';
import Pusher from 'pusher-js';

// Error Boundary Component
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-900">Une erreur s'est produite</h3>
                        <p className="mt-1 text-sm text-gray-500">Veuillez réessayer plus tard.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function MembersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pusherChannel, setPusherChannel] = useState(null);
    const loggedInUserId = useMemo(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).id : null;
    }, []);

    useEffect(() => {
        const fetchUsersAndSessions = async () => {
            try {
                setIsLoading(true);

                const usersResponse = await apiEND.get('/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const usersData = Array.isArray(usersResponse.data)
                    ? usersResponse.data
                    : usersResponse.data.data || [];

                let activeUserIds = [];
                try {
                    const sessionsResponse = await apiEND.get('/sessions', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
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

    useEffect(() => {
        if (loggedInUserId) {
            const pusher = new Pusher('4f8c8bf1cb185a73ab3c', {
                cluster: 'eu',
                encrypted: true,
                authEndpoint: '/broadcasting/auth',
            });

            const channel = pusher.subscribe(`private-chat.${loggedInUserId}`);
            setPusherChannel(channel);

            channel.bind('new-message', (data) => {
                console.log('Received new message via Pusher:', data);
                if (
                    selectedContact &&
                    ((data.sender_id === loggedInUserId && data.recipient_id === selectedContact.id) ||
                        (data.sender_id === selectedContact.id && data.recipient_id === loggedInUserId))
                ) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
            });

            return () => {
                channel.unbind_all();
                channel.unsubscribe();
            };
        }
    }, [loggedInUserId, selectedContact]);

    const handleSendMessage = useCallback(async () => {
        if (!newMessage.trim() || !selectedContact) {
            return;
        }

        try {
            await apiEND.post(
                '/messages/send',
                {
                    recipient_id: selectedContact.id,
                    content: newMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Impossible d\'envoyer le message.');
        }
    }, [newMessage, selectedContact]);

    const handleSelectContact = (member) => {
        setSelectedContact(member);
        setMessages([]);
    };

    const handleBack = () => {
        window.history.back();
    };

    const visibleMembers = useMemo(() => {
        return members.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, members]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="ml-2 text-lg text-gray-700">Chargement des membres...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <p className="text-lg text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Sticky Navbar */}
                <nav className="bg-fuchsia-700 text-white shadow-lg fixed top-0 left-0 right-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center space-x-3">
                                <button onClick={handleBack} className="text-white hover:text-gray-200 focus:outline-none">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <Link to='/'>
                                    <h1 className="text-xl font-bold tracking-tight">WOMEN GROW UP</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content with top padding to account for fixed navbar */}
                <div className="flex flex-1 pt-16">
                    {/* Sidebar (Contact List) */}
                    <aside className="bg-white w-80 border-r shadow-sm fixed top-16 bottom-0 overflow-y-auto p-4 z-10">
                        <motion.h2
                            className="text-xl font-semibold text-gray-800 mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Membres de la communauté
                        </motion.h2>
                        <div className="mb-4 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-150 ease-in-out sm:text-sm"
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            {visibleMembers.map(member => (
                                <motion.div
                                    key={member.id}
                                    className={`bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 p-3 cursor-pointer flex items-center space-x-3 ${selectedContact?.id === member.id ? 'bg-indigo-50 border border-indigo-300' : ''}`}
                                    onClick={() => handleSelectContact(member)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: visibleMembers.indexOf(member) * 0.05 }}
                                >
                                    <div className="relative">
                                        <div
                                            className={`${member.color} w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold text-gray-700`}
                                        >
                                            {member.initial}
                                        </div>
                                        {member.online && (
                                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                                        )}
                                    </div>
                                    <span className="text-gray-800">{member.name}</span>
                                </motion.div>
                            ))}
                            {visibleMembers.length === 0 && (
                                <div className="text-center py-4 text-gray-500">Aucun membre trouvé</div>
                            )}
                        </div>
                    </aside>

                    {/* Message Area */}
                    <main className="flex-1 bg-gray-50 ml-80 flex flex-col h-screen">
                        {selectedContact ? (
                            <div className="flex flex-col flex-1">
                                {/* Header */}
                                <motion.div
                                    className="border-b py-3 flex items-center space-x-4 bg-white shadow-sm rounded-lg px-4 sticky top-16 z-10"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="relative">
                                        <div
                                            className={`${selectedContact.color} w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold text-gray-700`}
                                        >
                                            {selectedContact.initial}
                                        </div>
                                        {selectedContact.online && (
                                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h3>
                                </motion.div>

                                {/* Message List */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            className={`rounded-lg shadow-sm p-3 max-w-xs ${msg.sender_id === loggedInUserId ? 'bg-indigo-100 ml-auto text-right' : 'bg-white mr-auto'}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                        >
                                            <p className="text-gray-800">{msg.content}</p>
                                            <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sticky Input Area */}
                                <div className="bg-white border-t py-4 px-6 shadow-lg sticky bottom-0 z-10">
                                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-3 max-w-7xl mx-auto">
                                        <input
                                            type="text"
                                            className="flex-1 rounded-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                            placeholder="Tapez votre message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <motion.button
                                            type="submit"
                                            className="bg-fuchsia-500 hover:bg-fuchsia-00 text-white font-semibold rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            whileTap={{ scale: 0.95 }}
                                            disabled={!newMessage.trim()}
                                        >
                                            Envoyer
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                className="flex flex-col justify-center items-center h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <p className="text-lg text-gray-600">Sélectionnez un contact pour démarrer une conversation.</p>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
}