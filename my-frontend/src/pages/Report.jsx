"use client";
import React, { useState } from 'react';
import apiEND from "../API/axios";

const Report = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'incident',
    status: 'open',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiEND.post('/reports', formData);
      setSuccess('Signalement soumis avec succès !');
      setError(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        type: 'incident',
        status: 'open',
      });
    } catch (err) {
      setError('Erreur lors de la soumission. Veuillez réessayer.');
      setSuccess(null);
    }
  };

  const handleBack = () => {
    window.history.back(); // Fonction pour revenir en arrière
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-violet-800 to-fuchsia-600 flex items-center justify-center p-1">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-fuchsia-400">
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
        <h1 className="text-2xl font-extrabold text-fuchsia-600 mb-1 text-center">
          Signalement Urgent
        </h1>
        {error && (
          <p className="text-rose-300 bg-violet-900/50 p-1 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-rose-100 bg-violet-900/50 p-1 rounded-lg text-sm mb-4 text-center">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-2"> {/* Espacement réduit ici */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Titre
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-fuchsia-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 bg-rose-100/80 text-violet-900 placeholder-violet-400 transition-shadow hover:shadow-md"
              placeholder="Entrez le titre"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-fuchsia-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 bg-rose-100/80 text-violet-900 placeholder-violet-400 transition-shadow hover:shadow-md"
              rows="4"
              placeholder="Décrivez l'incident ou la requête"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Lieu
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-fuchsia-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 bg-rose-100/80 text-violet-900 placeholder-violet-400 transition-shadow hover:shadow-md"
              placeholder="Entrez le lieu"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-fuchsia-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 bg-rose-100/80 text-violet-900 transition-shadow hover:shadow-md"
            >
              <option value="incident">Incident</option>
              <option value="request">Requête</option>
              <option value="compliment">Plainte</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-fuchsia-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 bg-rose-100/80 text-violet-900 transition-shadow hover:shadow-md"
            >
              <option value="open">Ouvert</option>
              <option value="in_progress">En cours</option>
              <option value="closed">Fermé</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Soumettre le Signalement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;