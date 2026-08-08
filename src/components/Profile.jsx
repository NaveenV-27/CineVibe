import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Profile() {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem(`wishlist_${user.id}`);
        setWishlist(stored ? JSON.parse(stored) : []);
    }, [user]);

    const removeFromWishlist = (id) => {
    const updated = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updated);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      
      {/* Profile Header */}
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        
        <div className="flex items-center gap-5">
          <img
            src={user.imageUrl}
            alt={user.firstName}
            className="w-20 h-20 rounded-full border-4 border-slate-700"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-400 text-sm">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="bg-slate-700 px-5 py-3 rounded-xl text-center">
            <p className="text-xl font-semibold">{wishlist.length}</p>
            <p className="text-xs text-gray-400">Saved Movies</p>
          </div>

          <div className="bg-slate-700 px-5 py-3 rounded-xl text-center">
            <p className="text-xl font-semibold">
              {wishlist.length > 0
                ? (
                    wishlist.reduce((acc, m) => acc + m.vote_average, 0) /
                    wishlist.length
                  ).toFixed(1)
                : "0"}
            </p>
            <p className="text-xs text-gray-400">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-gray-500 text-lg">
              Your wishlist is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {wishlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showRemove={true}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
