import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo5 from '../assets/images/3.jpg';
import {
  Clock,
  Users,
  FileText,
  CalendarDays,
  Bell,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Menu,
  X,
} from 'lucide-react';
import Modal from 'react-modal';

// API configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Modal accessibility
Modal.setAppElement('#root');

export default function AdminDashboard() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: 'Administrateur inconnu',
    email: '',
    photo: photo5,
  });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState({
    count: 0,
    data: [],
    showPopup: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    age: '',
    pays: '',
    role_id: '1',
    password: '',
    password_confirmation: '',
    postTitle: '',
    postContent: '',
    postMedia: null,
    eventTitle: '',
    eventStart: '',
    eventEnd: '',
    eventColor: '',
    eventDescription: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Update date and time
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

  // Format datetime for input
  const formatDateTimeForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  // Format datetime for API
  const formatDateTimeForApi = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = '00';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Fetch data functions
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
      if (error.response?.status === 404) {
        throw new Error(`L'endpoint ${url} n'existe pas. Vérifiez la configuration du serveur.`);
      }
      throw new Error(`Erreur lors de la récupération des données de ${url}: ${error.message}`);
    }
  };

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

  // Fetch initial data
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

        const [
          userResponse,
          usersResponse,
          postsResponse,
          eventsResponse,
          notificationsResponse,
        ] = await Promise.all([
          fetchWithAuth('/me').catch(() => ({})),
          fetchWithAuth('/user').catch(() => ({ data: [] })),
          fetchWithAuth('/posts').catch(() => ({ data: [] })),
          fetchWithAuth(`/events/range/${start}/${end}`).catch(() => ({ data: [] })),
          fetchWithAuth('/notifications').catch(() => ({ data: [] })),
        ]);

        const userInfoData = {
          id: userResponse.id || null,
          name: `${userResponse.prenom || ''} ${userResponse.nom || userResponse.name || 'Administrateur inconnu'}`,
          email: userResponse.email || '',
          photo: userResponse.photo
            ? `http://localhost:8000/storage/${userResponse.photo}`
            : photo5,
        };

        const usersData = Array.isArray(usersResponse) ? usersResponse : [];
        const postsData = Array.isArray(postsResponse) ? postsResponse : [];
        const eventsData = Array.isArray(eventsResponse) ? eventsResponse : [];
        const notificationsData = {
          count: Array.isArray(notificationsResponse.data) ? notificationsResponse.data.length : 0,
          data: Array.isArray(notificationsResponse.data)
            ? notificationsResponse.data.map(notification => ({
                id: notification.id,
                message: notification.data?.message || 'Notification sans message',
                created_at: notification.created_at,
                read_at: notification.read_at,
              }))
            : [],
          showPopup: false,
        };

        setUserInfo(userInfoData);
        setUsers(usersData);
        setPosts(postsData);
        setEvents(eventsData);
        setNotifications(notificationsData);
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

  // Handle modal open
  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData({
      id: data.id || null,
      prenom: data.prenom || '',
      nom: data.nom || '',
      email: data.email || '',
      telephone: data.telephone || '',
      adresse: data.adresse || '',
      ville: data.ville || '',
      age: data.age || '',
      pays: data.pays || '',
      role_id: data.role_id?.toString() || '2',
      password: '',
      password_confirmation: '',
      postTitle: data.title || '',
      postContent: data.content || '',
      postMedia: null,
      eventTitle: data.title || '',
      eventStart: data.start ? formatDateTimeForInput(data.start) : '',
      eventEnd: data.end ? formatDateTimeForInput(data.end) : '',
      eventColor: data.color || '',
      eventDescription: data.description || '',
    });
    setModalIsOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalIsOpen(false);
    setModalType('');
    setFormData({
      id: null,
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      ville: '',
      age: '',
      pays: '',
      role_id: '2',
      password: '',
      password_confirmation: '',
      postTitle: '',
      postContent: '',
      postMedia: null,
      eventTitle: '',
      eventStart: '',
      eventEnd: '',
      eventColor: '',
      eventDescription: '',
    });
    setError(null); // Clear error on close
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Validate event form data
  const validateEventForm = () => {
    if (!formData.eventTitle) return 'Le titre est requis.';
    if (formData.eventTitle.length > 255) return 'Le titre ne peut pas dépasser 255 caractères.';
    if (!formData.eventStart) return 'La date de début est requise.';
    if (formData.eventEnd && new Date(formData.eventEnd) <= new Date(formData.eventStart)) {
      return 'La date de fin doit être postérieure à la date de début.';
    }
    if (formData.eventColor && !/^#[a-f0-9]{6}$/i.test(formData.eventColor)) {
      return 'La couleur doit être un code hexadécimal valide (ex. #a1b2c3).';
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilisateur non authentifié');

      if (modalType === 'addUser' || modalType === 'editUser') {
        const userData = {
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          adresse: formData.adresse,
          ville: formData.ville,
          age: formData.age ? parseInt(formData.age) : null,
          role_id: parseInt(formData.role_id),
          pays: formData.pays,
        };

        if (modalType === 'addUser') {
          if (!formData.password) throw new Error('Le mot de passe est requis pour un nouvel utilisateur.');
          userData.password = formData.password;
          userData.password_confirmation = formData.password_confirmation;
          await api.post('/register', userData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          if (formData.password) {
            userData.password = formData.password;
            userData.password_confirmation = formData.password_confirmation;
          }
          await api.put(`/users/${formData.id}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const usersResponse = await fetchWithAuth('/users');
        setUsers(Array.isArray(usersResponse) ? usersResponse : []);
      } else if (modalType === 'addPost' || modalType === 'editPost') {
        const postData = new FormData();
        if (formData.postTitle) postData.append('title', formData.postTitle);
        if (formData.postContent) postData.append('content', formData.postContent);
        if (formData.postMedia) postData.append('media', formData.postMedia);

        if (!formData.postContent && !formData.postMedia) {
          throw new Error('Le contenu ou le média est requis.');
        }

        if (modalType === 'addPost') {
          await api.post('/posts', postData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await api.post(`/posts/${formData.id}?_method=PUT`, postData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        const postsResponse = await fetchWithAuth('/posts');
        setPosts(Array.isArray(postsResponse) ? postsResponse : []);
      } else if (modalType === 'addEvent' || modalType === 'editEvent') {
        const validationError = validateEventForm();
        if (validationError) {
          setError(validationError);
          setIsLoading(false);
          return;
        }

        const eventData = {
          title: formData.eventTitle,
          start: formatDateTimeForApi(formData.eventStart),
          end: formData.eventEnd ? formatDateTimeForApi(formData.eventEnd) : null,
          color: formData.eventColor || null,
          description: formData.eventDescription || null,
        };

        if (modalType === 'addEvent') {
          await api.post('/events', eventData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          await api.put(`/events/${formData.id}`, eventData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        const eventsResponse = await fetchWithAuth(`/events/range/${start}/${end}`);
        setEvents(Array.isArray(eventsResponse) ? eventsResponse : []);
      }

      closeModal();
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(', ')
          : err.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilisateur non authentifié');

      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersResponse = await fetchWithAuth('/users');
      setUsers(Array.isArray(usersResponse) ? usersResponse : []);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message || 'Impossible de supprimer l’utilisateur. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilisateur non authentifié');

      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const postsResponse = await fetchWithAuth('/posts');
      setPosts(Array.isArray(postsResponse) ? postsResponse : []);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message || 'Impossible de supprimer l’article. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilisateur non authentifié');

      await api.delete(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
      const eventsResponse = await fetchWithAuth(`/events/range/${start}/${end}`);
      setEvents(Array.isArray(eventsResponse) ? eventsResponse : []);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message || 'Impossible de supprimer l’événement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = () => {
    setNotifications(prev => ({
      ...prev,
      showPopup: !prev.showPopup,
    }));
  };

  // Handle back navigation
  const handleBack = () => {
    window.history.back();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-indigo-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-fuchsia-600 to-fuchsia-800 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:fixed md:inset-y-0 md:left-0 md:w-64 shadow-2xl flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-fuchsia-500">
          <h1 className="text-xl font-bold tracking-tight">WOMEN GROW UP</h1>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              navigate('/AdminDashboard');
              setIsSidebarOpen(false);
            }}
            className="flex items-center w-full p-3 rounded-lg hover:bg-fuchsia-700 transition-colors text-sm font-medium"
            aria-label="Dashboard"
          >
            <Home size={20} className="mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => {
              document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
              setIsSidebarOpen(false);
            }}
            className="flex items-center w-full p-3 rounded-lg hover:bg-fuchsia-700 transition-colors text-sm font-medium"
            aria-label="Événements"
          >
            <CalendarDays size={20} className="mr-3" />
            Événements
          </button>
          <button
            onClick={() => {
              document.getElementById('posts-section').scrollIntoView({ behavior: 'smooth' });
              setIsSidebarOpen(false);
            }}
            className="flex items-center w-full p-3 rounded-lg hover:bg-fuchsia-700 transition-colors text-sm font-medium"
            aria-label="Articles"
          >
            <FileText size={20} className="mr-3" />
            Articles
          </button>
          <button
            onClick={() => {
              document.getElementById('users-section').scrollIntoView({ behavior: 'smooth' });
              setIsSidebarOpen(false);
            }}
            className="flex items-center w-full p-3 rounded-lg hover:bg-fuchsia-700 transition-colors text-sm font-medium"
            aria-label="Utilisateurs"
          >
            <Users size={20} className="mr-3" />
            Utilisateurs
          </button>
        </nav>
        <div className="p-4 border-t border-fuchsia-500">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            aria-label="Déconnexion"
          >
            <LogOut size={20} className="mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Go back"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="text-gray-600">
              <div className="text-sm capitalize">{currentDate}</div>
              <div className="text-lg font-semibold flex items-center">
                <span>{currentTime}</span>
                <Clock className="ml-2 text-fuchsia-600" size={20} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none relative"
                aria-label="Notifications"
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
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      {notifications.count > 0 && (
                        <button
                          onClick={markNotificationsAsRead}
                          className="text-xs text-fuchsia-500 hover:text-fuchsia-600"
                        >
                          Tout marquer comme lu
                        </button>
                      )}
                    </div>
                    {notifications.data.length > 0 ? (
                      <ul className="space-y-2 max-h-60 overflow-y-auto">
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
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="font-semibold text-gray-800">{userInfo.name}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-fuchsia-100 flex items-center justify-center overflow-hidden">
                <img
                  src={userInfo.photo}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                  onError={e => (e.target.src = '/api/placeholder/40/40')}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Administrateur</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Loader */}
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
            </div>
          ) : (
            <>
              {/* Events Management Section */}
              <section id="events-section" className="mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Gestion des événements</h2>
                    <button
                      onClick={() => openModal('addEvent')}
                      className="flex items-center bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition"
                    >
                      <Plus size={18} className="mr-2" />
                      Ajouter un événement
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Titre</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Début</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fin</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Couleur</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {events.map(event => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-700">{event.title}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {new Date(event.start).toLocaleString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {event.end
                                ? new Date(event.end).toLocaleString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : 'N/A'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {event.color ? (
                                <div
                                  className="w-6 h-6 rounded-full"
                                  style={{ backgroundColor: event.color }}
                                />
                              ) : (
                                'Aucune'
                              )}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {event.description
                                ? event.description.substring(0, 50) + (event.description.length > 50 ? '...' : '')
                                : 'Aucune'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => openModal('editEvent', event)}
                                  className="text-fuchsia-500 hover:text-fuchsia-600"
                                  aria-label="Edit event"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-500 hover:text-red-600"
                                  aria-label="Delete event"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Posts Management Section */}
              <section id="posts-section" className="mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Gestion des articles</h2>
                    <button
                      onClick={() => openModal('addPost')}
                      className="flex items-center bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition"
                    >
                      <Plus size={18} className="mr-2" />
                      Ajouter un article
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Titre</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Contenu</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Média</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Auteur</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {posts.map(post => (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-700">{post.title || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {post.content ? post.content.substring(0, 50) + (post.content.length > 50 ? '...' : '') : 'N/A'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {post.media_path ? (
                                post.media_type === 'image' ? (
                                  <img
                                    src={`http://localhost:8000${post.media_path}`}
                                    alt="Post media"
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                ) : (
                                  <video
                                    src={`http://localhost:8000${post.media_path}`}
                                    className="w-16 h-16 object-cover rounded"
                                    controls
                                  />
                                )
                              ) : (
                                'Aucun média'
                              )}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">{post.media_type || 'text'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{post.user?.prenom} {post.user?.nom}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => openModal('editPost', post)}
                                  className="text-fuchsia-500 hover:text-fuchsia-600"
                                  aria-label="Edit post"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-500 hover:text-red-600"
                                  aria-label="Delete post"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Users Management Section */}
              <section id="users-section" className="mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Gestion des utilisateurs</h2>
                    <button
                      onClick={() => openModal('addUser')}
                      className="flex items-center bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition"
                    >
                      <Plus size={18} className="mr-2" />
                      Ajouter un utilisateur
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Nom</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Téléphone</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Adresse</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ville</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Âge</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Pays</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rôle</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-700">{`${user.prenom || ''} ${user.nom || ''}`}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.email}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.telephone || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.adresse || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.ville || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.age || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">{user.pays || 'N/A'}</td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              {user.role_id === 1 ? 'Administrateur' : 'Utilisateur'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700">
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => openModal('editUser', user)}
                                  className="text-fuchsia-500 hover:text-fuchsia-600"
                                  aria-label="Edit user"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-500 hover:text-red-600"
                                  aria-label="Delete user"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Modal for User/Post/Event Forms */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto mt-20 shadow-2xl transform transition-all duration-300"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {modalType === 'addUser' && 'Ajouter un utilisateur'}
              {modalType === 'editUser' && 'Modifier l’utilisateur'}
              {modalType === 'addPost' && 'Ajouter un article'}
              {modalType === 'editPost' && 'Modifier l’article'}
              {modalType === 'addEvent' && 'Ajouter un événement'}
              {modalType === 'editEvent' && 'Modifier l’événement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {(modalType === 'addUser' || modalType === 'editUser') && (
                <>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="prenom">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez le prénom"
                      required
                      aria-describedby="prenom-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="nom">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez le nom"
                      required
                      aria-describedby="nom-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez l'email"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="telephone">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez le numéro de téléphone"
                      aria-describedby="telephone-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="adresse">
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez l'adresse"
                      aria-describedby="adresse-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="ville">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="ville"
                      name="ville"
                      value={formData.ville}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez la ville"
                      aria-describedby="ville-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="age">
                      Âge
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez l'âge"
                      aria-describedby="age-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="pays">
                      Pays
                    </label>
                    <input
                      type="text"
                      id="pays"
                      name="pays"
                      value={formData.pays}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez le pays"
                      aria-describedby="pays-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="role_id">
                      Rôle
                    </label>
                    <select
                      id="role_id"
                      name="role_id"
                      value={formData.role_id}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 bg-white"
                      required
                      aria-describedby="role_id-error"
                    >
                      <option value="2">Utilisateur</option>
                      <option value="1">Administrateur</option>
                    </select>
                  </div>
                  {modalType === 'addUser' && (
                    <>
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="password">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                          placeholder="Entrez le mot de passe"
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="password_confirmation">
                          Confirmation du mot de passe
                        </label>
                        <input
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                          placeholder="Confirmez le mot de passe"
                          required
                          aria-describedby="password_confirmation-error"
                        />
                      </div>
                    </>
                  )}
                  {modalType === 'editUser' && (
                    <>
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="password">
                          Nouveau mot de passe (optionnel)
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                          placeholder="Entrez un nouveau mot de passe"
                          aria-describedby="password-error"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="password_confirmation">
                          Confirmation du nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                          placeholder="Confirmez le nouveau mot de passe"
                          aria-describedby="password_confirmation-error"
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {(modalType === 'addPost' || modalType === 'editPost') && (
                <>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="postTitle">
                      Titre
                    </label>
                    <input
                      type="text"
                      id="postTitle"
                      name="postTitle"
                      value={formData.postTitle}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      placeholder="Entrez le titre de l'article"
                      aria-describedby="postTitle-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="postContent">
                      Contenu
                    </label>
                    <textarea
                      id="postContent"
                      name="postContent"
                      value={formData.postContent}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      rows="5"
                      placeholder="Entrez le contenu de l'article"
                      aria-describedby="postContent-error"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="postMedia">
                      Média (image ou vidéo)
                    </label>
                    <input
                      type="file"
                      id="postMedia"
                      name="postMedia"
                      accept="image/jpeg,image/png,video/mp4,video/mov,video/avi"
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-fuchsia-700 hover:file:bg-fuchsia-100"
                      aria-describedby="postMedia-error"
                    />
                  </div>
                </>
              )}
              {(modalType === 'addEvent' || modalType === 'editEvent') && (
                <>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="eventTitle">
                      Titre
                    </label>
                    <input
                      type="text"
                      id="eventTitle"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleInputChange}
                      className={`block w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400 ${
                        error && !formData.eventTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Entrez le titre de l'événement"
                      required
                      maxLength="255"
                      aria-describedby="eventTitle-error"
                    />
                    {error && !formData.eventTitle && (
                      <p id="eventTitle-error" className="text-red-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="eventStart">
                      Début
                    </label>
                    <input
                      type="datetime-local"
                      id="eventStart"
                      name="eventStart"
                      value={formData.eventStart}
                      onChange={handleInputChange}
                      className={`block w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 ${
                        error && !formData.eventStart ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                      aria-describedby="eventStart-error"
                    />
                    {error && !formData.eventStart && (
                      <p id="eventStart-error" className="text-red-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="eventEnd">
                      Fin (optionnel)
                    </label>
                    <input
                      type="datetime-local"
                      id="eventEnd"
                      name="eventEnd"
                      value={formData.eventEnd}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200"
                      aria-describedby="eventEnd-error"
                    />
                    {error && formData.eventEnd && new Date(formData.eventEnd) <= new Date(formData.eventStart) && (
                      <p id="eventEnd-error" className="text-red-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="eventColor">
                      Couleur (optionnel)
                    </label>
                    <input
                      type="color"
                      id="eventColor"
                      name="eventColor"
                      value={formData.eventColor || '#000000'}
                      onChange={handleInputChange}
                      className="block w-full h-12 border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200"
                      aria-describedby="eventColor-error"
                    />
                    {error && formData.eventColor && !/^#[a-f0-9]{6}$/i.test(formData.eventColor) && (
                      <p id="eventColor-error" className="text-red-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="eventDescription">
                      Description (optionnel)
                    </label>
                    <textarea
                      id="eventDescription"
                      name="eventDescription"
                      value={formData.eventDescription}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 placeholder-gray-400"
                      rows="4"
                      placeholder="Entrez la description de l'événement"
                      aria-describedby="eventDescription-error"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-fuchsia-500 text-white rounded-lg font-semibold hover:bg-fuchsia-600 transition duration-200 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
}