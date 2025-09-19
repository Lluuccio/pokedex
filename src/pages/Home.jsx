// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Feed from '../components/Feed';
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(() => {
    const stored = sessionStorage.getItem("offset");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [loading, setLoading] = useState(true);

  function handleNextPage() {
    const newOffset = offset + 50;
    setOffset(newOffset);
    sessionStorage.setItem("offset", newOffset.toString());
  }

  function handlePreviousPage() {
    const newOffset = offset <= 50 ? 0 : offset - 50;
    setOffset(newOffset);
    sessionStorage.setItem("offset", newOffset.toString());
  }

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPokemons(data.results || []);
      } catch (err) {
        console.error("Error fetching pokemons:", err);
        setPokemons([]);
      } finally {
        // court délai pour la transition, tu peux ajuster/supprimer
        setTimeout(() => setLoading(false), 300);
      }
    }
    fetchPokemon();
  }, [offset]);

  return (
    <div className="Home maxWidth">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Feed pokemons={pokemons} />
          <div className="pagination" style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
            <button onClick={handlePreviousPage} className="btn">Previous</button>
            <button onClick={handleNextPage} className="btn">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
