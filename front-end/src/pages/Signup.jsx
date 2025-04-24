import React, { useState } from "react";
//import axios from "axios";
import apiEND from "../API/axios"; // Assurez-vous que le chemin est correct
import { HiUser, HiMail, HiLockClosed, HiLocationMarker, HiPhone, HiPhotograph, HiGlobeAlt, HiHome } from "react-icons/hi";
import womengrowup from '@/assets/images/womengrowup.png';
import solidarite from "@/assets/images/solidarite.jpg";

const Input = ({ icon: Icon, error, ...props }) => (
  <div className={`flex items-center bg-white rounded-lg shadow-sm border ${error ? 'border-red-500' : 'border-gray-200'} mb-1 px-3 py-2 focus-within:ring-2 focus-within:ring-purple-300 transition`}>
    {Icon && <Icon className={`${error ? 'text-red-500' : 'text-purple-400'} mr-2 text-xl`} />}
    <input
      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
      {...props}
    />
  </div>
);

const Signup =()=> {
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
    
    // Ligne de débogage ajoutée :
    console.log("Données envoyées:", Object.fromEntries(formData.entries()));
    //console.log("photo:", form.photo);

  

    try {
      const response = await apiEND.post('/register', formData);
      console.log("succes", response.data);
      setSuccess("Connexion réussie ! Redirection...");

      if (response.data.success) {
        setSuccess("Inscription réussie ! Redirection...");
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/Home";
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
    <div className="flex h-dvh overflow-hidden bg-gradient-to-tr from-purple-100 via-white to-white">
      {/* Colonne gauche */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-purple-400 p-4">
        <img src={womengrowup} alt="Women Grow Up" className="h-40 mb-8" />
        <h1 className="text-white text-3xl lg:text-4xl font-bold mb-8 text-center leading-snug drop-shadow-lg">
          Bienvenue dans<br />notre Communauté
        </h1>
        <img src={solidarite} alt="Solidarité" className="rounded-2xl shadow-xl w-64 h-64 lg:w-96 lg:h-96 object-cover" />
      </div>
      
      {/* Colonne droite */}
      <div className="w-full md:w-1/2 h-dvh flex flex-col justify-center items-center bg-gray-50 overflow-y-auto py-8">
        <form className="w-full max-w-md bg-gray-50 rounded-2xl px-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-gray-800 mb-6 text-center font-tienne">Créer votre compte</h2>

          {/* General error message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.general[0]}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                icon={HiUser} 
                name="prenom" 
                placeholder="Prénom" 
                value={form.prenom} 
                onChange={handleChange} 
                error={errors.prenom}
              />
              {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom[0]}</p>}
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
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom[0]}</p>}
            </div>
          </div>

          <div className="mt-2">
            <Input 
              icon={HiHome} 
              name="age" 
              placeholder="Âge" 
              type="number" 
              value={form.age} 
              onChange={handleChange} 
              error={errors.age}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age[0]}</p>}
          </div>

          <div className="mt-2">
            <Input 
              icon={HiLocationMarker} 
              name="adresse" 
              placeholder="Adresse" 
              value={form.adresse} 
              onChange={handleChange} 
              error={errors.adresse}
            />
            {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse[0]}</p>}
          </div>

          <div className="mt-2">
            <Input 
              icon={HiPhone} 
              name="telephone" 
              placeholder="Téléphone" 
              value={form.telephone} 
              onChange={handleChange} 
              error={errors.telephone}
            />
            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone[0]}</p>}
          </div>

          <div className="mt-2">
            <Input 
              icon={HiMail} 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              error={errors.email}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Input 
                icon={HiGlobeAlt} 
                name="ville" 
                placeholder="Ville" 
                value={form.ville} 
                onChange={handleChange} 
                error={errors.ville}
              />
              {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville[0]}</p>}
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
              {errors.pays && <p className="text-red-500 text-sm mt-1">{errors.pays[0]}</p>}
            </div>
          </div>

          <div className="mt-2">
            <Input 
              icon={HiLockClosed} 
              name="password" 
              type="password" 
              placeholder="Mot de passe" 
              value={form.password} 
              onChange={handleChange} 
              error={errors.password}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          <div className="mt-2">
            <Input 
              icon={HiLockClosed} 
              name="password_confirmation" 
              type="password" 
              placeholder="Confirmer le mot de passe" 
              value={form.password_confirmation} 
              onChange={handleChange} 
              error={errors.password_confirmation}
            />
            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>}
          </div>

          <div className="mt-2">
            <div className={`flex items-center bg-white rounded-lg shadow-sm border ${errors.photo ? 'border-red-500' : 'border-gray-200'} mb-1 px-3 py-2`}>
              <HiPhotograph className={`${errors.photo ? 'text-red-500' : 'text-purple-400'} mr-2 text-xl`} />
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                className="w-full text-gray-400" 
                onChange={handleChange} 
              />
            </div>
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo[0]}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3 mt-6 rounded-lg bg-purple-500 hover:bg-purple-800 text-white font-bold text-lg transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>

          <div className="mt-6 text-center text-gray-500">
            Déjà un compte ? <a href="/Login" className="text-purple-600 hover:underline font-semibold">connectez-vous</a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup ;