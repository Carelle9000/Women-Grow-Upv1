import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Clock,
  MessageCircle,
  BookOpen,
  Activity,
  CalendarDays
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
  Legend
} from 'recharts';
import TaskCalendar from './TaskCalendar';

// Configuration des endpoints API
// src/config/apiEndpoints.js
const API_ENDPOINTS = {
  USER_INFO: '/user',
  SESSION_LOGS: '/sessions',
  FORUM_ACTIVITY: '/forum',
  MESSAGES: '/messages',
  INTERACTIONS: '/conversations',
  ARTICLES: '/posts',
  EVENTS: '/events',
};


// Couleurs pour les graphiques
const COLORS = ['#9c27b0', '#e91e63', '#5e35b1'];

// Données de secours (fallback) pour les graphiques
const fallbackData = {
  forumActivityData: [
    { name: 'Lun', posts: 4 },
    { name: 'Mar', posts: 6 },
    { name: 'Mer', posts: 3 },
    { name: 'Jeu', posts: 7 },
    { name: 'Ven', posts: 5 },
    { name: 'Sam', posts: 8 },
    { name: 'Dim', posts: 2 },
  ],
  messageData: [
    { name: 'Envoyés', value: 45 },
    { name: 'Reçus', value: 32 },
    { name: 'Non lus', value: 8 },
  ],
  interactions: [
    { id: 1, name: 'Sophie Martin', photo: '/api/placeholder/48/48', lastMessage: '15 min' },
    { id: 2, name: 'Marie Dupont', photo: '/api/placeholder/48/48', lastMessage: '1 jour' },
    { id: 3, name: 'Jeanne Dubois', photo: '/api/placeholder/48/48', lastMessage: '2 jours' },
    { id: 4, name: 'Lucie Bernard', photo: '/api/placeholder/48/48', lastMessage: '3 jours' },
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
  ]
};

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userInfo, setUserInfo] = useState({ name: 'Claire Dubois', photo: '/api/placeholder/40/40' });
  const [sessionLogs, setSessionLogs] = useState(fallbackData.sessionLogs);
  const [forumActivityData, setForumActivityData] = useState(fallbackData.forumActivityData);
  const [messageData, setMessageData] = useState(fallbackData.messageData);
  const [interactions, setInteractions] = useState(fallbackData.interactions);
  const [articles, setArticles] = useState(fallbackData.articles);
  const [events, setEvents] = useState(fallbackData.events);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Format date to French locale
    const formatDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString('fr-FR', options));
    };

    // Format time
    const formatTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };

    formatDate();
    formatTime();

    // Update time every minute
    const timeInterval = setInterval(formatTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [
          userResponse,
          logsResponse,
          forumResponse,
          messagesResponse,
          interactionsResponse,
          articlesResponse,
          eventsResponse
        ] = await Promise.all([
          fetch(API_ENDPOINTS.USER_INFO, { headers }),
          fetch(API_ENDPOINTS.SESSION_LOGS, { headers }),
          fetch(API_ENDPOINTS.FORUM_ACTIVITY, { headers }),
          fetch(API_ENDPOINTS.MESSAGES, { headers }),
          fetch(API_ENDPOINTS.INTERACTIONS, { headers }),
          fetch(API_ENDPOINTS.ARTICLES, { headers }),
          fetch(API_ENDPOINTS.EVENTS, { headers })
        ]);

        if (!userResponse.ok) throw new Error('Failed to fetch user info');
        if (!logsResponse.ok) throw new Error('Failed to fetch session logs');
        if (!forumResponse.ok) throw new Error('Failed to fetch forum activity');
        if (!messagesResponse.ok) throw new Error('Failed to fetch messages');
        if (!interactionsResponse.ok) throw new Error('Failed to fetch interactions');
        if (!articlesResponse.ok) throw new Error('Failed to fetch articles');
        if (!eventsResponse.ok) throw new Error('Failed to fetch events');

        const [
          userData,
          logsData,
          forumData,
          messagesData,
          interactionsData,
          articlesData,
          eventsData
        ] = await Promise.all([
          userResponse.json(),
          logsResponse.json(),
          forumResponse.json(),
          messagesResponse.json(),
          interactionsResponse.json(),
          articlesResponse.json(),
          eventsResponse.json()
        ]);

        setUserInfo(userData);
        setSessionLogs(logsData);
        setForumActivityData(forumData);
        setMessageData(messagesData);
        setInteractions(interactionsData);
        setArticles(articlesData);
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
          <div className="flex items-center">
            <div className="hidden md:block mr-4 text-right">
              <div className="text-sm text-gray-500">Bienvenue,</div>
              <div className="font-semibold">{userInfo.name}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-fuchsia-200 flex items-center justify-center overflow-hidden">
              <img
                src={userInfo.photo || '/api/placeholder/40/40'}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Temps total"
            value="12h 45min"
            icon={<Clock className="text-purple-600" />}
          />
          <StatCard
            title="Visites"
            value="24"
            icon={<Activity className="text-fuchsia-500" />}
          />
          <StatCard
            title="Messages"
            value="77"
            icon={<MessageCircle className="text-violet-600" />}
          />
          <StatCard
            title="Articles lus"
            value="16"
            icon={<BookOpen className="text-fuchsia-500" />}
          />
        </div>

        {/* Afficher message d'erreur s'il y en a un */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Afficher un loader pendant le chargement */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-600"></div>
          </div>
        ) : (
          <>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Forum Activity Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Activité sur le forum</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={forumActivityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="posts" fill="#9c27b0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Messages Pie Chart */}
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
              {/* Interactions List */}
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

              {/* Articles List */}
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

              {/* Session Logs */}
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

// Stat Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-50">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="font-bold text-xl">{value}</p>
        </div>
      </div>
    </div>
  );
}