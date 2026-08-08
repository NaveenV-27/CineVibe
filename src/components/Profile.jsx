import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Bookmark, Star, ShieldCheck, Mail, Film, Loader2 } from "lucide-react";
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

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
        <Loader2 className="w-12 h-12 text-[#00F0FF] animate-spin" />
      </div>
    );
  }

  const avgRating = wishlist.length > 0
    ? (wishlist.reduce((acc, m) => acc + (m.vote_average || 0), 0) / wishlist.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-[#06070B] text-slate-100 p-4 sm:p-8 bg-cyber-grid selection:bg-[#00F0FF] selection:text-black">
      <main className="max-w-6xl mx-auto space-y-10 my-4">
        
        {/* Profile Header HUD Box */}
        <div className="relative bg-[#0F121C]/80 backdrop-blur-md border border-[#00F0FF]/30 rounded-2xl p-6 sm:p-8 glow-cyan flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />

          {/* User Info Group */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.firstName}
                className="w-20 h-20 rounded-xl object-cover border-2 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#06070B] border border-[#00F0FF] p-1 rounded-md text-[#00F0FF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-orbitron font-semibold uppercase px-2 py-0.5 rounded border border-[#00F0FF]/20">
                Verified Operative
              </div>
              <h1 className="text-2xl font-black uppercase tracking-wide font-orbitron text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user.primaryEmailAddress?.emailAddress}</span>
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex gap-4 w-full md:w-auto justify-stretch">
            
            <div className="flex-1 md:flex-none bg-[#141824] border border-slate-700/80 px-5 py-3 rounded-xl text-center space-y-0.5 min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[#00F0FF]">
                <Bookmark className="w-4 h-4" />
                <span className="text-xl font-bold font-orbitron">{wishlist.length}</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-orbitron">
                Saved Movies
              </p>
            </div>

            <div className="flex-1 md:flex-none bg-[#141824] border border-slate-700/80 px-5 py-3 rounded-xl text-center space-y-0.5 min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[#FFC700]">
                <Star className="w-4 h-4 fill-[#FFC700]" />
                <span className="text-xl font-bold font-orbitron">{avgRating}</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-orbitron">
                Avg Rating
              </p>
            </div>

          </div>

        </div>

        {/* Wishlist Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bookmark className="w-5 h-5 text-[#00F0FF]" />
            <h2 className="text-2xl font-bold uppercase tracking-wider font-orbitron text-white">
              Target Wishlist
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-[#0F121C]/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Film className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 font-orbitron text-sm uppercase tracking-wider">
                Your transmission stash is currently empty.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
      </main>
    </div>
  );
}