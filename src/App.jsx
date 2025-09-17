// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchedPokemon from "./pages/SearchedPokemon";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
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
