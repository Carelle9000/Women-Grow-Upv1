"use client";
import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="overflow-hidden bg-white h-[600px]">
      <footer className="px-10 py-20 w-full bg-fuchsia-700 max-md:px-5 max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {/* Left section with navigation links */}
            <div className="w-[37%] max-md:ml-0 max-md:w-full">
              <nav className="grow max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  {/* Company Info Column */}
                  <div className="w-[63%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-start text-lg text-white max-md:mt-10">
                      <h2 className="text-4xl font-bold text-emerald-50">
                        WOMEN
                      </h2>
                      <h2 className="text-4xl font-bold text-emerald-50">
                        GROW UP
                      </h2>
                      <hr className="flex shrink-0 self-stretch mt-6 h-px bg-white bg-opacity-30" />
                      <ul className="w-full">
                        <li>
                          <a href="#apropos" className="block mt-6">
                            Apropos
                          </a>
                        </li>
                        <li>
                          <a href="#digithek" className="block mt-4">
                            Digithek
                          </a>
                        </li>
                        <li>
                          <a href="#about" className="block mt-4">
                            About
                          </a>
                        </li>
                        <li>
                          <a href="#blog" className="block mt-4">
                            Blog
                          </a>
                        </li>
                        <li>
                          <a href="#mentoring" className="block mt-4">
                            Mentoring
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Links Column */}
                  <div className="ml-5 w-[37%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start text-lg text-white max-md:mt-10">
                      <h3 className="self-stretch text-2xl font-bold">
                        Quick Links
                      </h3>
                      <ul className="w-full">
                        <li>
                          <a
                            href="#nous-rejoindre"
                            className="block self-stretch mt-6 max-md:mr-2"
                          >
                            Nous Rejoindre
                          </a>
                        </li>
                        <li>
                          <a href="#actualites" className="block mt-4">
                            Actualites
                          </a>
                        </li>
                        <li>
                          <a href="#realisations" className="block mt-4">
                            Realisations
                          </a>
                        </li>
                        <li>
                          <a href="#missions" className="block mt-4">
                            Missions
                          </a>
                        </li>
                        <li>
                          <a href="#consultation" className="block mt-4">
                            Consultation
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right section with social media and newsletter */}
            <div className="ml-5 w-[63%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  {/* Social Media Section */}
                  <div className="w-[29%] max-md:ml-0 max-md:w-full">
                    <section className="flex flex-col w-full max-md:mt-10">
                      <h3 className="text-2xl font-bold text-white">
                        Social Media
                      </h3>
                      <div className="flex gap-4 self-start mt-6">
                        <a
                          href="#social1"
                          className="block"
                          aria-label="Social Media Platform 1"
                        >
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/42ee014639fbf9394eb279d8a88d7db61ce0b6ac?placeholderIfAbsent=true"
                            alt="Social Media Icon 1"
                            className="object-contain shrink-0 w-10 aspect-square rounded-[33554400px]"
                          />
                        </a>
                        <a
                          href="#social2"
                          className="block"
                          aria-label="Social Media Platform 2"
                        >
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/6104dd35917718ab2347228737bf06acb8af38f7?placeholderIfAbsent=true"
                            alt="Social Media Icon 2"
                            className="object-contain shrink-0 w-10 aspect-square rounded-[33554400px]"
                          />
                        </a>
                        <a
                          href="#social3"
                          className="block"
                          aria-label="Social Media Platform 3"
                        >
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/4308de81ce11d8f59d36d73d21d7fedaaa965b89?placeholderIfAbsent=true"
                            alt="Social Media Icon 3"
                            className="object-contain shrink-0 w-10 aspect-square rounded-[33554400px]"
                          />
                        </a>
                      </div>
                    </section>
                  </div>

                  {/* Newsletter Section */}
                  <div className="ml-5 w-[71%] max-md:ml-0 max-md:w-full">
                    <section className="flex flex-col items-start w-full max-md:mt-10">
                      <h3 className="text-2xl font-bold text-white">
                        Newsletter
                      </h3>
                      <p className="mt-2 text-lg leading-7 text-white w-[248px]">
                        Recevez en temps reel toutes nos informations.
                      </p>
                      <form
                        onSubmit={handleSubmit}
                        className="flex gap-5 justify-between self-stretch mt-11 text-base max-md:mt-10 w-full"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Envoyer votre Email ici..."
                          className="px-3.5 py-4 bg-white rounded-lg border-2 border-solid  border-opacity-0 text-neutral-400 max-md:pr-5 flex-grow"
                          required
                          aria-label="Email for newsletter"
                        />
                        <button
                          type="submit"
                          className="px-6 pt-3 pb-4 font-bold text-center text-white whitespace-nowrap bg-pink-500 rounded-lg max-md:px-5 hover:bg-pink-600 transition-colors"
                        >
                          Envoyer
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <section className="flex flex-wrap gap-5 justify-between mt-20 w-full text-base text-white max-w-[1192px] max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-10">
            <p className="flex-auto my-auto">
              © 2024 Women Grow Up. All rights reserved.
            </p>
            <button
              className="flex gap-2 px-4 py-2 font-bold text-center whitespace-nowrap bg-pink-500 rounded-md hover:bg-pink-600 transition-colors"
              aria-label="Report an issue"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/c3b6b1da7e06c7e2f0990dacf2d18cd2ae27d124?placeholderIfAbsent=true"
                alt="Report icon"
                className="object-contain shrink-0 my-auto w-4 aspect-square"
              />
              <span>Signaler</span>
            </button>
          </div>
          <nav className="flex gap-10 my-auto max-md:max-w-full">
            <a href="/privacy" className="grow hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="basis-auto hover:underline">
              Terms of Service
            </a>
            <a href="/cookies" className="basis-auto hover:underline">
              Cookie Policy
            </a>
          </nav>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
