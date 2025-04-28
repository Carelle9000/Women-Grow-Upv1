"use client";
import React, { useState, useEffect } from "react";

// 🧩 Composants
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Herosection from "../Components/SectionsHome/Herosection";
import TripleEnjeuSection from "../Components/SectionsHome/TripleEnjeuSection";
import ActualitesSection from "../Components/SectionsHome/ActualitesSection";
import RealisationsSection from "../Components/SectionsHome/RealisationsSection";
import TemoignagesSection from "../Components/SectionsHome/TemoignagesSection";

const HOME = () => {
  return (
    <div className="bg-indigo-50 min-h-screen">
      <Header  />
      <Herosection />
      <TripleEnjeuSection />
      <ActualitesSection />
      <RealisationsSection />
      <TemoignagesSection />
      <Footer />
    </div>
  );
};

export default HOME;
