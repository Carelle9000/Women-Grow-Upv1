"use client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const goToLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="bg-white">
      <footer className="w-full bg-fuchsia-700 px-6 py-6 md:px-8 md:py-8"> {/* Adjusted padding */}
        {/* Top Section - Logo + Social */}
        <div className="flex justify-between items-start mb-4"> {/* Reduced margin */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <h2 className="text-xl font-bold text-emerald-50">WOMEN</h2>
            <h2 className="text-xl font-bold text-emerald-50">GROW UP</h2>
          </Link>
          
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-semibold text-white mb-2">Réseaux sociaux</h3> {/* Reduced margin */}
            <div className="flex gap-3">
              {[1, 2, 3].map((item) => (
                <a 
                  key={item} 
                  href={`#social${item}`} 
                  className="block"
                  aria-label={`Social Media Platform ${item}`}
                >
                  <img
                    src={`https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/${item === 1 ? '42ee014639fbf9394eb279d8a88d7db61ce0b6ac' : item === 2 ? '6104dd35917718ab2347228737bf06acb8af38f7' : '4308de81ce11d8f59d36d73d21d7fedaaa965b89'}?placeholderIfAbsent=true`}
                    alt={`Social Media Icon ${item}`}
                    className="w-8 aspect-square rounded-full"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        

        <hr className="border-t border-white/30 mb-4" /> {/* Reduced margin */}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> {/* Reduced gap */}
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Liens de Navigation</h3> {/* Reduced margin */}
            <ul className="space-y-2 "> {/* Reduced space */}
              {[
                { path: "/", label: "Accueil" },
                { path: "/about", label: "A Propos" },
                { path: "/digithek", label: "Digithek" },
                { path: "/cours", label: "Cours" },
                { path: "/forum", label: "Forum" },
                { path: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={closeMenu} 
                    className="text-white hover:text-purple-800 text-sm transition font-normal "
                  >
                    
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Liens Rapides</h3> {/* Reduced margin */}
            <ul className="space-y-2"> {/* Reduced space */}
              {[
                { href: "#nous-rejoindre", label: "Nous Rejoindre" },
                { href: "#actualites", label: "Actualités" },
                { href: "#realisations", label: "Réalisations" },
                { href: "#missions", label: "Missions" },
                { href: "#consultation", label: "Consultation" }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-white hover:text-purple-900 text-sm font-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Boite a lettres</h3> {/* Reduced margin */}
            <p className="text-sm text-white mb-2">
              Recevez en temps réel toutes nos informations.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full"> {/* Reduced gap */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre Email..."
                className="flex-grow px-3 py-2 bg-white rounded-md text-neutral-500 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors text-sm whitespace-nowrap"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-white/20"> {/* Reduced padding */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/report" onClick={closeMenu}>
              <button
                className="flex items-center gap-2 px-3 py-1.5 font-medium bg-pink-500 rounded-md hover:bg-pink-600 transition-colors text-sm text-white"
                aria-label="Report an issue"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/c3b6b1da7e06c7e2f0990dacf2d18cd2ae27d124?placeholderIfAbsent=true"
                  alt="Report icon"
                  className="w-3 aspect-square text-white"
                />
                Signaler
              </button>
            </Link>

            <nav className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/privacy" className="text-white hover:underline font-normal">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white hover:underline font-normal">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white hover:underline font-normal">
                Cookie Policy
              </a>
            </nav>
          </div>

          <p className="text-xs text-white text-center mt-4"> {/* Reduced margin */}
            © 2024 Women Grow Up. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;