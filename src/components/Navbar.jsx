import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#B7B7B7"><path d="M237-285q54-38 115.5-56.5T480-360q66 0 127.5 18.5T723-285q35-41 52-91t17-104q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 54 17 104t52 91Zm141-165q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Z"/></svg>
  )
}

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useUser();
  
  return (
    <nav className="block mx-auto bg-slate-800/50 text-slate-200 px-6 py-3 sticky top-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg w-[95%] max-w-6xl z-9999">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-slate-300">
          MovIEDC
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>
          <Link to="/movies" className="hover:text-slate-300">
            Movies
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="text-sm font-mono">Hi! {user?.firstName}</div>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link 
                    label="Profile"
                    labelIcon={<DotIcon />}
                    href="/profile"
                    />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="py-2 px-4 rounded-2xl bg-blue-100 text-gray-950 hover:bg-blue-200 hover:text-gray-900 transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="py-2 px-4 rounded-2xl bg-blue-600 text-gray-50 hover:bg-blue-800 hover:text-gray-200 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>

        <button
          onClick={() => setOpenNav(!openNav)}
          className="lg:hidden relative h-6 w-6 text-inherit"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {openNav ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </span>
        </button>
      </div>

      {openNav && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>

          <div className="flex flex-col gap-3 mt-2">
            <SignedIn>
              <div className="flex items-center justify-between text-sm font-mono">
                Hi! {user?.firstName}
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link 
                      label="Profile"
                      labelIcon={<DotIcon />}
                      href="/profile"
                      />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="py-3 px-4 rounded-2xl bg-blue-100 text-gray-950 hover:bg-blue-300 hover:text-gray-900 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="py-3 px-4 rounded-2xl bg-blue-600 text-gray-50 hover:bg-blue-800 hover:text-gray-200 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
