import { LogOut, Home, Info, BookOpen, GraduationCap, Users, MessageSquare, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import apiEND from '/src/API/axios'; // ton axios configuré

const links = [
  { name: 'Accueil', icon: Home, path: '/' },
  { name: 'Profil', icon: User, path: '/profile' },
  { name: 'À propos', icon: Info, path: '/about' },
  { name: 'Blog', icon: BookOpen, path: '/blog' },
  { name: 'Digithek', icon: GraduationCap, path: '/digithek' },
  { name: 'Cours', icon: Users, path: '/courses' },
  { name: 'Forum', icon: MessageSquare, path: '/forum' },
  { name: 'Contact', icon: Mail, path: '/contact' },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Version mobile (motion) */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:hidden top-0 left-0 h-full w-64 bg-indigo-50 dark:bg-gray-100 p-6 flex flex-col justify-between z-50 shadow-lg"
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>

      {/* Version desktop (toujours visible, sans animation) */}
      <aside className="hidden md:flex md:flex-col md:justify-between md:w-64 md:h-screen md:bg-indigo-50 md:dark:bg-gray-100 md:p-6 md:shadow-lg">
        <SidebarContent onClose={() => {}} />
      </aside>
    </>
  );
}

function SidebarContent({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé pour la déconnexion');
      return;
    }
  
    try {
      const response = await apiEND.post('/logout');
      console.log('Déconnexion réussie', response.data);
      localStorage.removeItem('authToken');
      navigate('/login'); // Rediriger vers la page de login
    } catch (error) {
      console.error('Erreur lors de la déconnexion ❌', error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-2xl font-bold text-indigo-600 mb-10">Women Grow Up</h1>
        <nav className="space-y-4">
          {links.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className="flex items-center gap-4 p-2 rounded-lg text-gray-700  hover:bg-fuchsia-700  transition"
              onClick={onClose}
            >
              <Icon size={20} className="text-fuchsia-500" />
              <span className="font-semibold">{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg bg-fuchsia-500 text-white hover:bg-fuchsia-600 transition"
      >
        <LogOut size={20} />
        Déconnexion
      </button>
    </div>
  );
}

export default Sidebar;
