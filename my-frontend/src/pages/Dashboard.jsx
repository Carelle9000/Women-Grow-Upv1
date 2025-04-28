"use client";
import React, { useState, useEffect } from 'react';
import {
  Home, Info, Book, Library, School, MessageSquare, Mail, User, LogOut 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Données simulées pour les graphiques (à remplacer par les données de l'API)
const messageData = [
  { date: '2025-04-01', sent: 30, received: 45 },
  { date: '2025-04-02', sent: 20, received: 35 },
  { date: '2025-04-03', sent: 50, received: 60 },
  { date: '2025-04-04', sent: 40, received: 55 },
];

const reportData = [
  { date: '2025-04-01', reports: 5 },
  { date: '2025-04-02', reports: 8 },
  { date: '2025-04-03', reports: 3 },
  { date: '2025-04-04', reports: 6 },
];

const forumData = [
  { name: 'Posts', value: 120 },
  { name: 'Comments', value: 300 },
  { name: 'Likes', value: 200 },
];

// Données simulées pour les conversations
const conversationData = [
  { id: 1, name: 'Marie Dupont', lastInteraction: '2025-04-28 10:15' },
  { id: 2, name: 'Sophie Martin', lastInteraction: '2025-04-27 14:30' },
  { id: 3, name: 'Claire Dubois', lastInteraction: '2025-04-26 09:45' },
];

const COLORS = ['#6366F1', '#F472B6', '#FBB6CE'];

const Sidebar = ({ setActiveSection }) => {
  const menuItems = [
    { name: 'Accueil', icon: Home, path: '/' },
    { name: 'À propos', icon: Info, path: '/about', section: 'about' },
    { name: 'Blog', icon: Book, path: '/blog', section: 'blog' },
    { name: 'Digithek', icon: Library, path: '/digithek', section: 'digithek' },
    { name: 'Cours', icon: School, path: '/courses', section: 'courses' },
    { name: 'Forum', icon: MessageSquare, path: '/forum', section: 'forum' },
    { name: 'Contact', icon: Mail, path: '/contact', section: 'contact' },
    { name: 'Profil', icon: User, path: '/profile', section: 'profile' },
  ];

  return (
    <div className="w-64 bg-indigo-100 h-screen p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-indigo-600 mb-10">Women Grow Up</h1>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className="flex items-center w-full p-3 mb-2 text-indigo-800 hover:bg-indigo-200 rounded-lg transition"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <button
        onClick={() => {
          // Intégration API logout
          fetch('/logout', { method: 'POST' })
            .then(() => console.log('Déconnexion réussie'))
            .catch((err) => console.error('Erreur déconnexion:', err));
        }}
        className="flex items-center p-3 text-indigo-800 hover:bg-red-500 hover:text-white rounded-lg transition"
      >
        <LogOut className="w-5 h-5 mr-3" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

const Dashboard = () => {
  // Données simulées pour l'utilisateur (à remplacer par un appel API)
  const [user, setUser] = useState({
    firstName: 'Jean',
    profilePicture: 'https://via.placeholder.com/40',
  });
  
  
  // État pour la date du calendrier
  const [calendarDate, setCalendarDate] = useState(new Date());

  // État pour l'heure en temps réel
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Mise à jour de l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Exemple d'appel API pour récupérer les données utilisateur
  useEffect(() => {
    // Remplacer par un appel réel à l'API
    fetch('/me')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Erreur récupération utilisateur:', err));
  }, []);

   // Exemple d'appel API pour récupérer les conversations
   useEffect(() => {
    // Remplacer par un appel réel à l'API
    fetch('/messages')
      .then((res) => res.json())
      .then((data) => setConversations(data))
      .catch((err) => console.error('Erreur récupération conversations:', err));
  }, []);

  return (
    <div className="flex-1 p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-indigo-600">Tableau de bord</h2>
        <div className="flex items-center space-x-3">
          <span className="text-indigo-600 font-semibold">{user.prenom}</span>
          <img
            src={user.photo}
            alt="Photo de profil"
            className="w-10 h-10 rounded-full border-gray-600 object-cover"
          />
        </div>
      </div>
      <div className="text-right text-gray-600 text-sm mb-8">{currentTime}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Messages envoyés et reçus */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Messages</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke="#6366F1" name="Envoyés" />
              <Line type="monotone" dataKey="received" stroke="#F472B6" name="Reçus" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Signalements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Signalements</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke="#6366F1" name="Envoyés" />
              <Line type="monotone" dataKey="received" stroke="#F472B6" name="Reçus" />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/* Participation au forum */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Activité Forum</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={forumData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {forumData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Logs de connexion */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Logs de connexion</h3>
          {/* À intégrer avec l'API /api/logs */}
          <p className="text-gray-600">Dernière connexion: 28/04/2025 14:30</p>
        </div>

        {/* Articles postés */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Articles postés</h3>
          {/* À intégrer avec l'API /api/articles */}
          <p className="text-gray-600">Total: 15 articles</p>
        </div>

        {/* Sujets forum */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Sujets forum</h3>
          {/* À intégrer avec l'API /api/forum/topics */}
          <p className="text-gray-600">Total: 25 sujets</p>
        </div>

          {/* Liste des conversations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Conversations récentes</h3>
          <ul className="text-gray-600">
            {conversations.map((conv) => (
              <li key={conv.id} className="flex justify-between py-2 border-b border-gray-200">
                <span>{conv.name}</span>
                <span className="text-sm text-gray-500">{conv.lastInteraction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendrier */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Calendrier</h3>
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            className="border-none text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Dashboard />;
      case 'about':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">À propos</h2></div>;
      case 'blog':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Blog</h2></div>;
      case 'digithek':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Digithek</h2></div>;
      case 'courses':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Cours</h2></div>;
      case 'forum':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Forum</h2></div>;
      case 'contact':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Contact</h2></div>;
      case 'profile':
        return <div className="flex-1 p-10 bg-gray-50"><h2 className="text-3xl font-bold text-indigo-600">Profil</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen font-tienne">
      <Sidebar setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default App;