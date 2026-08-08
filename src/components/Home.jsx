import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Loader2, AlertTriangle, Zap } from "lucide-react";
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
        setError("Failed to load transmission data");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-[#06070B] text-slate-100 p-4 sm:p-8 bg-cyber-grid selection:bg-[#00F0FF] selection:text-black">
      <main className="max-w-7xl mx-auto space-y-10">
        
        {/* Futuristic Hero Section */}
        <section className="relative bg-[#0F121C]/80 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-10 rounded-2xl glow-cyan overflow-hidden">
          
          {/* Subtle Cyber Gradient Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />

          {/* Top Status Tag */}
          <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            <span>Live Feed Synchronized</span>
          </div>

          <div className="relative z-10 space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider font-orbitron bg-gradient-to-r from-white via-slate-200 to-[#00F0FF] bg-clip-text text-transparent flex items-center gap-3">
              Trending Movies
              <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-[#FF2E63] inline-block animate-bounce" />
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-400 max-w-xl">
              Explore real-time cinema transmissions trending across the globe today.
            </p>
          </div>

          {/* Ambient Glow Orb */}
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#00F0FF] animate-spin" />
              <Sparkles className="w-5 h-5 text-[#8B5CF6] absolute animate-ping" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00F0FF] font-orbitron bg-[#0F121C] px-4 py-2 rounded-lg border border-[#00F0FF]/20">
              Initializing Transmission Grid...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#180A10]/90 border border-[#FF2E63]/50 p-6 rounded-2xl max-w-lg mx-auto text-center space-y-3 shadow-[0_0_20px_rgba(255,46,99,0.2)]">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] mb-1">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-lg font-bold font-orbitron text-[#FF2E63] uppercase tracking-wide">
              Signal Interrupted
            </p>
            <p className="text-xs text-slate-400 bg-black/40 p-2 rounded border border-slate-800 font-mono">
              {error}. Please check your connection or API key.
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

export default Home;  