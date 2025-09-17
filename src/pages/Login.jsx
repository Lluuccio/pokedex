// src/pages/Login.jsx
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const ok = login(username.trim(), password);
    if (ok) {
      navigate("/");
    } else {
      setError("Identifiants invalides — vérifie ton nom d'utilisateur ou mot de passe.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />
        <h2 className="login-title">Se connecter</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">
            Nom d'utilisateur
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
            />
          </label>

          <label className="label">
            Mot de passe
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          <button className="login-btn" type="submit" aria-label="Se connecter">
            Connexion
          </button>

          {error && <div className="login-error" role="alert">{error}</div>}
        </form>

        <p className="login-hint">Compte de test : <strong>admin</strong> / <strong>1234</strong></p>
      </div>
    </div>
  );
};

export default Login;
