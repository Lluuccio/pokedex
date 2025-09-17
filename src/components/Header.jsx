// src/components/Header.jsx
import React, { useState } from 'react';
import logo from "../assets/logo.png";
import Button from './Button';
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="maxWidth" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={logo} alt="logo" />

        <div className="search-container">
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

        {/* Si l'utilisateur est connecté, on affiche le bouton logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="btn logout-btn"
            style={{ marginLeft: "auto" }}
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
