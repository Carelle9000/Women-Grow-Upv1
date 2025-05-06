import React, { createContext, useState, useEffect } from 'react';
     import axios from 'axios';

     export const AuthContext = createContext();

     export const AuthProvider = ({ children }) => {
         const [user, setUser] = useState(null);
         const [token, setToken] = useState(localStorage.getItem('token') || '');

         useEffect(() => {
             if (token) {
                 axios.get('/api/user', {
                     headers: { Authorization: `Bearer ${token}` },
                 }).then(response => {
                     setUser(response.data);
                 }).catch(() => {
                     setToken('');
                     localStorage.removeItem('token');
                 });
             }
         }, [token]);

         const login = async (email, password) => {
             const response = await axios.post('/api/login', { email, password });
             setUser(response.data.user);
             setToken(response.data.token);
             localStorage.setItem('token', response.data.token);
         };

         const logout = async () => {
             await axios.post('/api/logout', {}, {
                 headers: { Authorization: `Bearer ${token}` },
             });
             setUser(null);
             setToken('');
             localStorage.removeItem('token');
         };

         return (
             <AuthContext.Provider value={{ user, token, login, logout }}>
                 {children}
             </AuthContext.Provider>
         );
     };
