import { useEffect, useState } from "react";
import { Search, ChevronDown, Loader2, Sparkles, AlertTriangle, Flame, PlayCircle, Star } from "lucide-react";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const categories = [
    { id: "popular", label: "Popular", icon: Flame },
    { id: "now_playing", label: "Now Playing", icon: PlayCircle },
    { id: "top_rated", label: "Top Rated", icon: Star },
  ];

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
      setError("Failed to load movie database");
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
    <div className="min-h-screen bg-[#06070B] text-slate-100 p-4 sm:p-8 bg-cyber-grid selection:bg-[#00F0FF] selection:text-black">
      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider font-orbitron bg-gradient-to-r from-white via-slate-200 to-[#00F0FF] bg-clip-text text-transparent">
            Discover Transmission Grid
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            Search or filter target film signals across TMDB categories.
          </p>
        </div>

        {/* Controls HUD Box */}
        <div className="bg-[#0F121C]/80 backdrop-blur-md border border-[#00F0FF]/30 p-4 sm:p-6 rounded-2xl glow-cyan flex flex-col lg:flex-row gap-4 items-center justify-between">

          {/* Search Input */}
          <div className="relative w-full lg:w-5/12">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search movie title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#141824] text-slate-100 placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] font-medium transition text-sm"
            />
          </div>

          {/* Controls Right Group */}
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 items-center">
            
            {/* Desktop / Tablet Segmented Pill Controls */}
            <div className="hidden sm:flex items-center bg-[#141824] p-1.5 rounded-xl border border-slate-700/80 gap-1 w-full sm:w-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = category === cat.id && !query;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setQuery("");
                      setCategory(cat.id);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-orbitron text-xs font-semibold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? "text-black" : "text-[#00F0FF]"}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Custom Dropdown */}
            <div className="relative w-full sm:hidden">
              <select
                value={category}
                onChange={(e) => {
                  setQuery("");
                  setCategory(e.target.value);
                }}
                className="w-full appearance-none bg-[#141824] text-slate-100 pl-4 pr-10 py-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-[#00F0FF] text-xs font-orbitron uppercase tracking-wider font-semibold cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#0F121C] text-slate-100 py-2">
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#00F0FF] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Manual Search Trigger Button */}
            <button
              onClick={fetchMovies}
              className="w-full sm:w-auto px-6 py-3 bg-[#00F0FF] hover:bg-[#00D0DF] text-black font-orbitron font-bold uppercase tracking-wider text-xs rounded-xl transition shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95"
            >
              Search Grid
            </button>
          </div>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#00F0FF] animate-spin" />
              <Sparkles className="w-5 h-5 text-[#8B5CF6] absolute animate-ping" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00F0FF] font-orbitron bg-[#0F121C] px-4 py-2 rounded-lg border border-[#00F0FF]/20">
              Querying Transmission Signals...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#180A10]/90 border border-[#FF2E63]/50 p-6 rounded-2xl max-w-lg mx-auto text-center space-y-3 shadow-[0_0_20px_rgba(255,46,99,0.2)]">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF2E63]/20 text-[#FF2E63]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-base font-bold font-orbitron text-[#FF2E63] uppercase tracking-wide">
              {error}
            </p>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default Movies;