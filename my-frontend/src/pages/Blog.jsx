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
        {/* Hero Section */}
        <header className="flex relative flex-col text-white h-150 max-md:max-w-full">
          <img
            src="/src/assets/images/economie1.jpeg"
            alt="Blog hero background"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative flex-col items-start px-16 pt-96 pb-44 w-full bg-black/50 h-full max-md:px-5 max-md:py-24 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between items-start mb-0 w-full max-w-[1276px] max-md:mb-2.5 max-md:max-w-full text-xl">
              <div className="flex flex-col gap-2">
                <h1 className="max-md:max-w-full text-2xl">
                  Découvrez notre tout nouveau blog !
                </h1> <br />
                <p className="">
                  Nous sommes ravis de vous présenter notre espace dédié aux idées, conseils et actualités. <br />
                  Retrouvez ici des articles inspirants, des analyses approfondies et des astuces pratiques. <br />
                </p>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/60d81097ee258945efec484f51889eecbbbbfbbf?placeholderIfAbsent=true"
                alt="Blog logo"
                className="object-contain shrink-0 aspect-square w-[60px]"
              />
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