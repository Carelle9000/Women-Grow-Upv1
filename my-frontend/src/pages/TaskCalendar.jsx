import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const COLORS = ['#6366F1', '#F472B6', '#FBB6CE'];

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view', 'create', or 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null); // For editing
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    color: COLORS[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  // Format datetime for input (Y-m-dTH:i)
  const formatDateTimeForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  // Format datetime for API (Y-m-d H:i:s)
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



  // Fetch events for the current month
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const start = new Date(year, month, 1).toISOString().split('T')[0];
        const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
        console.log(`Fetching events for range: ${start} to ${end}`);
        const response = await axios.get(`http://localhost:8000/api/events/range/${start}/${end}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Fetch events response:', response.data);
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        setError('Failed to load events. Please try again.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      fetchEvents();
    } else {
      setError('Please log in to view events.');
      setLoading(false);
    }
  }, [month, year]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.title) return 'Title is required.';
    if (!formData.start) return 'Start date and time are required.';
    if (formData.end && new Date(formData.end) <= new Date(formData.start)) {
      return 'End date must be after start date.';
    }
    if (formData.color && !/^#[a-f0-9]{6}$/i.test(formData.color)) {
      return 'Color must be a valid hex code (e.g., #6366F1).';
    }
    return null;
  };

  // Create a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      console.log('Client-side validation error:', validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Format start and end for API
      const apiData = {
        ...formData,
        start: formatDateTimeForApi(formData.start),
        end: formData.end ? formatDateTimeForApi(formData.end) : null,
      };
      console.log('Sending create event request with data:', apiData);
      const response = await axios.post('http://localhost:8000/api/events', apiData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Create event response:', response.data);
      // Refresh events
      const start = new Date(year, month, 1).toISOString().split('T')[0];
      const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
      console.log(`Refreshing events for range: ${start} to ${end}`);
      const rangeResponse = await axios.get(`http://localhost:8000/api/events/range/${start}/${end}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Refresh events response:', rangeResponse.data);
      setEvents(Array.isArray(rangeResponse.data) ? rangeResponse.data : []);
      setModalMode(null);
      setFormData({
        title: '',
        start: '',
        end: '',
        description: '',
        color: COLORS[0],
      });
      console.log('Modal closed after successful create');
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
      setError(error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(', ') : 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  // Update an event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      console.log('Client-side validation error:', validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Format start and end for API
      const apiData = {
        ...formData,
        start: formatDateTimeForApi(formData.start),
        end: formData.end ? formatDateTimeForApi(formData.end) : null,
      };
      console.log('Sending update event request with data:', apiData);
      const response = await axios.post(`http://localhost:8000/api/events/${selectedEvent.id}`, apiData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Update event response:', response.data);
      // Refresh events
      const start = new Date(year, month, 1).toISOString().split('T')[0];
      const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
      console.log(`Refreshing events for range: ${start} to ${end}`);
      const rangeResponse = await axios.get(`http://localhost:8000/api/events/range/${start}/${end}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Refresh events response:', rangeResponse.data);
      setEvents(Array.isArray(rangeResponse.data) ? rangeResponse.data : []);
      setModalMode(null);
      setSelectedEvent(null);
      setFormData({
        title: '',
        start: '',
        end: '',
        description: '',
        color: COLORS[0],
      });
      console.log('Modal closed after successful update');
    } catch (error) {
      console.error('Error updating event:', error.response?.data || error.message);
      setError(error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(', ') : 'Failed to update event.');
    } finally {
      setLoading(false);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setLoading(true);
    setError(null);
    try {
      console.log(`Sending delete event request for ID: ${eventId}`);
      await axios.delete(`http://localhost:8000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Event deleted successfully');
      // Refresh events
      const start = new Date(year, month, 1).toISOString().split('T')[0];
      const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
      console.log(`Refreshing events for range: ${start} to ${end}`);
      const response = await axios.get(`http://localhost:8000/api/events/range/${start}/${end}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Refresh events response:', response.data);
      setEvents(Array.isArray(response.data) ? response.data : []);
      setModalMode(null);
      setSelectedEvent(null);
      console.log('Modal closed after successful delete');
    } catch (error) {
      console.error('Error deleting event:', error.response?.data || error.message);
      setError('Failed to delete event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const analytics = [
    { title: "Votre Niveau d'activité", value: '92%', change: '+5%', color: COLORS[0] },
    { title: "Nombre d'événements", value: '14', change: '-2', color: COLORS[1] },
    { title: 'Engagement communitaire', value: '98%', change: '+10%', color: COLORS[2] },
  ];

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = Array.isArray(events)
        ? events.filter(event => {
            const startDate = new Date(event.start);
            const matches = startDate.getDate() === day && startDate.getMonth() === month;
            return matches;
          })
        : [];
      console.log(`Day ${day} events:`, dayEvents);
      days.push(
        <motion.div
          key={day}
          className="p-2 sm:p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedDay(day);
            setModalMode('view');
            console.log(`Opened view modal for day ${day}`);
          }}
          role="button"
          tabIndex={0}
          aria-label={`Jour ${day} avec ${dayEvents.length} événements`}
        >
          <div className="text-xs sm:text-sm font-medium text-gray-800">{day}</div>
          {dayEvents.map((event, idx) => (
            <motion.div
              key={idx}
              className="text-xs mt-1 p-1 rounded-lg"
              style={{ backgroundColor: event.color || COLORS[idx % COLORS.length], color: 'white' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {event.title}
            </motion.div>
          ))}
        </motion.div>
      );
    }
    return days;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gradient-to-br from-pink-100 to-indigo-100 rounded-2xl shadow-2xl">
      
    

      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-lg sm:text-xl font-semibold text-fuchsia-500 mb-2 sm:mb-0">
          Calendrier d'événements
        </h1>
        <div className="flex space-x-2">
          <motion.select
            className="p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-pink-300 outline-none text-xs sm:text-sm w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            aria-label="Filtrer par sujet"
          >
            <option>Par nom de sujets</option>
          </motion.select>
          <motion.button
            onClick={() => {
              setModalMode('create');
              setSelectedDay(null);
              setFormData({
                title: '',
                start: new Date(year, month, 1, 9, 0).toISOString().slice(0, 16), // Default to 9:00 AM
                end: new Date(year, month, 1, 10, 0).toISOString().slice(0, 16), // Default to 10:00 AM
                description: '',
                color: COLORS[0],
              });
              console.log('Opened create event modal');
            }}
            className="px-3 py-2 bg-pink-500 text-white rounded-lg shadow-sm hover:bg-pink-600 transition-colors text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ajouter un événement"
          >
            Ajouter un événement
          </motion.button>
        </div>
      </motion.div>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {analytics.map((item, idx) => (
          <motion.div
            key={idx}
            className="p-4 bg-white rounded-xl shadow-sm flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
          >
            <h3 className="text-xs sm:text-sm text-gray-600">{item.title}</h3>
            <p className="text-xl sm:text-2xl font-semibold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-xs text-gray-500">{item.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Calendar */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
            <motion.button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-white rounded-lg shadow-sm text-xs sm:text-sm hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Mois précédent"
            >
              Avant
            </motion.button>
            <motion.button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-white rounded-lg shadow-sm text-xs sm:text-sm hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Mois suivant"
            >
              Après
            </motion.button>
            <p className="text-xs sm:text-sm text-gray-600">
              Aujourd'hui: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2">
            {Array(7).fill().map((_, idx) => (
              <div key={idx} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2 text-center">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
              <div key={idx} className="text-xs sm:text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        )}
      </motion.div>

      {/* Modal for View/Create/Edit Events */}
      <AnimatePresence>
        {(modalMode === 'view' || modalMode === 'create' || modalMode === 'edit') && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {modalMode === 'view' && (
                <>
                  <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Événements du {selectedDay} {monthNames[month]} {year}
                  </h3>
                  {Array.isArray(events) && events.filter(event => new Date(event.start).getDate() === selectedDay && new Date(event.start).getMonth() === month).map((event, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <p className="text-xs text-gray-600">
                        Début: {new Date(event.start).toLocaleString()}
                      </p>
                      {event.end && (
                        <p className="text-xs text-gray-600">
                          Fin: {new Date(event.end).toLocaleString()}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                      )}
                      <div className="flex space-x-2 mt-2">
                        <motion.button
                          onClick={() => {
                            setModalMode('edit');
                            setSelectedEvent(event);
                            setFormData({
                              title: event.title,
                              start: formatDateTimeForInput(event.start),
                              end: event.end ? formatDateTimeForInput(event.end) : '',
                              description: event.description || '',
                              color: event.color || COLORS[0],
                            });
                            console.log('Opened edit modal for event:', event);
                          }}
                          className="px-3 py-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Modifier ${event.title}`}
                        >
                          Modifier
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="px-3 py-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Supprimer ${event.title}`}
                        >
                          Supprimer
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {(modalMode === 'create' || modalMode === 'edit') && (
                <>
                  <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    {modalMode === 'create' ? 'Créer un événement' : 'Modifier un événement'}
                  </h3>
                  <form onSubmit={modalMode === 'create' ? handleCreateEvent : handleUpdateEvent}>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-xs sm:text-sm text-gray-600">Titre</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg text-xs sm:text-sm ${error && !formData.title ? 'border-red-500' : ''}`}
                        required
                        maxLength={255}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="start" className="block text-xs sm:text-sm text-gray-600">Début</label>
                      <input
                        type="datetime-local"
                        id="start"
                        name="start"
                        value={formData.start}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg text-xs sm:text-sm ${error && !formData.start ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="end" className="block text-xs sm:text-sm text-gray-600">Fin (optionnel)</label>
                      <input
                        type="datetime-local"
                        id="end"
                        name="end"
                        value={formData.end}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg text-xs sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-xs sm:text-sm text-gray-600">Description (optionnel)</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg text-xs sm:text-sm"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="color" className="block text-xs sm:text-sm text-gray-600">Couleur (optionnel)</label>
                      <select
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg text-xs sm:text-sm"
                      >
                        <option value="">Aucune</option>
                        {COLORS.map((color, idx) => (
                          <option key={idx} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                    {error && <p className="text-xs text-red-600 mb-4">{error}</p>}
                    <div className="flex space-x-2">
                      <motion.button
                        type="submit"
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-sm hover:bg-pink-600 transition-colors text-xs sm:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        aria-label={modalMode === 'create' ? 'Créer événement' : 'Modifier événement'}
                      >
                        {loading ? 'En cours...' : modalMode === 'create' ? 'Créer' : 'Modifier'}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setModalMode(null);
                          setSelectedEvent(null);
                          setFormData({
                            title: '',
                            start: '',
                            end: '',
                            description: '',
                            color: COLORS[0],
                          });
                          setError(null);
                          console.log('Modal closed via cancel');
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 transition-colors text-xs sm:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Annuler"
                      >
                        Annuler
                      </motion.button>
                    </div>
                  </form>
                </>
              )}

              {modalMode === 'view' && (
                <motion.button
                  onClick={() => {
                    setModalMode(null);
                    setSelectedDay(null);
                    console.log('View modal closed');
                  }}
                  className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-sm hover:bg-pink-600 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fermer la modale"
                >
                  Fermer
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCalendar;