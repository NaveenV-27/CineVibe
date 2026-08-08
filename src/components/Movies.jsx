import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      let url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const delay = setTimeout(() => {
    fetchMovies();
  }, 500);

  return () => clearTimeout(delay);
}, [category, query]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>

      {/* Controls */}
      <div className="bg-slate-800 p-5 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

      {/* Search */}
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-700 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="popular">🔥 Popular</option>
        <option value="now_playing">🎬 Now Playing</option>
        <option value="top_rated">⭐ Top Rated</option>
      </select>

      {/* Search Button */}
      <button
        onClick={fetchMovies}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition shadow-md"
      >
        Search
      </button>

    </div>

      {/* States */}
      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;