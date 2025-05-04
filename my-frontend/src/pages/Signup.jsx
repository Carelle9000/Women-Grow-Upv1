import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiEND from "../API/axios";
import { HiUser, HiMail, HiLockClosed, HiLocationMarker, HiPhone, HiPhotograph, HiGlobeAlt, HiHome, HiChevronLeft } from "react-icons/hi";
import womengrowup from '@/assets/images/womengrowup.png';
import solidarite from "@/assets/images/solidarite.jpg";

const Input = ({ icon: Icon, error, ...props }) => (
  <div className={`relative flex items-center mb-3`}>
    <div className="absolute left-3 text-gray-400">
      {Icon && <Icon className={`${error ? 'text-red-500' : 'text-gray-400'} text-lg`} />}
    </div>
    <input
      className={`w-full py-3 pl-10 pr-3 rounded-full bg-gray-100 border ${
        error ? "border-red-500" : "border-gray-200"
      } text-sm focus:outline-none focus:ring-2 focus:ring-purple-400`}
      {...props}
    />
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prenom: "", nom: "", age: "", adresse: "", telephone: "",
    email: "", ville: "", password: "", password_confirmation: "",
    pays: "", photo: null
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess("");

    // Client-side validation
    if (form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: ["Les mots de passe ne correspondent pas."] });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    console.log("Données envoyées:", Object.fromEntries(formData.entries()));

    try {
      const response = await apiEND.post('/register', formData);
      console.log("succes", response.data);
      setSuccess("Inscription réussie ! Redirection...");

      if (response.data.success) {
        setSuccess("Inscription réussie ! Redirection...");
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          // Laravel validation errors
          setErrors(error.response.data.errors || {});
          console.log("Erreur détaillée :", error.response.data);
        } else {
          setErrors({ general: [error.response.data.message || "Une erreur est survenue"] });
        }
      } else {
        setErrors({ general: ["Erreur de connexion au serveur"] });
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
      
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
        {/* Partie gauche avec image et texte de bienvenue */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 p-10 text-white flex-col justify-center items-center relative overflow-hidden">
          <img src={womengrowup} alt="Women Grow Up" className="h-32 mb-6" />
          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center leading-snug drop-shadow-lg">
            Bienvenue dans<br />notre Communauté
          </h1>
          <div className="rounded-2xl shadow-xl overflow-hidden w-48 h-48 lg:w-64 lg:h-64">
            <img src={solidarite} alt="Solidarité" className="w-full h-full object-cover" />
          </div>
          
          {/* Formes décoratives */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/30 rounded-full rotate-12"></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-pink-400/30 rounded-full -rotate-12"></div>
          <div className="absolute bottom-20 right-5 w-28 h-10 bg-indigo-300/40 rounded-full rotate-45"></div>
        </div>
        
        {/* Partie droite avec formulaire */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-start overflow-y-auto max-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <Link to="/Login">
              <button type="button" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-purple-500 focus:outline-none">
                <HiChevronLeft size={20} />
              </button>
            </Link>
            <h2 className="text-xl font-semibold text-center text-gray-700">Créer votre compte</h2>
            <div className="w-8"></div> {/* Pour équilibrer le header */}
          </div>
          
          {/* General error message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
              {errors.general[0]}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div>
                <Input 
                  icon={HiUser} 
                  name="prenom" 
                  placeholder="Prénom" 
                  value={form.prenom} 
                  onChange={handleChange} 
                  error={errors.prenom}
                />
                {errors.prenom && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.prenom[0]}</p>}
              </div>

              <div>
                <Input 
                  icon={HiUser} 
                  name="nom" 
                  placeholder="Nom" 
                  value={form.nom} 
                  onChange={handleChange} 
                  error={errors.nom}
                />
                {errors.nom && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.nom[0]}</p>}
              </div>
            </div>

            <Input 
              icon={HiHome} 
              name="age" 
              placeholder="Âge" 
              type="number" 
              value={form.age} 
              onChange={handleChange} 
              error={errors.age}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.age[0]}</p>}

            <Input 
              icon={HiLocationMarker} 
              name="adresse" 
              placeholder="Adresse" 
              value={form.adresse} 
              onChange={handleChange} 
              error={errors.adresse}
            />
            {errors.adresse && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.adresse[0]}</p>}

            <Input 
              icon={HiPhone} 
              name="telephone" 
              placeholder="Téléphone" 
              value={form.telephone} 
              onChange={handleChange} 
              error={errors.telephone}
            />
            {errors.telephone && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.telephone[0]}</p>}

            <Input 
              icon={HiMail} 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              error={errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.email[0]}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div>
                <Input 
                  icon={HiGlobeAlt} 
                  name="ville" 
                  placeholder="Ville" 
                  value={form.ville} 
                  onChange={handleChange} 
                  error={errors.ville}
                />
                {errors.ville && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.ville[0]}</p>}
              </div>

              <div>
                <Input 
                  icon={HiGlobeAlt} 
                  name="pays" 
                  placeholder="Pays" 
                  value={form.pays} 
                  onChange={handleChange} 
                  error={errors.pays}
                />
                {errors.pays && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.pays[0]}</p>}
              </div>
            </div>

            <Input 
              icon={HiLockClosed} 
              name="password" 
              type="password" 
              placeholder="Mot de passe" 
              value={form.password} 
              onChange={handleChange} 
              error={errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.password[0]}</p>}

            <Input 
              icon={HiLockClosed} 
              name="password_confirmation" 
              type="password" 
              placeholder="Confirmer le mot de passe" 
              value={form.password_confirmation} 
              onChange={handleChange} 
              error={errors.password_confirmation}
            />
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.password_confirmation[0]}</p>}

            <div className="relative flex items-center mb-3">
              <div className="absolute left-3 text-gray-400">
                <HiPhotograph className={`${errors.photo ? 'text-red-500' : 'text-gray-400'} text-lg`} />
              </div>
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                className="w-full py-3 pl-10 pr-3 rounded-full bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
              />
            </div>
            {errors.photo && <p className="text-red-500 text-xs mt-1 ml-3 mb-2">{errors.photo[0]}</p>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-3 mt-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm 
                shadow hover:shadow-lg transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>

            <div className="mt-6 text-center text-gray-500 text-sm">
              Déjà un compte ? <Link to="/Login" className="text-purple-500 hover:underline">Se connecter</Link>
            </div>
          </form>
        </div>
      </div>
      
      
    </div>
  );
};

export default Signup;