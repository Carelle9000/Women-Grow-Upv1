import { useState, useEffect } from "react";
import apiEND from "/src/API/axios";
import { useNavigate } from "react-router-dom";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiEND.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Erreur récupération profil", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return { user, loading, error };
}
