"use client";
import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

// Composant pour un lien de navigation
const NavLink = React.memo(({ to, onClick, children }) => (
  <li>
    <Link to={to} onClick={onClick} className="text-white hover:text-purple-800 text-sm transition font-normal">
      {children}
    </Link>
  </li>
));

// Composant pour un lien rapide
const QuickLink = React.memo(({ path, anchor, label, onClick }) => (
  <li>
    <button onClick={() => onClick(path, anchor)} className="text-white hover:text-purple-900 text-sm font-normal">
      {label}
    </button>
  </li>
));

// Composant pour un icône de réseau social
const SocialIcon = React.memo(({ id, href, imageUrl, alt }) => (
  <a key={id} href={href} className="block" aria-label={alt}>
    <img src={imageUrl} alt={alt} className="w-8 aspect-square rounded-full" />
  </a>
));

function Footer() {
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);
  const goToLogin = useCallback(() => {
    navigate("/login");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  }, [email]);

  const handleRedirect = useCallback(
    (path, anchor) => {
      navigate(`${path}#${anchor}`);
      closeMenu();
    },
    [navigate, closeMenu]
  );

  const navigationLinks = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "A Propos" },
    { path: "/digithek", label: "Digithek" },
    { path: "/cours", label: "Cours" },
    { path: "/forum", label: "Forum" },
    { path: "/contact", label: "Contact" },
  ];

  const quickLinks = [
    { id: 'rejoindre', path: "/SignUp", label: "Nous Rejoindre" },
    { id: 'actualites', path: "/", label: "Actualités" },
    { id: 'realisations', path: "/", label: "Réalisations" },
    { id: 'missions', path: "/about", label: "Missions" },
    { id: 'urgence', path: "/report", label: "Urgence" },
  ];

  const socialMedia = [
    { id: 1, href: "#social1", imageUrl: "https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/42ee014639fbf9394eb279d8a88d7db61ce0b6ac?placeholderIfAbsent=true", alt: "Facebook" },
    { id: 2, href: "#social2", imageUrl: "https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/6104dd35917718ab2347228737bf06acb8af38f7?placeholderIfAbsent=true", alt: "Twitter" },
    { id: 3, href: "#social3", imageUrl: "https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/4308de81ce11d8f59d36d73d21d7fedaaa965b89?placeholderIfAbsent=true", alt: "Instagram" },
  ];

  return (
    <div className="bg-white">
      <footer className="w-full bg-fuchsia-700 px-6 py-6 md:px-8 md:py-8">
        {/* Logo + Réseaux sociaux */}
        <div className="flex justify-between items-start mb-4">
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <h2 className="text-xl font-bold text-emerald-50">WOMEN</h2>
            <h2 className="text-xl font-bold text-emerald-50">GROW UP</h2>
          </Link>
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-semibold text-white mb-2">Réseaux sociaux</h3>
            <div className="flex gap-3">
              {socialMedia.map((icon) => (
                <SocialIcon key={icon.id} {...icon} />
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-white/30 mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Liens de Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Liens de Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <NavLink key={link.path} to={link.path} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* Liens Rapides vers autres pages/sections */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <QuickLink key={link.id} {...link} onClick={handleRedirect} />
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Boite à lettres</h3>
            <p className="text-sm text-white mb-2">
              Recevez en temps réel toutes nos informations.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
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

        {/* Bas de page */}
        <div className="pt-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/report" onClick={closeMenu}>
              <button
                className="flex items-center gap-2 px-3 py-1.5 font-medium bg-pink-500 rounded-md hover:bg-pink-600 transition-colors text-sm text-white"
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
              <Link to="/privacy-policy" className="text-white hover:text-blue-500">
                Politique de Confidentialité
              </Link>
              <a href="/terms" className="text-white hover:underline font-normal">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white hover:underline font-normal">
                Cookie Policy
              </a>
            </nav>
          </div>
          <p className="text-xs text-white text-center mt-4">
            © 2024 Women Grow Up. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;