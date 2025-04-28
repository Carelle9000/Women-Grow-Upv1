import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiEND from "../API/axios";

const backgroundUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

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
        // Après la connexion réussie
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
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-black/10">
        <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">Connectez-vous</h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {errors.general[0]}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full h-12 px-4 bg-gray-200 rounded-lg outline-none border ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className={`w-full h-12 px-4 bg-gray-200 rounded-lg outline-none border ${
                errors.password ? "border-red-500" : "border-transparent"
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 bg-purple-600 hover:bg-purple-800 text-white text-lg font-semibold rounded-lg shadow transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Connexion en cours..." : "Connexion"}
          </button>

          <div className="mt-4 text-center text-gray-500 text-sm">
            Pas encore inscrit ? <a href="/Signup" className="text-purple-600 hover:underline">Créer un compte</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
