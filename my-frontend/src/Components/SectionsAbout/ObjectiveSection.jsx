"use client";
import React, { useState } from "react";

// ObjectiveCard component for better organization and reusability
const ObjectiveCard = ({
  icon,
  title,
  description,
  index,
  activeSection,
  setActiveSection,
}) => {
  return (
    <article
      className="flex gap-6 items-start p-4 object-cover rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] size-full"
      onMouseEnter={() => setActiveSection(index)}
      onMouseLeave={() => setActiveSection(null)}
      style={{
        transform:
          activeSection === index ? "translateX(10px)" : "translateX(0)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="h-[43px] min-w-[43px]">{icon}</div>
      <div className="h-30">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-base leading-relaxed text-gray-600">{description}</p>
      </div>
    </article>
  );
};

function ObjectiveSection() {
  const [activeSection, setActiveSection] = useState(null);

  // SVG icons for each objective
  const icons = {
    icon1: (
      <svg
        width="43"
        height="30"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2235 27.3563V30.9728H16.9905V20.1233H20.607V27.3563H24.2235ZM22.4153 3.849C24.7899 3.849 27.1413 4.31672 29.3352 5.22545C31.5291 6.13419 33.5225 7.46614 35.2016 9.14526C36.8807 10.8244 38.2127 12.8178 39.1214 15.0117C40.0301 17.2055 40.4978 19.5569 40.4978 21.9316C40.4978 26.7274 38.5927 31.3267 35.2016 34.7179C31.8104 38.109 27.2111 40.0141 22.4153 40.0141C20.0406 40.0141 17.6893 39.5464 15.4954 38.6377C13.3015 37.7289 11.3081 36.397 9.62898 34.7179C6.23784 31.3267 4.33272 26.7274 4.33272 21.9316C4.33272 17.1358 6.23784 12.5364 9.62898 9.14526C13.0201 5.75412 17.6195 3.849 22.4153 3.849ZM22.4153 7.46551C18.5786 7.46551 14.8991 8.98961 12.1862 11.7025C9.47333 14.4154 7.94923 18.0949 7.94923 21.9316C7.94923 25.7682 9.47333 29.4477 12.1862 32.1606C14.8991 34.8735 18.5786 36.3976 22.4153 36.3976C26.2519 36.3976 29.9314 34.8735 32.6443 32.1606C35.3572 29.4477 36.8813 25.7682 36.8813 21.9316C36.8813 18.0949 35.3572 14.4154 32.6443 11.7025C29.9314 8.98961 26.2519 7.46551 22.4153 7.46551Z"
          fill="#9747FF"
        />
      </svg>
    ),
    icon2: (
      <svg
        width="43"
        height="30"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.9905 12.8903H24.2235C25.1827 12.8903 26.1026 13.2713 26.7808 13.9495C27.459 14.6278 27.84 15.5476 27.84 16.5068V20.1233C27.84 21.0825 27.459 22.0023 26.7808 22.6806C26.1026 23.3588 25.1827 23.7398 24.2235 23.7398H20.607V27.3563H27.84V30.9728H16.9905V23.7398C16.9905 22.7807 17.3715 21.8608 18.0498 21.1826C18.728 20.5043 19.6479 20.1233 20.607 20.1233H24.2235V16.5068H16.9905V12.8903ZM22.4153 3.849C24.7899 3.849 27.1413 4.31672 29.3352 5.22545C31.5291 6.13419 33.5225 7.46614 35.2016 9.14526C36.8807 10.8244 38.2127 12.8178 39.1214 15.0117C40.0301 17.2055 40.4978 19.5569 40.4978 21.9316C40.4978 26.7274 38.5927 31.3267 35.2016 34.7179C31.8104 38.109 27.2111 40.0141 22.4153 40.0141C20.0406 40.0141 17.6893 39.5464 15.4954 38.6377C13.3015 37.7289 11.3081 36.397 9.62898 34.7179C6.23784 31.3267 4.33272 26.7274 4.33272 21.9316C4.33272 17.1358 6.23784 12.5364 9.62898 9.14526C13.0201 5.75412 17.6195 3.849 22.4153 3.849ZM22.4153 7.46551C18.5786 7.46551 14.8991 8.98961 12.1862 11.7025C9.47333 14.4154 7.94923 18.0949 7.94923 21.9316C7.94923 25.7682 9.47333 29.4477 12.1862 32.1606C14.8991 34.8735 18.5786 36.3976 22.4153 36.3976C26.2519 36.3976 29.9314 34.8735 32.6443 32.1606C35.3572 29.4477 36.8813 25.7682 36.8813 21.9316C36.8813 18.0949 35.3572 14.4154 32.6443 11.7025C29.9314 8.98961 26.2519 7.46551 22.4153 7.46551Z"
          fill="#9747FF"
        />
      </svg>
    ),
    icon3: (
      <svg
        width="43"
        height="30"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.84 27.9718C27.84 28.931 27.459 29.8508 26.7808 30.5291C26.1026 31.2073 25.1827 31.5883 24.2235 31.5883H16.9905V27.9718H24.2235V24.3553H20.607V20.7388H24.2235V17.1223H16.9905V13.5058H24.2235C25.1827 13.5058 26.1026 13.8868 26.7808 14.565C27.459 15.2432 27.84 16.1631 27.84 17.1223V19.8347C27.84 20.554 27.5543 21.2439 27.0456 21.7526C26.5369 22.2613 25.847 22.547 25.1277 22.547C25.847 22.547 26.5369 22.8328 27.0456 23.3415C27.5543 23.8501 27.84 24.5401 27.84 25.2594V27.9718ZM22.4153 4.46448C24.7899 4.46448 27.1413 4.9322 29.3352 5.84093C31.5291 6.74966 33.5225 8.08162 35.2016 9.76074C36.8807 11.4399 38.2127 13.4333 39.1214 15.6271C40.0301 17.821 40.4978 20.1724 40.4978 22.547C40.4978 27.3428 38.5927 31.9422 35.2016 35.3333C31.8104 38.7245 27.2111 40.6296 22.4153 40.6296C20.0406 40.6296 17.6893 40.1619 15.4954 39.2531C13.3015 38.3444 11.3081 37.0125 9.62898 35.3333C6.23784 31.9422 4.33272 27.3428 4.33272 22.547C4.33272 17.7512 6.23784 13.1519 9.62898 9.76074C13.0201 6.3696 17.6195 4.46448 22.4153 4.46448ZM22.4153 8.08099C18.5786 8.08099 14.8991 9.60509 12.1862 12.318C9.47333 15.0309 7.94923 18.7104 7.94923 22.547C7.94923 26.3837 9.47333 30.0632 12.1862 32.7761C14.8991 35.489 18.5786 37.0131 22.4153 37.0131C26.2519 37.0131 29.9314 35.489 32.6443 32.7761C35.3572 30.0632 36.8813 26.3837 36.8813 22.547C36.8813 18.7104 35.3572 15.0309 32.6443 12.318C29.9314 9.60509 26.2519 8.08099 22.4153 8.08099Z"
          fill="#9747FF"
        />
      </svg>
    ),
    icon4: (
      <svg
        width="43"
        height="33"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.9905 12.8079H20.607V20.041H24.2235V12.8079H27.84V30.8905H24.2235V23.6575H16.9905V12.8079ZM22.4153 3.76666C24.7899 3.76666 27.1413 4.23438 29.3352 5.14312C31.5291 6.05185 33.5225 7.3838 35.2016 9.06292C36.8807 10.742 38.2127 12.7354 39.1214 14.9293C40.0301 17.1232 40.4978 19.4746 40.4978 21.8492C40.4978 26.645 38.5927 31.2444 35.2016 34.6355C31.8104 38.0267 27.2111 39.9318 22.4153 39.9318C20.0406 39.9318 17.6893 39.4641 15.4954 38.5553C13.3015 37.6466 11.3081 36.3146 9.62898 34.6355C6.23784 31.2444 4.33272 26.645 4.33272 21.8492C4.33272 17.0534 6.23784 12.4541 9.62898 9.06292C13.0201 5.67178 17.6195 3.76666 22.4153 3.76666ZM22.4153 7.38317C18.5786 7.38317 14.8991 8.90727 12.1862 11.6202C9.47333 14.3331 7.94923 18.0126 7.94923 21.8492C7.94923 25.6859 9.47333 29.3654 12.1862 32.0783C14.8991 34.7912 18.5786 36.3153 22.4153 36.3153C26.2519 36.3153 29.9314 34.7912 32.6443 32.0783C35.3572 29.3654 36.8813 25.6859 36.8813 21.8492C36.8813 18.0126 35.3572 14.3331 32.6443 11.6202C29.9314 8.90727 26.2519 7.38317 22.4153 7.38317Z"
          fill="#9747FF"
        />
      </svg>
    ),
  };

  // Objective data
  const objectives = [
    {
      icon: icons.icon1,
      title: "Sensibilisation et éducation",
      description: "Informer et sensibiliser sur les enjeux féminins actuels",
    },
    {
      icon: icons.icon2,
      title: "Soutien et accompagnement",
      description:
        "Offrir des ressources (contacts d'urgence, adresses d'associations, services d'aide juridique)",
    },
    {
      icon: icons.icon3,
      title: "Promotion de l'autonomisation",
      description:
        "Diffuser des formations (leadership,  développement personnel)",
    },
    {
      icon: icons.icon4,
      title: "Création de communauté",
      description:
        "Fédérer une communauté solidaire autour des causes féminines",
    },
  ];

  return (
    <section className="bg-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Structure principale - disposition flexbox pour desktop */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Colonne de gauche - Notre objectif */}
          <div className="w-screen md:w-1/3">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Notre objectif
            </h2>
            <div className="flex flex-col gap-4">
              {objectives.map((objective, index) => (
                <ObjectiveCard
                  key={index}
                  icon={objective.icon}
                  title={objective.title}
                  description={objective.description}
                  index={index + 1}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              ))}
            </div>
          </div>
           
        <div
         className="flex flex-1 gap-3 items-center overflow-x-auto pb-4"
          aria-label="Illustrations gallery"
        >
          <div className="relative mt-10 h-[480px] w-[200px]">
            <img
              src="/src/assets/images/femme5.jpeg"
              alt="Illustration 1"
              className="object-cover rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] size-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="relative h-[480px] w-[200px]">
            <img
              src="/src/assets/images/femme1.jpg"
              alt="Illustration 2"
              className="object-cover rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] size-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="relative mt-14 h-[480px] w-[200px]">
            <img
              src="/src/assets/images/femme2.jpg"
              alt="Illustration 3"
              className="object-cover rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] size-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="relative h-[480px] w-[200px]">
            <img
           src="/src/assets/images/sophiemartin.jpg"
              alt="Illustration 4"
              className="object-cover rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] size-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
      </div> 
      {/* Font import for consistent typography */}
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<link href="https://fonts.googleapis.com/css2?family=Tienne&display=swap" rel="stylesheet">',
          }}
        />
      </div>
    </section>
  );
}

export default ObjectiveSection;
