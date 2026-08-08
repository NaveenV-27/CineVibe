import { Link } from "react-router-dom";
import { Star, Film, Trash2, Calendar } from "lucide-react";

export default function MovieCard({ movie, showRemove = false, onRemove }) {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="relative group bg-[#0F121C]/90 border border-slate-800 rounded-xl p-2.5 transition-all duration-300 hover:border-[#00F0FF]/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 flex flex-col justify-between">
      
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

      {/* Remove Button for Wishlist */}
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