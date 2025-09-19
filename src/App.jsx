// src/App.jsx
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SearchedPokemon from "./pages/SearchedPokemon";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      document.body.classList.add("no-header");
      document.body.classList.add("no-footer");
    } else {
      document.body.classList.remove("no-header");
      document.body.classList.remove("no-footer");
    }
  }, [location.pathname]);

  const hideFooter = location.pathname === "/login"; // ou location.pathname.startsWith("/login")

  return (
    <AuthProvider>
      <div className="App">
        <Header />
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

        {/* Footer rendu uniquement si on n'est pas sur /login */}
        {!hideFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
