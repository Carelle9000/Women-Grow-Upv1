import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Forum from './pages/Forum';
import Digithek from './pages/Digithek';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Report from './pages/Report';
import MembersPage from './Components/SectionForum/MembersPage';
import NotFound from './pages/NotFound';
import PrivateRoute from './PrivateRoute';
import  Calendar  from './pages/TaskCalendar';
import ReportGeneratorPage from './pages/ReportGeneratorPage';
import PrivacyPolicy from './Components/PrivacyPolicy';
import Article1 from './Components/Article1';
import Article2 from './Components/Article2';
import Article3 from './Components/Article3';

import ArticleB1 from './Components/SectionBlog/ArticleB1';
import ArticleB2 from './Components/SectionBlog/ArticleB2';
import ArticleB3 from './Components/SectionBlog/ArticleB3';
import ArticleB4 from './Components/SectionBlog/ArticleB4';
import ArticleB5 from './Components/SectionBlog/ArticleB5';
import ArticleB6 from './Components/SectionBlog/ArticleB6';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/digithek" element={<Digithek />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Article1" element={<Article1 />} />
        <Route path="/Article2" element={<Article2 />} />
        <Route path="/Article3" element={<Article3 />} />
        <Route path="/ArticleB1" element={<ArticleB1 />} />
        <Route path="/ArticleB2" element={<ArticleB2 />} />
        <Route path="/ArticleB3" element={<ArticleB3 />} />
        <Route path="/ArticleB4" element={<ArticleB4 />} />
        <Route path="/ArticleB5" element={<ArticleB5 />} />
        <Route path="/ArticleB6" element={<ArticleB6 />} />
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/memberspage" element={<MembersPage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reports" element={<ReportGeneratorPage />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;