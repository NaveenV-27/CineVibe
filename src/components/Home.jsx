import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );

        const data = await res.json();
        setMovies(data.results || []);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">
        Trending Movies <span role="img" aria-label="fire">🔥</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Discover what everyone is watching today
      </p>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;