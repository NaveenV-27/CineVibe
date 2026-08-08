import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Star, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Play, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Film, 
  Loader2,
  Sparkles
} from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const { user } = useUser();
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoRes.json();

        if (videoData.results) {
          const trailerVideo = videoData.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          if (trailerVideo) setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovie();
  }, [id]);

  const handleAdd = (movie) => {
    if (!user) return;
    const stored = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

    if (stored.some((m) => m.id === movie.id)) {
      setMessage("exists");
      return;
    }

    const updated = [...stored, movie];
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));

    setMessage("added");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!movie) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
        <Loader2 className="w-12 h-12 text-[#00F0FF] animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-[#00F0FF] font-orbitron bg-[#0F121C] px-4 py-2 rounded-lg border border-[#00F0FF]/20">
          Decrypting Transmission Details...
        </p>
      </div>
    );
  }

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="min-h-screen bg-[#06070B] text-slate-100 p-4 sm:p-8 bg-cyber-grid selection:bg-[#00F0FF] selection:text-black">
      <main className="max-w-6xl mx-auto my-6">
        
        {/* Main Card Container */}
        <div className="relative bg-[#0F121C]/90 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-10 rounded-2xl glow-cyan flex flex-col md:flex-row gap-8 overflow-hidden">
          
          {/* Top Status Tag */}
          <div className="absolute top-0 right-0 bg-[#00F0FF]/10 text-[#00F0FF] border-b border-l border-[#00F0FF]/30 text-[11px] font-orbitron uppercase tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Target Record</span>
          </div>

          {/* Poster Section */}
          <div className="flex-shrink-0 relative group">
            <div className="border border-slate-800 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] bg-slate-900">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full md:w-80 h-auto object-cover"
                />
              ) : (
                <div className="w-full md:w-80 h-[450px] bg-[#141824] flex flex-col items-center justify-center p-4 text-center">
                  <Film className="w-12 h-12 text-[#00F0FF]/40 mb-3" />
                  <span className="font-orbitron text-xs uppercase text-slate-400">
                    No Poster Available
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between flex-grow space-y-6">
            
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide font-orbitron text-white leading-tight pt-2">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-xs sm:text-sm font-medium text-[#00F0FF] italic bg-[#00F0FF]/5 px-3 py-1.5 border-l-2 border-[#00F0FF] inline-block rounded-r-md">
                  "{movie.tagline}"
                </p>
              )}

              {/* Genres */}
              {movie.genres && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-[11px] font-semibold uppercase bg-[#141824] text-slate-300 px-2.5 py-1 border border-slate-700/60 rounded-md"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="text-slate-300 leading-relaxed font-normal text-sm sm:text-base pt-2">
                {movie.overview || "No overview briefing available for this target."}
              </p>

              {/* Specs Row */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-[#141824] border border-[#FFC700]/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200">
                  <Star className="w-4 h-4 text-[#FFC700] fill-[#FFC700]" />
                  <span>Rating:</span>
                  <span className="text-[#FFC700] font-bold font-orbitron">{rating}</span>
                </div>
                
                {movie.release_date && (
                  <div className="flex items-center gap-1.5 bg-[#141824] border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200">
                    <Calendar className="w-4 h-4 text-[#00F0FF]" />
                    <span>Release:</span>
                    <span className="font-mono text-slate-300">{movie.release_date}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 bg-[#141824] border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200">
                  <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Popularity:</span>
                  <span className="text-[#8B5CF6] font-bold font-orbitron">{Math.round(movie.popularity)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap gap-4 items-center">
                
                {/* Wishlist Button */}
                <button
                  onClick={() => handleAdd(movie)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#00F0FF] hover:bg-[#00D0DF] text-black font-orbitron font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-black" />
                  <span>Add to Wishlist</span>
                </button>

                {/* Watch Trailer Button */}
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-orbitron font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Trailer</span>
                  </button>
                )}
              </div>

              {/* Toast Feedbacks */}
              {message === "added" && (
                <div className="flex items-center gap-2 inline-flex bg-[#00F0FF]/10 text-[#00F0FF] font-orbitron font-semibold text-xs uppercase px-3 py-1.5 border border-[#00F0FF]/40 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved to Target Wishlist</span>
                </div>
              )}

              {message === "exists" && (
                <div className="flex items-center gap-2 inline-flex bg-[#FFC700]/10 text-[#FFC700] font-orbitron font-semibold text-xs uppercase px-3 py-1.5 border border-[#FFC700]/40 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Already Stored in Wishlist</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Modal for Trailer */}
        {showTrailer && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F121C] border border-[#00F0FF]/40 p-4 sm:p-6 rounded-2xl w-full max-w-4xl relative glow-cyan">
              
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-orbitron text-xs sm:text-sm uppercase tracking-wider text-[#00F0FF]">
                  <Play className="w-4 h-4 fill-[#00F0FF]" />
                  <span>Live Stream Feed</span>
                </div>

                <button
                  onClick={() => setShowTrailer(false)}
                  className="bg-slate-800 text-slate-300 hover:text-white hover:bg-[#FF2E63] p-1.5 border border-slate-700 transition-colors rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                  title="Official Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}