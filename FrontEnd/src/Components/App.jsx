import LandingPage from "./LandingPage"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import Dashboard from "./Dashboard";
import {Routes, Route, useNavigate } from "react-router-dom"
import "../Styles/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


function App() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/dashboard',{replace: true});
      }
    }, [isAuthenticated, navigate]);

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
