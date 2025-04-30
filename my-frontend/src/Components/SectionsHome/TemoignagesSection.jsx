"use client";
import React, { useState } from "react";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/987416c3779fba69606b7d98b016ce69dd8e7b64?placeholderIfAbsent=true",
    quote:
      "Je suis fière de faire partie de cette communauté qui autonomise les femmes.",
    name: "Anne Dubois",
    role: "Mentore",
  },
  {
    id: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/987416c3779fba69606b7d98b016ce69dd8e7b64?placeholderIfAbsent=true",
    quote:
      "Les ateliers m'ont donné les outils nécessaires pour réussir dans mon domaine.",
    name: "Marie Laurent",
    role: "Entrepreneure",
  },
  {
    id: 3,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/987416c3779fba69606b7d98b016ce69dd8e7b64?placeholderIfAbsent=true",
    quote:
      "Grâce à ce réseau, j'ai pu développer mes compétences professionnelles et faire de nouvelles connaissances.",
    name: "Sophie Martin",
    role: "Développeuse",
  },
  {
    id: 4,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/987416c3779fba69606b7d98b016ce69dd8e7b64?placeholderIfAbsent=true",
    quote:
      "Une expérience enrichissante qui m'a permis de rencontrer des femmes inspirantes.",
    name: "Claire Moreau",
    role: "Consultante",
  },
];

// Navigation Arrow Component
function NavigationArrow({ direction, onClick }) {
  const leftArrowSvg = `<svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon" style="width: 35px; height: 24px; stroke: #9B38BC"> <path d="M22.2028 18L13.4539 12L22.2028 6" stroke="#9B38BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`;

  const rightArrowSvg = `<svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon" style="width: 35px; height: 24px; stroke: #9B38BC"> <path d="M13.3391 18L22.088 12L13.3391 6" stroke="#9B38BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`;

  return (
    <div className="flex justify-center items-center h-14 bg-white rounded-[33554400px] shadow-[0px_4px_12px_rgba(0,0,0,0.10)] w-[82px] max-md:hidden">
      <button
        onClick={onClick}
        aria-label={
          direction === "left" ? "Previous testimonial" : "Next testimonial"
        }
        className="flex items-center justify-center w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: direction === "left" ? leftArrowSvg : rightArrowSvg,
          }}
        />
      </button>
    </div>
  );
}

// Mobile Navigation Component
function MobileNavigation({ currentSlide, totalSlides, onNavigate }) {
  return (
    <div className="hidden max-md:flex justify-center items-center mt-4 space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            currentSlide === index + 1 ? "bg-fuchsia-700" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({
  image,
  quote,
  name,
  role,
  onPrevious,
  onNext,
  currentSlide,
  totalSlides,
}) {
  return (
    <article className="box-border flex justify-between items-center p-5 w-full bg-white rounded-3xl max-w-[1167px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] max-md:flex-col max-md:p-5 max-sm:p-4 transition-opacity duration-300">
      <NavigationArrow direction="left" onClick={onPrevious} />

      <div className="flex flex-col grow items-center text-center">
        <img
          src={image}
          className="mb-5 h-[150px] rounded-[33554400px] w-[219px] max-md:mb-2.5 max-sm:h-[120px] max-sm:w-[180px]"
          alt="Profile Image"
        />
        <p className="mb-5 text-2xl leading-9 text-stone-500 max-md:text-2xl max-sm:text-xl">
          {quote}
        </p>
        <h3 className="mb-1.5 text-xl font-bold text-zinc-800 max-md:text-lg max-sm:text-base">
          {name}
        </h3>
        <p className="text-base text-fuchsia-700 max-md:text-sm max-sm:text-xs">
          {role}
        </p>
        <div className="mt-4 text-sm text-fuchsia-700 font-medium">
          {currentSlide} / {totalSlides}
        </div>
      </div>

      <NavigationArrow direction="right" onClick={onNext} />
    </article>
  );
}

// Font Provider Component
function FontProvider() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Tienne:wght@400;700&display=swap"
      rel="stylesheet"
    />
  );
}

// Main Testimonial Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleNavigate = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <FontProvider />
      <section className="box-border flex flex-col  items-center p-5 mx-auto my-0 w-full max-w-[1359px] max-md:max-w-[991px] max-sm:max-w-screen-sm mb-10">
        <h2 className=" text-2xl  mb-4 font-bold text-fuchsia-600 left max-sm:text-2xl">
          Temoignages
        </h2>
        <TestimonialCard
          image={testimonials[currentIndex].image}
          quote={testimonials[currentIndex].quote}
          name={testimonials[currentIndex].name}
          role={testimonials[currentIndex].role}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentSlide={currentIndex + 1}
          totalSlides={testimonials.length}
        />
        <MobileNavigation
          currentSlide={currentIndex + 1}
          totalSlides={testimonials.length}
          onNavigate={handleNavigate}
        />
      </section>
    </>
  );
}

export default TestimonialCarousel;
