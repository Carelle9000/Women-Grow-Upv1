import React, { useState } from 'react';
import {  Link } from "react-router-dom";


export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-pink-200 py-10 px-4 rounded-lg mb-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-fuchsia-600 mb-3">Abonnez-vous à notre newsletter.</h2>
        
        <p className="text-gray-600 mb-6">
        Restez informé des derniers articles, conseils et événements sur la gestion des déchets et la durabilité environnementale.        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="email"
            placeholder="Entrer votre email"
            className={`flex-grow py-3 px-4 bg-white rounded-md border ${
              error ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          
          <button
            type="submit"
            className={`bg-purple-600 text-white font-medium py-3 px-8 rounded-md hover:bg-purple-800 transition duration-200 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours....
              </span>
            ) : (
              'Soumettre'
            )}
          </button>
        </form>
        
        {error && (
          <div className="text-red-500 text-sm mb-3">{error}</div>
        )}
        
        {isSubscribed && (
          <div className="text-purple-600 text-sm mb-3 flex items-center justify-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Merci  pour votre Abonnement!
          </div>
        )}
        
        <p className="text-sm text-gray-500">
        Nous prenons soin de vos données. Lisez notre politique de confidentialité.{' '}
        <Link to="/privacy-policy" className="text-white hover:text-blue-500">
          Politique de Confidentialité
        </Link>      
          </p>
      </div>
    </div>
  );
}