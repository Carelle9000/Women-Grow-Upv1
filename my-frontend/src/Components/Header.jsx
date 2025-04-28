"use client";
import * as React from "react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icônes burger
import momo from "@/assets/images/momo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook pour obtenir le chemin actuel

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  // Fonction pour déterminer si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="h-[70px] fixed top-0 z-50 w-full bg-black/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&family=Tienne:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="flex w-full px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={momo} alt="Logo" className="h-[50px] md:h-[60px] p-1" />
        </Link>
        
        {/* Espace flexible pour pousser le menu à droite */}
        <div className="flex-grow"></div>
        
        

        {/* Burger Button */}
        <button
          onClick={toggleMenu}
          className="text-white text-3xl md:hidden ml-auto"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={32} />}
        </button>

        {/* Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row gap-6 md:items-center absolute md:static top-20 left-0 right-0 bg-black md:bg-transparent p-5 md:p-0 transition-all duration-300`}
          role="menubar"
        >
          <Link 
            to="/" 
            onClick={closeMenu} 
            className={`${isActive("/") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Accueil
          </Link>
          <Link 
            to="/about" 
            onClick={closeMenu} 
            className={`${isActive("/about") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            A Propos
          </Link>
          <Link 
            to="/blog" 
            onClick={closeMenu} 
            className={`${isActive("/blog") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Blog
          </Link>
          <Link 
            to="/digithek" 
            onClick={closeMenu} 
            className={`${isActive("/digithek") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Digithek
          </Link>
          <Link 
            to="/cours" 
            onClick={closeMenu} 
            className={`${isActive("/cours") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Cours
          </Link>
          <Link 
            to="/forum" 
            onClick={closeMenu} 
            className={`${isActive("/forum") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Forum
          </Link>
          <Link 
            to="/contact" 
            onClick={closeMenu} 
            className={`${isActive("/contact") ? "text-fuchsia-500" : "text-white"} hover:text-fuchsia-400 text-base transition`}
          >
            Contact
          </Link>

          {/* Mon Compte button */}
          <button
            onClick={goToLogin}
            className="mt-2 md:mt-0 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-fuchsia-500/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50"
          >
            Mon Compte
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header; 