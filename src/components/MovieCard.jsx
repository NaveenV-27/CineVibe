import { Link } from "react-router-dom";

export default function MovieCard({ movie, showRemove = false, onRemove }) {
  return (
    <div className="relative group bg-slate-800 p-3 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition transform duration-300">
      
      <Link to={`/movies/${movie.id}`} className="block relative">
        
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg mb-2 w-full"
          />
        ) : (
          <div className="h-72 bg-slate-700 rounded-lg flex items-center justify-center">
            No Image
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

        {/* Text Overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-sm font-semibold text-white">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-300">
            ⭐ {movie.vote_average}
          </p>
        </div>

      </Link>

      {showRemove && (
        <button
          onClick={() => onRemove(movie.id)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md z-10"
        >
          Remove
        </button>
      )}
    </div>
  );
}