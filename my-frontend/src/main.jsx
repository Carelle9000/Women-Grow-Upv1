//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { BrowserRouter } from "react-router-dom";
//import ReactDOM from "react-dom/client";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap ici */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
