import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "./pages/loginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const [isLoggedIn, setIsLoggedIn] = useState(token !== null && token !== "undefined");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginScreen setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;