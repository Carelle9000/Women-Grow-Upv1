import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Digithek from "../pages/Digithek";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Forum from "../pages/Forum";
import Report from "../pages/Report";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/about" element={<About />} />
          <Route path="/digithek" element={<Digithek />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/report" element={<Report />} />*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
