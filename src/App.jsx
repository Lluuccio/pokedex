// src/App.jsx
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SearchedPokemon from "./pages/SearchedPokemon";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

const App = () => {
  const location = useLocation();

  // Toggle a class on body so we can remove header padding on /login
  useEffect(() => {
    if (location.pathname === "/login") {
      document.body.classList.add("no-header");
    } else {
      document.body.classList.remove("no-header");
    }
    // cleanup not necessary but left implicit
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className="App">
        <Header /> {/* rendu une seule fois pour toute l'app */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/:pokemon"
            element={
              <PrivateRoute>
                <SearchedPokemon />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
