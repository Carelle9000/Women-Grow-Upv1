import { useState, useEffect, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo1 from  '/src/assets/images/1.jpeg'
import {
  Clock,
  MessageCircle,
  BookOpen,
  Activity,
  CalendarDays,
  Bell,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import TaskCalendar from './TaskCalendar';

// Couleurs pour les graphiques
const COLORS = ['#9c27b0', '#e91e63', '#5e35b1'];

// Données de secours (fallback)
const fallbackData = {
  forumActivityData: [
    { name: 'Lun', posts: 4, replies: 2, total: 6 },
    { name: 'Mar', posts: 6, replies: 3, total: 9 },
    { name: 'Mer', posts: 3, replies: 1, total: 4 },
    { name: 'Jeu', posts: 7, replies: 4, total: 11 },
    { name: 'Ven', posts: 5, replies: 2, total: 7 },
    { name: 'Sam', posts: 8, replies: 3, total: 11 },
    { name: 'Dim', posts: 2, replies: 1, total: 3 },
  ],
  messageData: [
    { name: 'Envoyés', value: 45 },
    { name: 'Reçus', value: 32 },
    { name: 'Non lus', value: 8 },
  ],
  interactions: [
    { id: 1, name: 'Sophie Martin', photo: {photo1}, lastMessage: '15 min' },
    { id: 2, name: 'Marie Dupont', photo: {photo1}, lastMessage: '1 jour' },
    { id: 3, name: 'Jeanne Dubois', photo: {photo1}, lastMessage: '2 jours' },
    { id: 4, name: 'Lucie Bernard', photo: {photo1}, lastMessage: '3 jours' },
  ],
  articles: [
    { id: 1, title: 'Comment réussir sa vie professionnelle', readDate: '26 Avr 2025' },
    { id: 2, title: 'Les défis du leadership au féminin', readDate: '24 Avr 2025' },
    { id: 3, title: 'Équilibre vie pro/perso: mythes et réalités', readDate: '22 Avr 2025' },
    { id: 4, title: 'Négocier son salaire efficacement', readDate: '20 Avr 2025' },
  ],
  sessionLogs: [
    { date: '30 Avr 2025', duration: '45 min', activity: 'Forum, Articles' },
    { date: '28 Avr 2025', duration: '32 min', activity: 'Messages, Événements' },
    { date: '25 Avr 2025', duration: '58 min', activity: 'Forum, Profil' },
  ],
  events: [
    { id: 1, title: 'Conférence Leadership', date: '12 Mai 2025', time: '14:00', location: 'Paris' },
    { id: 2, title: 'Webinaire Gestion de Carrière', date: '15 Mai 2025', time: '18:30', location: 'En ligne' },
    { id: 3, title: 'Atelier CV et LinkedIn', date: '20 Mai 2025', time: '10:00', location: 'Lyon' },
    { id: 4, title: 'Networking Café', date: '25 Mai 2025', time: '19:00', location: 'Bordeaux' },
  ],
  notifications: {
    count: 0,
    data: [],
  },
};

// Configuration de l'API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: 'Utilisateur inconnu',
    photo: {photo1},
  });
  const [stats, setStats] = useState({
    totalTime: '0h 0min',
    visits: 0,
    messages: 0,
    articlesRead: 0,
  });
  const [sessionLogs, setSessionLogs] = useState(fallbackData.sessionLogs);
  const [forumActivityData, setForumActivityData] = useState(fallbackData.forumActivityData);
  const [messageData, setMessageData] = useState(fallbackData.messageData);
  const [interactions, setInteractions] = useState(fallbackData.interactions);
  const [articles, setArticles] = useState(fallbackData.articles);
  const [events, setEvents] = useState(fallbackData.events);
  const [notifications, setNotifications] = useState({
    count: 0,
    data: [],
    showPopup: false,
  });
  const [messages, setMessages] = useState({ count: 0, data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mise à jour de la date et de l'heure
  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString('fr-FR', options));
    };

    const formatTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };

    formatDate();
    formatTime();
    const timeInterval = setInterval(formatTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Fonction pour récupérer les données avec authentification
  const fetchWithAuth = async (url) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Utilisateur non authentifié');
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      }
      throw new Error(`Erreur lors de la récupération des données de ${url}: ${error.response?.data?.message || error.message}`);
    }
  };

  // Marquer toutes les notifications comme lues
  const markNotificationsAsRead = async () => {
    try {
      await api.post(
        '/notifications/mark-as-read',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotifications(prev => ({
        ...prev,
        count: 0,
        data: [],
        showPopup: false,
      }));
    } catch (err) {
      console.error('Erreur lors du marquage des notifications comme lues:', err);
      setError('Impossible de marquer les notifications comme lues.');
    }
  };

  // Simuler des actions pour déclencher des notifications
  const simulateSendMessage = () => {
    // Note: Le backend doit générer la notification
    setMessages(prev => ({
      ...prev,
      count: prev.count + 1,
    }));
  };

  const simulateReadArticle = () => {
    setStats(prev => ({ ...prev, articlesRead: prev.articlesRead + 1 }));
    // Note: Le backend doit générer la notification
  };

  const simulateJoinEvent = () => {
    // Note: Le backend doit générer la notification
  };

  // Récupération et mise en cache des données
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      // Vérifier le cache
      const cachedData = localStorage.getItem('dashboardData');
      if (cachedData) {
        const {
          userInfo: cachedUserInfo,
          stats: cachedStats,
          sessionLogs: cachedSessionLogs,
          forumActivityData: cachedForumActivityData,
          messageData: cachedMessageData,
          interactions: cachedInteractions,
          articles: cachedArticles,
          events: cachedEvents,
          notifications: cachedNotifications,
          messages: cachedMessages,
        } = JSON.parse(cachedData);
        setUserInfo(cachedUserInfo);
        setStats(cachedStats);
        setSessionLogs(cachedSessionLogs);
        setForumActivityData(cachedForumActivityData);
        setMessageData(cachedMessageData);
        setInteractions(cachedInteractions);
        setArticles(cachedArticles);
        setEvents(cachedEvents);
        setNotifications({ ...cachedNotifications, showPopup: false });
        setMessages(cachedMessages);
        setIsLoading(false);
      }

      try {
        const [
          userResponse,
          sessionsResponse,
          forumResponse,
          conversationsResponse,
          postsResponse,
          eventsResponse,
          notificationsResponse,
          
        ] = await Promise.all([
          fetchWithAuth('/me').catch(err => {
            console.error('Erreur user:', err);
            return { id: null };
          }),
          fetchWithAuth('/sessions').catch(err => {
            console.error('Erreur sessions:', err);
            return { data: [] };
          }),
          fetchWithAuth('/forum').catch(err => {
            console.error('Erreur forum:', err);
            return { data: [] };
          }),
          fetchWithAuth('/conversations').catch(err => {
            console.error('Erreur conversations:', err);
            return { data: [] };
          }),
          fetchWithAuth('/posts').catch(err => {
            console.error('Erreur posts:', err);
            return { data: [] };
          }),
          fetchWithAuth('/events').catch(err => {
            console.error('Erreur events:', err);
            return { data: [] };
          }),
          fetchWithAuth('/notifications').catch(err => {
            console.error('Erreur notifications:', err);
            return { success: false, notificattions: [] };
          }),
        ]);

        const userInfoData = {
          id: userResponse.id || null,
          name: userResponse.nom || userResponse.name || 'Utilisateur inconnu',
          photo: userResponse.photo
            ? `http://localhost:8000/storage/${userResponse.photo}`
            : {photo1},
        };

        const sessions = Array.isArray(sessionsResponse.data) ? sessionsResponse.data : [];
        const totalTimeMinutes = sessions.reduce((acc, session) => {
          const duration = parseInt(session.duration || 0, 10);
          return acc + (isNaN(duration) ? 0 : duration);
        }, 0);
        const hours = Math.floor(totalTimeMinutes / 60);
        const minutes = totalTimeMinutes % 60;
        const totalTime = `${hours}h ${minutes}min`;
        const visits = sessions.length;

        const conversations = Array.isArray(conversationsResponse.data) ? conversationsResponse.data : [];
        const messagesCount = conversations.reduce((acc, conv) => {
          return acc + (Array.isArray(conv.messages) ? conv.messages.length : 0);
        }, 0);

        const posts = Array.isArray(postsResponse.data) ? postsResponse.data : [];
        const articlesRead = posts.filter(post => post.read).length;

        const forumData = Array.isArray(forumResponse.data) ? forumResponse.data : [];
        let forumPosts = [];
        let forumReplies = [];

        if (forumData.length > 0 && forumData[0]?.posts) {
          forumPosts = forumData.flatMap(thematic =>
            Array.isArray(thematic.posts) ? thematic.posts : []
          );
        } else if (forumData.length > 0 && forumData[0]?.created_at) {
          forumPosts = forumData;
        }

        forumPosts.forEach(post => {
          if (post.replies && Array.isArray(post.replies)) {
            forumReplies = [...forumReplies, ...post.replies];
          }
        });

        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const forumActivity = days.map((day, index) => {
          const dayIndex = (index + 1) % 7;
          const postsCount = forumPosts.filter(post => {
            try {
              const date = new Date(post.created_at);
              return !isNaN(date.getTime()) && date.getDay() === dayIndex;
            } catch (e) {
              console.warn('Date invalide pour post:', post);
              return false;
            }
          }).length;
          const repliesCount = forumReplies.filter(reply => {
            try {
              const date = new Date(reply.created_at);
              return !isNaN(date.getTime()) && date.getDay() === dayIndex;
            } catch (e) {
              console.warn('Date invalide pour reply:', reply);
              return false;
            }
          }).length;
          return {
            name: day,
            posts: postsCount,
            replies: repliesCount,
            total: postsCount + repliesCount,
          };
        });

        const userId = userResponse.id;
        const messageStats = userId
          ? [
              {
                name: 'Envoyés',
                value: conversations.reduce((acc, conv) => {
                  return (
                    acc +
                    (Array.isArray(conv.messages)
                      ? conv.messages.filter(msg => msg.sender_id === userId).length
                      : 0)
                  );
                }, 0),
              },
              {
                name: 'Reçus',
                value: conversations.reduce((acc, conv) => {
                  return (
                    acc +
                    (Array.isArray(conv.messages)
                      ? conv.messages.filter(msg => msg.recipient_id === userId).length
                      : 0)
                  );
                }, 0),
              },
              {
                name: 'Non lus',
                value: conversations.reduce((acc, conv) => {
                  return (
                    acc +
                    (Array.isArray(conv.messages)
                      ? conv.messages.filter(msg => msg.recipient_id === userId && !msg.read)
                          .length
                      : 0)
                  );
                }, 0),
              },
            ]
          : fallbackData.messageData;

        const interactionsData =
          conversations.length > 0
            ? conversations.slice(0, 4).map(conv => {
                const participant =
                  userId && Array.isArray(conv.participants)
                    ? conv.participants.find(p => p.id !== userId)
                    : null;
                let lastMessage = 'N/A';
                if (conv.last_message?.created_at) {
                  const date = new Date(conv.last_message.created_at);
                  const now = new Date();
                  const diffMinutes = Math.round((now - date) / (1000 * 60));
                  if (diffMinutes < 60) {
                    lastMessage = `${diffMinutes} min`;
                  } else if (diffMinutes < 1440) {
                    lastMessage = `${Math.floor(diffMinutes / 60)}h`;
                  } else {
                    lastMessage = `${Math.floor(diffMinutes / 1440)} jour${diffMinutes >= 2880 ? 's' : ''}`;
                  }
                }
                return {
                  id: conv.id,
                  name: participant?.name || 'Inconnu',
                  photo: participant?.photo
                    ? `http://localhost:8000/storage/${participant.photo}`
                    : {photo1},
                  lastMessage,
                };
              })
            : fallbackData.interactions;

        const articlesData =
          posts.length > 0
            ? posts
                .filter(post => post.read)
                .slice(0, 4)
                .map(post => ({
                  id: post.id,
                  title: post.title || 'Sans titre',
                  readDate: post.read_at
                    ? new Date(post.read_at).toLocaleDateString('fr-FR')
                    : 'Date inconnue',
                }))
            : fallbackData.articles;

        const sessionLogsData =
          sessions.length > 0
            ? sessions.slice(0, 3).map(session => ({
                date: session.created_at
                  ? new Date(session.created_at).toLocaleDateString('fr-FR')
                  : 'Date inconnue',
                duration: `${session.duration || 0} min`,
                activity: session.activity || 'Non spécifié',
              }))
            : fallbackData.sessionLogs;

        const eventsData =
          Array.isArray(eventsResponse.data) && eventsResponse.data.length > 0
            ? eventsResponse.data.map(event => ({
                id: event.id,
                title: event.title || 'Événement sans titre',
                date: event.date || 'Date inconnue',
                time: event.time || 'Heure inconnue',
                location: event.location || 'Lieu inconnu',
              }))
            : fallbackData.events;

        const notificationsData = {
          count: notificationsResponse.success
            ? notificationsResponse.notificattions.length
            : 0,
          data: notificationsResponse.success
            ? notificationsResponse.notificattions.map(notification => ({
                id: notification.id,
                message: notification.data?.message || 'Notification sans message',
                created_at: notification.created_at,
                read_at: notification.read_at,
              }))
            : [],
          showPopup: false,
        };

        const messagesData = {
          count: conversations.reduce((acc, conv) => {
            return (
              acc +
              (Array.isArray(conv.messages)
                ? conv.messages.filter(msg => msg.recipient_id === userId && !msg.read).length
                : 0)
            );
          }, 0),
          data: conversations.slice(0, 5),
        };

        setUserInfo(userInfoData);
        setStats({ totalTime, visits, messages: messagesCount, articlesRead });
        setSessionLogs(sessionLogsData);
        setForumActivityData(
          forumActivity.some(item => item.posts > 0 || item.replies > 0)
            ? forumActivity
            : fallbackData.forumActivityData
        );
        setMessageData(messageStats);
        setInteractions(interactionsData);
        setArticles(articlesData);
        setEvents(eventsData);
        setNotifications(notificationsData);
        setMessages(messagesData);

        localStorage.setItem(
          'dashboardData',
          JSON.stringify({
            userInfo: userInfoData,
            stats: { totalTime, visits, messages: messagesCount, articlesRead },
            sessionLogs: sessionLogsData,
            forumActivityData: forumActivity.some(item => item.posts > 0 || item.replies > 0)
              ? forumActivity
              : fallbackData.forumActivityData,
            messageData: messageStats,
            interactions: interactionsData,
            articles: articlesData,
            events: eventsData,
            notifications: notificationsData,
            messages: messagesData,
          })
        );
      } catch (err) {
        console.error('Erreur globale:', err);
        setError(err.message || 'Impossible de charger les données. Veuillez réessayer.');
        if (err.message.includes('Session expirée')) navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  // Gestion du clic sur l'icône de notifications
  const handleNotificationClick = () => {
    setNotifications(prev => ({
      ...prev,
      showPopup: !prev.showPopup,
    }));
  };

  // Gestion du clic sur l'icône de messages
  const handleMessagesClick = () => {
    console.log('Messages:', messages.data);
    navigate('/messages');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="ml-4 md:ml-0">
              <div className="text-sm text-gray-500 capitalize">{currentDate}</div>
              <div className="text-xl font-semibold flex items-center">
                <span>{currentTime}</span>
                <Clock className="ml-2 text-fuchsia-600" size={20} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <Bell className="text-gray-600" size={24} />
                {notifications.count > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.count}
                  </span>
                )}
              </button>
              {notifications.showPopup && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      {notifications.count > 0 && (
                        <button
                          onClick={markNotificationsAsRead}
                          className="text-xs text-fuchsia-600 hover:text-fuchsia-800"
                        >
                          Tout marquer comme lu
                        </button>
                      )}
                    </div>
                    {notifications.data.length > 0 ? (
                      <ul className="space-y-2">
                        {notifications.data.map(notification => (
                          <li
                            key={notification.id}
                            className="text-sm text-gray-600 hover:bg-gray-100 p-2 rounded"
                          >
                            {notification.message}
                            <div className="text-xs text-gray-400">
                              {new Date(notification.created_at).toLocaleString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Aucune notification</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={handleMessagesClick}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <MessageCircle className="text-gray-600" size={24} />
                {messages.count > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {messages.count}
                  </span>
                )}
              </button>
            </div>
            <div className="hidden md:block mr-4 text-right">
              <div className="text-sm text-gray-500">Bienvenue,</div>
              <div className="font-semibold">{userInfo.name}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-fuchsia-200 flex items-center justify-center overflow-hidden">
              <img
                src={userInfo.photo}
                alt="Photo de profil"
                className="w-full h-full object-cover"
                //onError={e => (e.target.src = {photo1})}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Utilisateur</h1>

        {/* Boutons pour simuler des actions 
        <div className="mb-6 flex space-x-4">
          <button
            onClick={simulateSendMessage}
            className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700"
          >
            Simuler l'envoi d'un message
          </button>
          <button
            onClick={simulateReadArticle}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Simuler la lecture d'un article
          </button>
          <button
            onClick={simulateJoinEvent}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Simuler l'inscription à un événement
          </button>
        </div>*/}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Temps total"
            value={stats.totalTime}
            icon={<Clock className="text-purple-600" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Visites"
            value={stats.visits}
            icon={<Activity className="text-fuchsia-500" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Messages"
            value={stats.messages}
            icon={<MessageCircle className="text-violet-600" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Articles lus"
            value={stats.articlesRead}
            icon={<BookOpen className="text-fuchsia-500" />}
            isLoading={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-600"></div>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Activité sur le forum</h2>
                <div className="mb-3 flex justify-end space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-600 rounded-sm mr-1"></div>
                    <span>Sujets</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-fuchsia-400 rounded-sm mr-1"></div>
                    <span>Réponses</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={forumActivityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      formatter={(value, name) =>
                        [value, name === 'posts' ? 'Sujets' : name === 'replies' ? 'Réponses' : 'Total']
                      }
                      labelFormatter={label => `Jour: ${label}`}
                    />
                    <Bar dataKey="posts" name="Sujets" fill="#9c27b0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="replies" name="Réponses" fill="#e91e63" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Activité hebdomadaire - Sujets et réponses par jour
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistiques de messages</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={messageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {messageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Events Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Événements à venir</h2>
                <NavLink
                  to="/calendar"
                  className="text-fuchsia-600 hover:text-fuchsia-800 text-sm font-medium flex items-center"
                >
                  <span>Voir le calendrier</span>
                  <CalendarDays size={16} className="ml-1" />
                </NavLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="border border-indigo-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-fuchsia-700">{event.title}</h3>
                      <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                        {event.date}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Clock size={14} className="mr-1" />
                      {event.time}
                    </div>
                    <div className="text-gray-500 text-sm">{event.location}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lists Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Interactions récentes</h2>
                <ul className="space-y-3">
                  {interactions.map(interaction => (
                    <li
                      key={interaction.id}
                      className="flex items-center p-2 hover:bg-indigo-50 rounded-md"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={interaction.photo}
                          alt={interaction.name}
                          className="w-full h-full object-cover"
                         // onError={e => (e.target.src = {photo1})}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="font-medium">{interaction.name}</div>
                        <div className="text-sm text-gray-500">Il y a {interaction.lastMessage}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Articles récemment lus</h2>
                <ul className="space-y-3">
                  {articles.map(article => (
                    <li key={article.id} className="p-2 hover:bg-indigo-50 rounded-md">
                      <div className="font-medium text-fuchsia-700">{article.title}</div>
                      <div className="text-sm text-gray-500">Lu le {article.readDate}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Historique de connexion</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-500">Durée</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-500">Activité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionLogs.map((log, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 text-sm">{log.date}</td>
                          <td className="py-2 text-sm">{log.duration}</td>
                          <td className="py-2 text-sm">{log.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Mémoïsation du composant StatCard pour éviter les rendus inutiles
const StatCard = memo(function StatCard({ title, value, icon, isLoading }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-50">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
          ) : (
            <p className="font-bold text-xl">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
});