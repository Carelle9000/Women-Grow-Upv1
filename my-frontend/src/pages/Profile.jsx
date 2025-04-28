import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, X } from "lucide-react";
import apiEND from '/src/API/axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      async function fetchUser() {
        try {
          const response = await apiEND.get("/me");
          setUser(response.data);
          setFormData(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil :", error);
        }
      }
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-indigo-50">Chargement...</div>;
  }

  const handleDelete = async () => {
    try {
      await apiEND.delete(`/users/${user.id}`);
      localStorage.removeItem('authToken');
      navigate('/signup'); // Rediriger vers la page d'inscription ou de connexion
      setShowConfirmDelete(false);

      setShowSuccessDelete(true); // <-- Montre le pop-up ✅
      console.log("Suppression réussie, pop-up affiché");

      // Optionnel : Rediriger après quelques secondes
      setTimeout(() => {
        navigate("/signup"); // ou /login selon ton besoin
      }, 3000);
    } catch (error) {
      console.error("Erreur suppression ❌", error);
    }
  };
  
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
  
      // Retirer les champs inutiles
      delete dataToSend.photo; // Photo sera gérée à part
      delete dataToSend.password; // Password à part aussi sauf si changement
  
      // Envoie uniquement ce que Laravel attend
      await apiEND.put(`/users/${user.id}`, dataToSend);
      
      setShowEditModal(false);
      const updatedUser = await apiEND.get("/me");
      setUser(updatedUser.data);

      setShowSuccessUpdate(true); // <-- Montre le pop-up ✅

    } catch (error) {
      console.error("Erreur update ❌", error.response?.data ?? error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
   

    <div className="flex flex-col items-center justify-center p-10 bg-indigo-50 min-h-screen relative">

      {/* Flèche retour */}
      <button 
        onClick={() => navigate("/dashboard")} 
        className="absolute top-6 left-6 p-3 rounded-full bg-fuchsia-500 text-white hover:bg-fuchsia-600 transition-all shadow-lg"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.photo ? `http://localhost:8000/storage/${user.photo}` : "/src/assets/images/femme2.jpg"}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-6 border-4 border-fuchsia-500 object-cover shadow-md"
          />
          <h2 className="text-3xl font-extrabold text-violet-700 mb-2">
            {user.prenom} {user.nom}
          </h2>
          <p className="text-gray-500 mb-4">{user.email}</p>

          {/* Infos */}
          <div className="text-pink-600 space-y-1 text-sm">
            {user.telephone && <p>📞 {user.telephone}</p>}
            {user.age && <p>🎂 {user.age} ans</p>}
            {user.ville && user.pays && <p>📍 {user.ville}, {user.pays}</p>}
            {user.adresse && <p>🏠 {user.adresse}</p>}
          </div>

          {/* Boutons */}
          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-5 py-2 rounded-full transition-all shadow-md"
            >
              <Edit size={18} /> Modifier
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full transition-all shadow-md"
            >
              <Trash2 size={18} /> Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* MODAL MODIFIER */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-rose-500">
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">Modifier Profil</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
              <input type="text" name="prenom" value={formData.prenom || ""} onChange={handleChange} placeholder="Prénom" className="input" />
              <input type="text" name="nom" value={formData.nom || ""} onChange={handleChange} placeholder="Nom" className="input" />
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="input" />
              <input type="text" name="telephone" value={formData.telephone || ""} onChange={handleChange} placeholder="Téléphone" className="input" />
              <input type="number" name="age" value={formData.age || ""} onChange={handleChange} placeholder="Age" className="input" />
              <input type="text" name="ville" value={formData.ville || ""} onChange={handleChange} placeholder="Ville" className="input" />
              <input type="text" name="pays" value={formData.pays || ""} onChange={handleChange} placeholder="Pays" className="input" />
              <input type="text" name="adresse" value={formData.adresse || ""} onChange={handleChange} placeholder="Adresse" className="input" />

              <button type="submit" className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-3 rounded-full transition-all">Enregistrer</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SUPPRIMER */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center relative shadow-2xl">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-rose-500">
              <X size={28} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-rose-600">Supprimer Compte</h2>
            <p className="text-gray-600 mb-6">Es-tu sûr de vouloir supprimer ton compte ? 😢</p>
            <div className="flex gap-4 justify-center">
              <button onClick={handleDelete} className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full">Oui</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-full">Non</button>
            </div>
          </div>
        </div>
      )}

       {/* ✅ Pop-up succès modification */}
{showSuccessUpdate && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-indigo-50 p-8 rounded-3xl shadow-lg text-center space-y-4 w-80 animate-bounce-in">
      <h2 className="text-2xl font-bold text-violet-700">Profil modifié !</h2>
      <p className="text-fuchsia-600">Vos informations ont été mises à jour avec succès.</p>
      <button
        onClick={() => setShowSuccessUpdate(false)}
        className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md"
      >
        OK
      </button>
    </div>
  </div>
)}

{/* ✅ Pop-up succès suppression */}
{showSuccessDelete && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-indigo-50 p-8 rounded-3xl shadow-lg text-center space-y-4 w-80 animate-bounce-in">
      <h2 className="text-2xl font-bold text-violet-700">Compte supprimé !</h2>
      <p className="text-fuchsia-600">Votre compte a été supprimé avec succès.</p>
      <button
        onClick={() => {
          setShowSuccessDelete(false);
          navigate("/signup"); // ou /home ou /login
        }}
        className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md"
      >
        Retour
      </button>
    </div>
  </div>
)}
    </div>
  );
}
