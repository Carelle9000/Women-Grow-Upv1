"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Articles from "/src/Components/SectionBlog/Articles";
import NewsletterSubscription from "/src/Components/SectionBlog/NewsletterSubscritpion";
import AddArticleButton from "../Components/SectionBlog/AddArticleButton";

// Import the ScrollToTop component (you'll need to create this file in your components directory)
import ScrollToTop from "@/Components/ScrollToTop";

const Blog = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const goToLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };
  
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <main className="flex flex-col bg-indigo-50">
      {/* Header */}
      <Header />
      
      <div className="z-10">
        {/* HeroSection */}
    <header className="relative w-full h-screen max-h-[500px] text-white overflow-hidden">
      {/* Image d'arrière-plan avec overlay */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/balance-transfer.jpeg"
          alt="Blog hero background"
          className="object-cover w-full h-full"
        />
        {/* Overlay noir semi-transparent */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Contenu héro centré */}
      <div className="relative flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Découvrez notre tout nouveau blog !
          </h1>
          
          <div className="space-y-2 text-base md:text-lg lg:text-xl">
            <p>
              Nous sommes ravis de vous présenter notre espace dédié aux idées, conseils et actualités.
            </p>
            <p>
              Retrouvez ici des articles inspirants, des analyses approfondies et des astuces pratiques.
            </p>
          </div>
        </div>
      </div>
    </header>
      </div>
      
      <Articles />
      <NewsletterSubscription />
      <Footer />
      
      {/* Add the ScrollToTop component */}
      <ScrollToTop />
    </main>
  );
};

export default Blog;