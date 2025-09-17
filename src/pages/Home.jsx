// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Header from '../components/Header';
import Feed from '../components/Feed';
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [offSet, setsetOffSet] = useState(() => {
    const storedOffSet = sessionStorage.getItem("offset");
    return storedOffSet ? parseInt(storedOffSet, 10) : 0;
  });
  const [loading, setLoading] = useState(true);

  function handleNextPage() {
    const newOffSet = offSet + 50;
    setsetOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString());
  }

  function handlePreviousPage() {
    const newOffSet = offSet <= 50 ? 0 : offSet - 50;
    setsetOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString());
  }

  useEffect(() => {
    async function fetchPokemon() {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      setPokemons(data.results || []);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    fetchPokemon();
  }, [offSet]);

  useEffect(() => {
    setLoading(true);
  }, [offSet]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="Home maxWidth">
      {loading && <LoadingScreen />}
      {!loading &&
        <>
          {/* Header + logout */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Header />
            <div style={{ marginLeft: "auto", marginRight: 0 }}>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </div>
          </div>

          <Feed pokemons={pokemons} />
          <div className="pagination">
            <button onClick={handlePreviousPage} className="btn">
              Previous
            </button>
            <button onClick={handleNextPage} className="btn">
              Next
            </button>
          </div>
        </>}
    </div>
  );
};

export default Home;
