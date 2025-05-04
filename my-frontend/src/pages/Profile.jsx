import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, X } from "lucide-react";
import apiEND from '/src/API/axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const navigate = useNavigate();

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
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-fuchsia-100">Chargement...</div>;
  }

  const handleDelete = async () => {
    try {
      await apiEND.delete(`/users/${user.id}`);
      localStorage.removeItem('authToken');
      setShowDeleteModal(false);
      setShowSuccessDelete(true);
      setTimeout(() => navigate("/signup"), 3000);
    } catch (error) {
      console.error("Erreur suppression ❌", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
      delete dataToSend.photo;
      delete dataToSend.password;
      await apiEND.put(`/users/${user.id}`, dataToSend);
      setShowEditModal(false);
      const updatedUser = await apiEND.get("/me");
      setUser(updatedUser.data);
      setShowSuccessUpdate(true);
    } catch (error) {
      console.error("Erreur update ❌", error.response?.data ?? error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-pink-100 flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-300 opacity-30 rounded-full -top-10 -left-20 blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-300 opacity-30 rounded-full bottom-0 -right-20 blur-3xl animate-pulse" />
      </div>

     
     

      {/* Profil */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md z-10">
        <div className="flex flex-col items-center ">
          <img
            src={user.photo ? `http://localhost:8000/storage/${user.photo}` : "/src/assets/images/femme2.jpg"}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-6 border-4 border-fuchsia-500 object-cover shadow-md"
          />
          <h2 className="text-3xl font-extrabold text-violet-700 mb-2">
            {user.prenom} {user.nom}
          </h2>
          <p className="text-gray-500 mb-4">{user.email}</p>

          <div className="text-pink-600 space-y-1 text-sm">
            {user.telephone && <p>📞 {user.telephone}</p>}
            {user.age && <p>🎂 {user.age} ans</p>}
            {user.ville && user.pays && <p>📍 {user.ville}, {user.pays}</p>}
            {user.adresse && <p>🏠 {user.adresse}</p>}
          </div>

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

      {/* Modals et Popups */}
      {showEditModal && (
        <Modal title="Modifier Profil" onClose={() => setShowEditModal(false)}>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
            {["prenom", "nom", "email", "telephone", "age", "ville", "pays", "adresse"].map(field => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "age" ? "number" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input"
              />
            ))}
            <button type="submit" className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-3 rounded-full transition-all">Enregistrer</button>
          </form>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="Supprimer Compte" onClose={() => setShowDeleteModal(false)}>
          <p className="text-gray-600 mb-6">Es-tu sûr de vouloir supprimer ton compte ? 😢</p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleDelete} className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full">Oui</button>
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-full">Non</button>
          </div>
        </Modal>
      )}

      {showSuccessUpdate && (
        <Popup title="Profil modifié !" message="Vos informations ont été mises à jour avec succès." onClose={() => setShowSuccessUpdate(false)} />
      )}

      {showSuccessDelete && (
        <Popup title="Compte supprimé !" message="Votre compte a été supprimé avec succès." onClose={() => navigate("/signup")} />
      )}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-rose-500">
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Popup({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-indigo-50 p-8 rounded-3xl shadow-lg text-center space-y-4 w-80 animate-fade-in">
        <h2 className="text-2xl font-bold text-violet-700">{title}</h2>
        <p className="text-fuchsia-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md"
        >
          OK
        </button>
      </div>
    </div>
  );
}
