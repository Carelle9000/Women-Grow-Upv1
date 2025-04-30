"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

// 🧩 Composants
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ObjectiveSection from "../Components/SectionsAbout/ObjectiveSection";
import HeroAbout from "../Components/SectionsAbout/HeroAbout";
import MembersSection from "../Components/SectionsAbout/MembersSection";

const About = () => {
  // État pour contrôler la visibilité du bouton
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Effet pour détecter le défilement et afficher/masquer le bouton
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton lorsque l'utilisateur a défilé au-delà de 300px
      setShowScrollTop(window.scrollY > 300);
    };
    
    // Ajouter l'écouteur d'événement au chargement du composant
    window.addEventListener('scroll', handleScroll);
    
    // Vérification initiale
    handleScroll();
    
    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fonction pour faire défiler jusqu'en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-indigo-50 min-h-screen relative">
      <Header />
      <HeroAbout />
      <ObjectiveSection />
      <MembersSection />
      <Footer />
      
      {/* Bouton Scroll to top avec animation - apparaît seulement quand showScrollTop est true */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors duration-300"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Revenir en haut de la page"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default About;