import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Film, User, Menu, X, LogIn, UserPlus, Compass, Home } from "lucide-react";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-4 mx-auto w-[95%] max-w-6xl z-50 bg-[#0F121C]/80 backdrop-blur-md border border-[#00F0FF]/30 px-6 py-3.5 rounded-2xl glow-cyan transition-all">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-orbitron text-xl font-black uppercase tracking-wider text-white hover:text-[#00F0FF] transition-colors"
        >
          {/* <Film className="w-6 h-6 text-[#00F0FF] animate-pulse" /> */}
          <img src="/favicon.svg" alt="CineVibe Logo" className="w-6 h-6 animate-pulse" />
          <span>Cine<span className="text-[#00F0FF]">Vibe</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 font-orbitron text-xs font-semibold uppercase tracking-wider">
            <Link 
              to="/" 
              className={`flex items-center gap-1.5 transition-colors ${
                isActive("/") ? "text-[#00F0FF]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link 
              to="/movies" 
              className={`flex items-center gap-1.5 transition-colors ${
                isActive("/movies") ? "text-[#00F0FF]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Movies</span>
            </Link>
          </div>

          {/* User Status / Auth Controls */}
          <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
            <SignedIn>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium text-slate-300 bg-[#141824] px-3 py-1 rounded-md border border-slate-700/60">
                  AGENT // <span className="text-[#00F0FF] font-bold">{user?.firstName}</span>
                </span>

                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link 
                      label="Profile & Wishlist"
                      labelIcon={<User className="w-4 h-4 text-[#00F0FF]" />}
                      href="/profile"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-3 font-orbitron text-xs font-bold uppercase tracking-wider">
                <SignInButton>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#141824] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-[#00F0FF]/40 transition-all active:scale-95">
                    <LogIn className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#00D0DF] text-black transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] active:scale-95">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setOpenNav(!openNav)}
          className="lg:hidden p-2 text-slate-300 hover:text-[#00F0FF] bg-[#141824] border border-slate-700/80 rounded-lg transition"
          type="button"
          aria-label="Toggle menu"
        >
          {openNav ? <X className="w-5 h-5 text-[#FF2E63]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {openNav && (
        <div className="lg:hidden mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-4 font-orbitron text-xs uppercase tracking-wider">
          <Link 
            to="/" 
            onClick={() => setOpenNav(false)}
            className={`flex items-center gap-2 p-2.5 rounded-lg ${
              isActive("/") ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30" : "text-slate-300"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link 
            to="/movies" 
            onClick={() => setOpenNav(false)}
            className={`flex items-center gap-2 p-2.5 rounded-lg ${
              isActive("/movies") ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30" : "text-slate-300"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Movies</span>
          </Link>

          <div className="pt-2 border-t border-slate-800/80">
            <SignedIn>
              <div className="flex items-center justify-between p-2.5 bg-[#141824] border border-slate-700/80 rounded-lg">
                <span className="font-mono text-xs text-slate-300">
                  AGENT // <span className="text-[#00F0FF] font-bold">{user?.firstName}</span>
                </span>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link 
                      label="Profile & Wishlist"
                      labelIcon={<User className="w-4 h-4 text-[#00F0FF]" />}
                      href="/profile"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-2.5 pt-2">
                <SignInButton>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#141824] text-slate-200 border border-slate-700 font-bold">
                    <LogIn className="w-4 h-4 text-[#00F0FF]" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#00F0FF] text-black font-bold">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}