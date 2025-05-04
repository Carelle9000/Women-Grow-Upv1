"use client";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    images: [
      "/src/assets/images/1.jpeg"
    ],
    quote:
      "Je suis fière de faire partie de cette communauté qui autonomise les femmes.",
    name: "Anne Dubois",
    role: "Mentore",
  },
  {
    id: 2,
    images: [
      "/src/assets/images/femme1.jpg"
    ],
    quote:
      "Les ateliers m'ont donné les outils nécessaires pour réussir dans mon domaine.",
    name: "Marie Laurent",
    role: "Entrepreneure",
  },
  {
    id: 3,
    images: [
      "/src/assets/images/femme2.jpg"
    ],
    quote:
      "Grâce à ce réseau, j'ai pu développer mes compétences professionnelles et faire de nouvelles connaissances.",
    name: "Sophie Martin",
    role: "Développeuse",
  },
  {
    id: 4,
    images: [
      "/src/assets/images/marielaurent.jpeg"
    ],
    quote:
      "Une expérience enrichissante qui m'a permis de rencontrer des femmes inspirantes.",
    name: "Claire Moreau",
    role: "Consultante",
  },
];

function NavigationArrow({ direction, onClick }) {
  const svg = direction === "left"
    ? `<svg width='36' height='24' viewBox='0 0 36 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M22.2 18L13.45 12L22.2 6' stroke='#9B38BC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
    : `<svg width='36' height='24' viewBox='0 0 36 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M13.34 18L22.09 12L13.34 6' stroke='#9B38BC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`;

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full shadow hover:opacity-80"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function TestimonialCard({ images, quote, name, role }) {
  const [imageIndex, setImageIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article className="flex flex-col items-center p-5 bg-white rounded-3xl shadow w-[700px] max-md:w-full text-center">
      <img
        src={images[imageIndex]}
        alt={name}
        className="mb-4 w-[120px] h-[120px] rounded-full object-cover"
      />
      <p className="mb-4 text-stone-500">{quote}</p>
      <h3 className="text-lg font-bold text-zinc-800">{name}</h3>
      <p className="text-fuchsia-700">{role}</p>
    </article>
  );
}

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="flex flex-col items-center p-5 max-w-screen-lg mx-auto w-200">
      <h2 className="text-2xl font-bold text-fuchsia-600 mb-6">Témoignages</h2>

      <div className="flex items-center gap-6">
        <NavigationArrow direction="left" onClick={handlePrevious} />
        <TestimonialCard {...currentTestimonial} />
        <NavigationArrow direction="right" onClick={handleNext} />
      </div>
    </section>
  );
}

export default TestimonialCarousel;
