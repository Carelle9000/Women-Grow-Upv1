import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./Components/Header";
import { Routes, Route } from 'react-router-dom'; // pas besoin de BrowserRouter ici
import MainLayout from "./layouts/MainLayout";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
