"use client";
import React from "react";
import { useState, useEffect } from 'react';
import Contactsection from "../Components/Contactsection";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react"; // icônes burger
import momo from "@/assets/images/momo.png";
import Footer from "../Components/Footer"

const Contact = () => {    
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Utilisation de useNavigate

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToLogin = () => {
    navigate("/Login"); // Utilisation de navigate pour aller à la page de login
  };
  return (
    <main className="flex flex-col bg-indigo-50">
            {/*Header*/}

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
          <a href="#a-propos" className=" text-white" role="menuitem">
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
          <a href="#contact" className=" text-fuchsia-500" role="menuitem">
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
          {/* Hero Section */}
                        <header className="relative h-[500px] text-white w-full">
                {/* Image de fond */}
                <img
                    src="./src/assets/images/Contactimage.jpg"
                    alt="Blog hero background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Overlay noir semi-transparent */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Contenu texte */}
                <div className="relative z-20 flex flex-col justify-center items-center h-full px-6 text-center">
                    <div className="max-w-4xl w-full mt-40 space-y-6">
                    <h1 className="text-4xl font-bold max-md:text-2xl">
                        Contactez-nous !!
                    </h1>
                    <p className="text-lg max-md:text-base">
                        Nous sommes à votre écoute pour répondre à vos questions,
                        vous accompagner dans vos projets ou simplement échanger avec vous.
                        N’hésitez pas à nous contacter, nous reviendrons vers vous au plus vite.
                    </p>
                    </div>
                </div>
                </header>
      </div>
      
    </nav>
    <div className="-mt-25 z-20">
    <Contactsection />
      </div>
      <div className="w-full mt-7 mb-10 px-4 border-rounded-3xl shadow-2xl">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7959.687815939688!2d9.69469177238176!3d4.052240829790386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061138b8984d0cb%3A0xe4fc92a7a6d64505!2sIncH%20Class!5e0!3m2!1sfr!2scm!4v1745589905105!5m2!1sfr!2scm" 
    width="100%" 
    height="450" 
    style={{ 
      border: 0, 
      borderRadius: '15px', // Pour arrondir les bords
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Pour ajouter l'ombre
      margin: '5 auto', // Pour centrer l'élément
    
    }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade">
  </iframe>
</div>


     <Footer />
    </main>
  );
};

export default Contact;
