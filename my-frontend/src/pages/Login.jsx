import React, { useState } from "react";
import {  Link } from "react-router-dom";
import momo from "@/assets/images/momo.png";
import { useNavigate } from "react-router-dom";
import apiEND from "../API/axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess("");

    try {
      const response = await apiEND.post("/login", form);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setSuccess("Connexion réussie ! Redirection...");
      localStorage.setItem('authToken', response.data.token);
      console.log("Token stocké dans localStorage : ", localStorage.getItem('authToken'));

      setTimeout(() => {
        navigate("/Dashboard");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ general: ["Email ou mot de passe incorrect."] });
      } else if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: ["Une erreur est survenue."] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 w-32 h-64 bg-pink-400/30 rounded-full rotate-12 blur-md"></div>
        <div className="absolute right-1/4 bottom-1/3 w-64 h-32 bg-orange-400/30 rounded-full -rotate-12 blur-md"></div>
        <div className="absolute left-1/3 bottom-1/4 w-40 h-40 bg-indigo-400/30 rounded-full rotate-45 blur-md"></div>
      </div>
      
      <div className="flex w-full max-w-4xl h-96 bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
        {/* Partie gauche avec texte de bienvenue */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-500 via-purple-400 to-indigo-400 p-10 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Logo */}
            <Link to="/" >
              <img src={momo} alt="Logo" className="h-[50px] md:h-[60px] p-1" />
            </Link>
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre Communaute</h1>
          <p className="text-sm opacity-80">
            Decouvrez un espace virtuel ou vous pourrez conversez et vous informez sur les sujets qui nous sont essentiels.
          </p>
          
          {/* Formes décoratives */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/30 rounded-full rotate-12"></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-pink-400/30 rounded-full -rotate-12"></div>
          <div className="absolute bottom-20 right-5 w-28 h-10 bg-indigo-300/40 rounded-full rotate-45"></div>
        </div>
        
        {/* Partie droite avec formulaire */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">Connectez-vous</h2>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
              {errors.general[0]}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-lg text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-3 rounded-full bg-gray-100 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } text-sm focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-3">{errors.email[0]}</p>}
            </div>

            <div className="mb-6">
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-3 rounded-full bg-gray-100 border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } text-sm focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  required
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-3">{errors.password[0]}</p>}
            </div>
            
            <div className="flex justify-between items-center mb-6 text-xs text-gray-500">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2 h-4 w-4 text-purple-500" />
                <label htmlFor="remember">Se Souvenir de moi</label>
              </div>
              <a href="#" className="text-purple-500 hover:underline">Mot de passe oublie?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm 
                shadow hover:shadow-lg transition-all duration-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Connexion en cours..." : "Connexion"}
            </button>

            <div className="mt-6 text-center text-gray-500 text-sm">
              Pas encore inscrit ? <a href="/Signup" className="text-purple-500 hover:underline">Créer un compte</a>
            </div>
          </form>
        </div>
      </div>
      
      
    </div>
  );
};

export default Login;