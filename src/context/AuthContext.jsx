// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // read initial user from sessionStorage to persist across refresh
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    // Exemple simple : change ça pour appeler ton API
    if (username === "admin" && password === "1234") {
      const u = { username };
      setUser(u);
      sessionStorage.setItem("user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
