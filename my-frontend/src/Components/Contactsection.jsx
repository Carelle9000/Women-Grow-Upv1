import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
    consent: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Veuillez accepter la politique de confidentialité.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        navigate("/");
      } else {
        alert("Erreur : " + result.error);
      }
    } catch (error) {
      console.error("Erreur de soumission :", error);
      alert("Une erreur s'est produite.");
    }
  };
  

  return (
    <section className="flex flex-col md:flex-row bg-indigo-50 rounded-2xl overflow-hidden shadow-md mx-auto max-w-5xl my-10 ">
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4">Envoyez-nous un message</h2>

        {["nom", "prenom", "email", "message"].map((field, index) => (
          <div key={index}>
            <label className="block text-md font-semibold mb-1 capitalize">
              {field}:
            </label>
            {field === "message" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg px-4 py-2 bg-gray-200 outline-none"
                required
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-gray-200 outline-none"
                required
              />
            )}
          </div>
        ))}

        {/* Consentement */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">
            J’ai pris conscience de la politique de confidentialité.
          </label>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition ml-130"
        >
          Envoyer
        </button>
      </form>

      {/* Coordonnées */}
      <div className="w-full md:w-1/3 p-6 bg-indigo-100 space-y-6 text-gray-800 text-base md:text-sm">
        <h2 className="text-2xl font-bold mb-4">Nos coordonnées</h2>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-purple-600 flex items-center justify-center rounded-full mt-1">
            <FaMapMarkerAlt className="text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold">Localisation</p>
            <p>Douala, Akwa - rue Joffre</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-purple-600 flex items-center justify-center rounded-full mt-1">
            <FaEnvelope className="text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p>www.Women@GrowUp.com</p>
            <p>womengrowup@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-purple-600 flex items-center justify-center rounded-full mt-1">
            <FaPhoneAlt className="text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold">Téléphone</p>
            <p>Phone: +237 654 23 84 56</p>
            <p>Fax: +237 654 23 84 56</p>
          </div>
        </div>

        <div className="mt-40">
        <hr  className="text-black mb-5"/>

          <p className="font-medium text-center">Suivez-nous sur nos media</p>
          <div className="flex gap-7 mt-3 text-purple-600 text-xl items-center justify-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
