"use client";
import * as React from "react";
// 🧩 Composants
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ObjectiveSection from "../Components/SectionsAbout/ObjectiveSection";
const About = () => {
    return (
      <div className="bg-indigo-50 min-h-screen">
        <Header />
        <ObjectiveSection />
        <Footer />
      </div>
    );
  };
  
  export default About;




