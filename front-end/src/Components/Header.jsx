"use client";
import * as React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react"; // icônes burger
import HeroSection from "./SectionsHome/Herosection";
import momo from "@/assets/images/momo.png";


function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Utilisation de useNavigate

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToLogin = () => {
    navigate("/login"); // Utilisation de navigate pour aller à la page de login
  };

  return (
    <nav aria-label="Main Navigation bg-transparent">
      <link
        href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&family=Tienne:wght@700&display=swap"
        rel="stylesheet"
      />
      <div className="flex justify-between items-center px-9 py-1 mx-auto my-0 w-full  max-md:flex-col max-md:items-start max-sm:px-5 max-sm:py-1 bg-transparent absolute z-20">
        <img
          src={momo}
          className="h-[103px] w-[289px]"
          alt="Logo"
        />

        {/* Toggle Button (Mobile only) */}
        <button
          onClick={toggleMenu}
          className="text-white text-xl right-4 md:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex flex-col w-full mt-4" : "hidden"
          } transition-all duration-300 ease-in-out md:flex gap-5 md:flex-row md:items-center md:gap-5`}
          role="menubar"
        >
        <Link to="/" className="text-fuchsia-500" role="menuitem">
          Accueil
        </Link>
        <Link to="/a-propos"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
            role="menuitem">
          A Propos
        </Link>
        <Link to="/blog"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
           role="menuitem">
          Blog
        </Link>
        <Link to="/digithek"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
            role="menuitem">
          Digithek
        </Link>
        <Link to="/cours"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
             role="menuitem">
          Cours
        </Link>
        <Link to="/forum"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
         role="menuitem">
          Forum
        </Link>
        <Link to="/contact"   className="text-white hover:text-fuchsia-500 transition-colors duration-300 transform hover:scale-105"
          role="menuitem">
          Contact
        </Link>

        </div>

        {/* Mon Compte Button */}
        <button
          onClick={goToLogin}
          className=" border-fuchsia-700 bg-fuchsia-700  hover:bg-fuchsia-800 border-solid border h-[50px] rounded-2xl text-neutral-100 w-[145px] max-md:mt-2.5 max-sm:w-full max-sm:text-center
          transition-transform duration-300 transform hover:scale-105"
          aria-label="Mon Compte"
        >
          Mon Compte
        </button>
      </div>
      <div className="z-10">
           <HeroSection />
      </div>
    </nav>
    
  );
}

export default Header;