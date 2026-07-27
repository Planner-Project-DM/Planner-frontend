import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "./pages/loginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function isTokenValid() {
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    if (!token || token === "undefined") return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()){
            return true;
        } else {
            localStorage.clear();
            sessionStorage.clear();
            return false;
        }
    } catch {
        return false;
    }
}


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid);
    const [isDark, setIsDark] = useState(false);

    function darkMode() {
        const newMode = !isDark;
        setIsDark(newMode);
        document.body.classList.toggle('dark');
        localStorage.setItem('isDark', newMode);
    }
    useEffect(() => {
        const savedMode = localStorage.getItem('isDark');

        if (savedMode === 'true') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDark(true);
            document.body.classList.add('dark');
        }
    }, []);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} isDark={isDark}/> : <Navigate to="/login" />} />
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginScreen setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterScreen />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;