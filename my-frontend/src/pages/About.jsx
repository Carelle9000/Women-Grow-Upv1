"use client";
import * as React from "react";
// 🧩 Composants
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ObjectiveSection from "../Components/SectionsAbout/ObjectiveSection";
import HeroAbout from "../Components/SectionsAbout/HeroAbout";
import MembersSection from "../Components/SectionsAbout/MembersSection";
const About = () => {
    return (
      <div className="bg-indigo-50 ">
        <Header />
        <HeroAbout  />
        <ObjectiveSection  />
        <MembersSection />
        <Footer />
      </div>
    );
  };
  
  export default About;




