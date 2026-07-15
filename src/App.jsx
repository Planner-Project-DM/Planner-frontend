// import { useState } from 'react';
import {useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "./pages/loginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
    useEffect(() => {
        const savedToken = localStorage.getItem('userToken');
        if (savedToken) {
            // {'In Progress...'}
        }
    }, []);
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
          </Routes>
      </BrowserRouter>
  );
}
export default App
