"use client";
import * as React from "react";

function HeroAbout() {

  
  
    return ( 
             
    <div className=" w-full h-[80vh] flex items-center justify-center overflow-hidden shadow-2xl mb-7">  
     <link
        href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&family=Tienne:wght@700&display=swap"
        rel="stylesheet"
      />

     <div className=" h-130 w-full relative flex items-center justify-center overflow-hidden ">
      <img
        src="/src/assets/images/About.jpg"
        alt="Header background"
        className="object-cover absolute inset-0 size-full h-150"
      />
      </div>
      <div className=" h-[80vh] absolute top-0 left-0 w-full  bg-black/40 " />
     </div>
    
  );
}

export default HeroAbout;