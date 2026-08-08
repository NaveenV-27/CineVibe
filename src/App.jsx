import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import Profile from "./components/Profile";
import { Protect } from '@clerk/clerk-react';
import Unauth from "./components/Unauth";


function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/profile"
            element={
              <Protect fallback={Unauth()}>
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
