import LandingPage from "./LandingPage"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import Dashboard from "./Dashboard";
import React, { useState, createContext, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import "./App.css";

export const UserType = createContext();

function App() {
    const [isLoggedIn, setValue] = useState(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem("isLoggedIn");
        return value !== null ? JSON.parse(value) : false;
    });
    const navigate = useNavigate()

    function handleValueChange(newValue) {
        setValue(newValue);
        localStorage.setItem("isLoggedIn", JSON.stringify(newValue));
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn]);
    
    return (
        <UserType.Provider value={{ isLoggedIn, handleValueChange }}>
            <Routes key={isLoggedIn}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </UserType.Provider>
    );
}

export default App;
