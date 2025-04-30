"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom"; // pour la redirection
import womanImage from "@/assets/images/femme4.jpeg";

function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <section className="relative mx-auto w-full h-[96vh] max-w-[1512px] overflow-hidden">
      {/* Image de fond */}
      <img
        src={womanImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 bg-cover bg-no-repeat"
      />

      {/* Overlay noir semi-transparent */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      {/* Contenu */}
      <div className="relative z-20 flex flex-col justify-center items-end h-full px-12 max-md:px-8 max-sm:px-5">
        <header>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="73:139" width="430" height="177" viewBox="0 0 430 177" fill="none" xmlns="http://www.w3.org/2000/svg" class="title-svg" style="width: 429px; height: 176px; margin-bottom: 20px"> <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Tienne" font-size="27" font-weight="bold" letter-spacing="0em"><tspan x="121.115" y="143.478">GROW UP</tspan></text> <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Tienne" font-size="96" letter-spacing="0em"><tspan x="-0.578125" y="95.4781">WOMEN </tspan></text> <line x1="330.834" y1="147.166" x2="424.611" y2="147.166" stroke="#F845A7" stroke-opacity="0.86" stroke-width="5"></line> <path d="M103.497 151.521C104.878 151.511 105.991 150.384 105.984 149.003C105.978 147.622 104.853 146.511 103.472 146.521L103.497 151.521ZM103.472 146.521L11.7666 147.166L11.7912 152.166L103.497 151.521L103.472 146.521Z" fill="#F845A7" fill-opacity="0.86"></path> </svg>',
            }}
            aria-label="WOMEN GROW UP"
          />
        </header>

        <p className="mb-6 text-2xl text-white text-opacity-90 text-right">
          Travaillons Ensemble pour la protection et <br/> l'emancipation du genre Féminin
        </p>

        <button
          onClick={handleClick}
          className="text-xl text-white bg-fuchsia-700 hover:bg-fuchsia-800 px-8 py-3 rounded-2xl transition"
        >
          Nous Rejoindre
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
