import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Film, Trash2, Calendar, Heart } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function MovieCard({ movie, showRemove = false, onRemove }) {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  // Check if movie is already in user's wishlist
  useEffect(() => {
    if (!user) return;
    const stored = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
    setIsSaved(stored.some((m) => m.id === movie.id));
  }, [user, movie.id]);

  // Toggle wishlist item from card top-right heart
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    const stored = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

    if (isSaved) {
      const updated = stored.filter((m) => m.id !== movie.id);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      setIsSaved(false);
      if (onRemove) onRemove(movie.id);
    } else {
      const updated = [...stored, movie];
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      setIsSaved(true);
    }
  };

  return (
    <div className="relative group bg-[#0F121C]/90 border border-slate-800 rounded-xl p-2.5 transition-all duration-300 hover:border-[#00F0FF]/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Top-Right Quick Wishlist Heart Button */}
      {user && !showRemove && (
        <button
          onClick={handleWishlistToggle}
          aria-label="Wishlist movie"
          className={`absolute top-4 right-4 z-20 p-2 rounded-lg backdrop-blur-md border transition-all duration-300 active:scale-90 ${
            isSaved
              ? "bg-[#FF007F]/20 border-[#FF007F] text-[#FF007F] shadow-[0_0_12px_rgba(255,0,127,0.5)]"
              : "bg-black/60 border-slate-700/80 text-slate-400 hover:text-white hover:border-[#00F0FF]"
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-[#FF007F]" : ""}`} />
        </button>
      )}

      <Link to={`/movies/${movie.id}`} className="block relative overflow-hidden rounded-lg group">
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-md text-[#FFC700] text-xs font-bold px-2 py-1 rounded-md border border-[#FFC700]/30 flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-[#FFC700]" />
          <span>{rating}</span>
        </div>

        {/* Poster Image or High-Tech Fallback */}
        {movie.poster_path ? (
          <div className="overflow-hidden rounded-lg bg-slate-900 aspect-[2/3]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[2/3] bg-[#141824] rounded-lg flex flex-col items-center justify-center p-4 text-center border border-slate-800">
            <Film className="w-10 h-10 text-[#00F0FF]/50 mb-2" />
            <span className="font-orbitron text-xs text-slate-400 uppercase tracking-wider">
              No Poster
            </span>
          </div>
        )}

        {/* Title & Metadata */}
        <div className="mt-3 space-y-1 px-1">
          <h3 className="font-orbitron text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-100 line-clamp-1 group-hover:text-[#00F0FF] transition-colors">
            {movie.title}
          </h3>
          
          {movie.release_date && (
            <p className="text-[11px] font-mono font-medium text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{movie.release_date.split("-")[0]}</span>
            </p>
          )}
        </div>

      </Link>

      {/* Remove Button for Profile Wishlist View */}
      {showRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(movie.id);
          }}
          className="mt-3 w-full py-1.5 bg-[#FF2E63]/10 hover:bg-[#FF2E63] text-[#FF2E63] hover:text-white font-orbitron text-[10px] uppercase tracking-wider border border-[#FF2E63]/40 hover:border-[#FF2E63] rounded-md transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3 h-3" />
          <span>Remove</span>
        </button>
      )}
    </div>
  );
}