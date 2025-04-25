"use client";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react"; // icônes burger
//import HeroSection from "./SectionsHome/Herosection";
import momo from "@/assets/images/momo.png";


function HeroAbout() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Utilisation de useNavigate

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToLogin = () => {
    navigate("/Login"); // Utilisation de navigate pour aller à la page de login
  };

  return (
    <nav aria-label="Main Navigation bg-transparent h-[200px]">
      <link
        href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&family=Tienne:wght@700&display=swap"
        rel="stylesheet"
      />
      <div className="flex justify-between items-center px-9 py-1 mx-auto my-0 w-full  max-md:flex-col max-md:items-start max-sm:px-5 max-sm:py-1 bg-transparent absolute z-20 ">
        <img
          src={momo}
          className="h-[96px] w-[289px]"
          alt="Logo"
        />

        {/* Toggle Button (Mobile only) */}
        <button
          onClick={toggleMenu}
          className="text-white text-2xl md:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex flex-col w-full mt-4" : "hidden"
          } md:flex gap-5 md:flex-row md:items-center md:gap-5`}
          role="menubar"
        >
          <a href="#acceuil" className="text-white " role="menuitem">
            Acceuil
          </a>
          <a href="#a-propos" className=" text-fuchsia-500" role="menuitem">
            A Propos
          </a>
          <a href="#blog" className=" text-white" role="menuitem">
            Blog
          </a>
          <a href="#digithek" className=" text-white" role="menuitem">
            Digithek
          </a>
          <a href="#cours" className=" text-white" role="menuitem">
            Cours
          </a>
          <a href="#forum" className=" text-white" role="menuitem">
            Forum
          </a>
          <a href="#contact" className=" text-white" role="menuitem">
            Contact
          </a>
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
      <div className="z-20 h-200">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/9d9284997c990f0525fb7904a26529fb932d3c74?placeholderIfAbsent=true"
        alt="Header background"
        className="object-cover absolute inset-0 size-full"
      />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
      </div>
    </nav>
    
  );
}

export default HeroAbout;