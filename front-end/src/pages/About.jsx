"use client";
import * as React from "react";
// 🧩 Composants
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ObjectiveSection from "../Components/SectionsAbout/ObjectiveSection";
import HeroAbout from "../Components/SectionsAbout/HeroAbout";

const About = () => {
    return (
      <div className="bg-indigo-50 min-h-screen">
        <HeroAbout />
        <ObjectiveSection />
        <Footer />
      </div>
    );
  };
  
  export default About;




