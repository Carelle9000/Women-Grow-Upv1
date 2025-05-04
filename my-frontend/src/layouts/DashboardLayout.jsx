import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, User, Users, Calendar, LogOut, Menu, X, FileText } from 'lucide-react';

function NavItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center px-4 py-2 mt-2 text-white rounded-md ${
        active ? 'bg-fuchsia-700 text-white' : 'text-white text-opacity-80 hover:bg-fuchsia-600'
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </div>
  );
}

function SidebarContent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <nav className="mt-5 px-2">
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <NavItem
            icon={<Home size={20} />}
            text="Accueil"
            active={isActive}
          />
        )}
      </NavLink>
      <NavLink to="/profile">
        {({ isActive }) => (
          <NavItem
            icon={<User size={20} />}
            text="Profil"
            active={isActive}
          />
        )}
      </NavLink>
      <NavLink to="/memberspage">
        {({ isActive }) => (
          <NavItem
            icon={<Users size={20} />}
            text="Membres"
            active={isActive}
          />
        )}
      </NavLink>
      <NavLink to="/calendar">
        {({ isActive }) => (
          <NavItem
            icon={<Calendar size={20} />}
            text="Calendrier"
            active={isActive}
          />
        )}
      </NavLink>
      <NavLink to="/reports">
        {({ isActive }) => (
          <NavItem
            icon={<FileText size={20} />}
            text="Rapports"
            active={isActive}
          />
        )}
      </NavLink>
      <div className="mt-10 px-3">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full bg-red-600 bg-opacity-10 text-white py-2 px-4 rounded-md hover:bg-red-700 hover:bg-opacity-20 transition-all"
        >
          <LogOut size={18} className="mr-2" />
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-indigo-50 font-['Tienne']">
      {/* Sidebar - Mobile version */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-fuchsia-800 text-white transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-5 border-b border-fuchsia-700">
          <div className="font-bold text-xl">Women Grow Up</div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Sidebar - Desktop version */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-fuchsia-800 md:text-white">
        <div className="px-4 py-5 border-b border-fuchsia-700">
          <div className="font-bold text-xl">Women Grow Up</div>
        </div>
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Toggle */}
        <header className="md:hidden bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div className="font-bold text-xl text-gray-800">Women Grow Up</div>
            <div className="w-10 h-10"></div> {/* Placeholder for profile alignment */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;