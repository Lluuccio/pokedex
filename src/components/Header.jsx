// src/components/Header.jsx
import React, { useState } from 'react';
import logo from "../assets/logo.png";
import Button from './Button';
import '../css/Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // si on est sur /login, on ne montre pas le header
  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    try {
      const res = logout();
      if (res && typeof res.then === "function") {
        res.then(() => navigate("/login")).catch(() => navigate("/login"));
      } else {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  };

  const displayName = user?.displayName || user?.name || user?.username || user?.email || null;

  return (
    <header>
      <nav className="maxWidth" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={logo} alt="logo" />

        <div className="search-container" style={{ maxWidth: 600 }}>
          <input
            type="text"
            placeholder="Search by name or id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/${query}`}>
            <Button Label={"Search"} />
          </Link>
        </div>

        <div style={{ flex: 1 }} />

        {user ? (
          <div className="header-user" role="region" aria-label="Utilisateur connecté">
            <div className="welcome">
              Welcome{displayName ? `, ${displayName}` : ""}
            </div>
            <button
              onClick={handleLogout}
              className="btn logout-btn"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Link to="/login">
              <button className="btn login-link">Se connecter</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
