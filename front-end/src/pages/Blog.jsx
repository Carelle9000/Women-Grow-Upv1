"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from "../Components/SectionBlog/BlogCard";
import AuthorInfo from "../Components/SectionBlog/AuthorInfo";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react"; // icônes burger
import momo from "@/assets/images/momo.png";
import Footer from "../Components/Footer"

const Blog = () => {    
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
          <a href="#blog" className="  text-fuchsia-500" role="menuitem">
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
          {/* Hero Section */}
      <header className="flex relative flex-col   text-white min-h-[646px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/2e3936c6e7de64c79fc18d3825631cf8bd49faef?placeholderIfAbsent=true"
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
    </nav>
    

      {/* Blog Content Section */}
      <section className="flex flex-col items-start self-center mt-32 w-full max-w-[1331px] max-md:mt-10 max-md:max-w-full pb-10">
        <h2 className="text-3xl font-bold leading-none text-fuchsia-700 max-md:max-w-full">
          Blogs & Postes Récents
        </h2>

        {/* First Row of Blog Posts */}
        <div className="self-stretch mt-7 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[32%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full text-black max-md:mt-10">
                <div className="flex flex-col pl-3">
                  <BlogCard
                    image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/c518cfca75fa4d154ed8306d8f06190c1b2fb075?placeholderIfAbsent=true"
                    title="Des propositions structurantes pour la féminisation des métiers du numérique."
                    description="L'envol des femmes pour un nouvelle ere du numerique."
                  />
                </div>
                <AuthorInfo
                  authorImage="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/5ab181c445a97718706ceb2231b0b00e83429003?placeholderIfAbsent=true"
                  authorName="Hammah Marikash"
                  date="14 mars 2024"
                />
              </div>
            </div>
            <div className="ml-5 w-[68%] max-md:ml-0 max-md:w-full">
              <div className="w-full max-md:mt-10 max-md:max-w-full">
                <div className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <div className="w-6/12 max-md:ml-0 max-md:w-full">
                      <BlogCard
                        className="flex flex-col grow max-md:mt-10"
                        image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/2764d1f2bddb564a6e203c949c22816ff8ac5940?placeholderIfAbsent=true"
                        title="Des propositions structurantes pour la féminisation des métiers du numérique."
                        description="L'envol des femmes pour un nouvelle ere du numerique."
                      />
                    </div>
                    <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="grow text-black max-md:mt-10">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/04e1fd2485c6946050c5f41587fe2a9f57c12b8f?placeholderIfAbsent=true"
                          alt="Blog post image"
                          className="object-contain w-full rounded-3xl aspect-[1.35] max-md:mr-1.5"
                        />
                        <div className="flex flex-col pl-2 mt-7">
                          <h3 className="text-2xl font-bold">
                            Des propositions structurantes
                            <br />
                            pour la féminisation des métiers du numérique.
                          </h3>
                          <p className="self-start mt-3 text-xl">
                            L'envol des femmes pour un nouvelle ere du
                            numerique.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-10 mt-5 max-w-full text-base text-black w-[820px]">
                  <AuthorInfo
                    authorImage="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/ed4a9ec8bc9f73629ecc03524f57c6f4966653ce?placeholderIfAbsent=true"
                    authorName="Hammah Marikash"
                    date="14 mars 2024"
                  />
                  <AuthorInfo
                    authorImage="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/9bae3b2f007a238099d3e1dcae21284b274cf9c4?placeholderIfAbsent=true"
                    authorName="Hammah Marikash"
                    date="14 mars 2024"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row of Blog Posts */}
        <div className="mt-36 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[33%] max-md:ml-0 max-md:w-full">
              <BlogCard
                className="flex flex-col grow max-md:mt-10"
                image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/8a332a54196d7cf9389089cfdadfc7c445fc72e6?placeholderIfAbsent=true"
                title="Des propositions structurantes pour la féminisation des métiers du numérique."
                description="L'envol des femmes pour un nouvelle ere du numerique."
              />
            </div>
            <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <BlogCard
                className="flex flex-col grow max-md:mt-10"
                image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b97720039f0aba1b092b9671dca9268506b464b2?placeholderIfAbsent=true"
                title="Des propositions structurantes pour la féminisation des métiers du numérique."
                description="L'envol des femmes pour un nouvelle ere du numerique."
              />
            </div>
            <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="grow text-black max-md:mt-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/dab0b2629061fcc2dd18ac5e2430f265d25791db?placeholderIfAbsent=true"
                  alt="Blog post image"
                  className="object-contain w-full rounded-3xl aspect-[1.34] max-md:mr-1.5"
                />
                <div className="flex flex-col pl-2 mt-7">
                  <h3 className="text-2xl font-bold">
                    Des propositions structurantes
                    <br />
                    pour la féminisation des métiers du numérique.
                  </h3>
                  <p className="self-start mt-3.5 text-xl">
                    L'envol des femmes pour un nouvelle ere du numerique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author Information for Second Row */}
        <div className="flex flex-wrap gap-10 mt-6 w-full text-base text-black max-w-[1266px] max-md:max-w-full">
          <div className="flex flex-1 gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/f9d8b1ac36f04b155a96ad113766869c42a3d885?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 w-10 rounded-full aspect-square"
            />
            <div className="my-auto">Hammah Marikash</div>
            <div className="flex gap-1 self-start mt-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
          <div className="flex flex-1 gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/f2ba107d133c7ea78b02eb212704bf7ef534268e?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 w-10 rounded-full aspect-square"
            />
            <div className="my-auto">Hammah Marikash</div>
            <div className="flex gap-1 self-start mt-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
          <div className="flex flex-1 gap-2.5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/5aff014ac43fecad594183576096ca1297f45fdd?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 w-10 rounded-full aspect-square"
            />
            <div className="my-auto">Hammah Marikash</div>
            <div className="flex gap-1 self-start mt-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
        </div>

        {/* Third Row of Blog Posts */}
        <div className="mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[33%] max-md:ml-0 max-md:w-full">
              <BlogCard
                className="flex flex-col grow max-md:mt-10"
                image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/4b5966cfa364c82b99c69dce98165d1712613f8b?placeholderIfAbsent=true"
                title="Des propositions structurantes pour la féminisation des métiers du numérique."
                description="L'envol des femmes pour un nouvelle ere du numerique."
              />
            </div>
            <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <BlogCard
                className="flex flex-col grow max-md:mt-10"
                image="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/911e78dd8e405d22acde2d3cbed09f4794bc3aa0?placeholderIfAbsent=true"
                title="Des propositions structurantes pour la féminisation des métiers du numérique."
                description="L'envol des femmes pour un nouvelle ere du numerique."
              />
            </div>
            <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="grow text-black max-md:mt-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/db5b6c927044c25694122d2c76d6aac22d64c741?placeholderIfAbsent=true"
                  alt="Blog post image"
                  className="object-contain w-full rounded-3xl aspect-[1.35] max-md:mr-1.5"
                />
                <div className="flex flex-col pl-2 mt-7">
                  <h3 className="text-2xl font-bold">
                    Des propositions structurantes
                    <br />
                    pour la féminisation des métiers du numérique.
                  </h3>
                  <p className="self-start mt-3 text-xl">
                    L'envol des femmes pour un nouvelle ere du numerique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author Information for Third Row */}
        <div className="flex flex-wrap gap-10 mt-3.5 w-full text-base text-black max-w-[1276px] max-md:max-w-full">
          <div className="flex flex-1 gap-2.5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/20d1501e41f5ab65fe3d3016912b6812557378bc?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 w-10 rounded-full aspect-square"
            />
            <div className="my-auto">Hammah Marikash</div>
            <div className="flex gap-1 self-start mt-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
          <div className="flex flex-1 gap-3 items-start">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/11e2fe9cc6e452e8ec468e6866b2d0063a1fe12a?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 self-stretch w-10 rounded-full aspect-square"
            />
            <div className="mt-3.5">Hammah Marikash</div>
            <div className="flex gap-1 mt-3.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
          <div className="flex flex-1 gap-2.5 items-start">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/1c38936edaeaf0f26357d874ef46767d1d6c0b78?placeholderIfAbsent=true"
              alt="Author profile"
              className="object-contain shrink-0 self-stretch w-10 rounded-full aspect-square"
            />
            <div className="mt-3.5">Hammah Marikash</div>
            <div className="flex gap-1 mt-3.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
                alt="Calendar icon"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div>14 mars 2024</div>
            </div>
          </div>
        </div>
      </section>
     <Footer />
    </main>
  );
};

export default Blog;
