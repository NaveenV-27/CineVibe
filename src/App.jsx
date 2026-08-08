import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import Profile from "./components/Profile";
import { Protect } from "@clerk/clerk-react";
import Unauth from "./components/Unauth";

function App() {
  return (
    <BrowserRouter>
      {/* Root Container locked to Cyber Canvas styling */}
      <div className="min-h-screen bg-[#06070B] text-slate-100 font-sans selection:bg-[#00F0FF] selection:text-black relative pb-12">
        
        {/* Sticky Header Nav */}
        <header className="pt-4 px-2 sm:px-4">
          <Navbar />
        </header>

        {/* View Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route
            path="/profile"
            element={
              <Protect fallback={<Unauth />}>
                <Profile />
              </Protect>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;