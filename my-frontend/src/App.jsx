import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import { Routes, Route } from 'react-router-dom'; // pas besoin de BrowserRouter ici
import MainLayout from "./layouts/MainLayout";
import Blog from "./pages/Blog";
import PrivateRoute from './PrivateRoute';
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Report from "./pages/Report";




const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
         {/* Route protégée pour le dashboard */}
         <Route element={<PrivateRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
        </Route>       
        <Route path="/signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        {/* 404 Not Found route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </MainLayout>
  );
};

export default App;
