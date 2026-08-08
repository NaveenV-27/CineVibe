# 🎬 CineVibe

> **A high-tech, futuristic movie discovery platform powered by TMDB API and Clerk Authentication.**

CineVibe is a sleek React web application designed with a **Glass Cyber / High-Tech HUD** aesthetic. It provides movie enthusiasts with a real-time transmission grid to explore trending movies, search TMDB databases, view detailed movie breakdowns, watch official trailers, and maintain a personalized target wishlist.

---

## ⚡ Features

* **📡 Live Trending Transmission:** Real-time daily trending movie feeds direct from TMDB.
* **🔎 Discover Grid:** Integrated search bar and category filters (*Popular*, *Now Playing*, *Top Rated*) with dynamic debouncing.
* **🎯 Comprehensive Movie Dossier:** High-tech movie detail view featuring ratings, release dates, popularity metrics, genres, and taglines.
* **▶ Official Trailer Feeds:** Modal popup integration for YouTube trailers directly within the application.
* **❤️ Personal Target Wishlist:** Save and manage target movies locally tied directly to your user account.
* **🔒 Secure Authentication:** Account management, profile views, and route protection powered by Clerk.
* **🎨 Glass Cyber HUD UI:** Designed with high-contrast glassmorphism panels, ambient cyan/violet glows, custom vector icons, and geometric typography (`Orbitron` & `Space Grotesk`).

---

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Authentication:** [Clerk React SDK](https://clerk.com/)
* **Data Source:** [TMDB API](https://www.themoviedb.org/documentation/api)

---

## 📁 Project Structure

```text
cinevibe/
├── public/
│   └── favicon.svg           # Custom Cyberpunk Vector Favicon
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Trending Movies Landing Page
│   │   ├── Movies.jsx        # Search & Filter Transmission Grid
│   │   ├── MovieCard.jsx     # Reusable Cyberpunk Movie Card Component
│   │   ├── MovieDetails.jsx  # Movie Details & Trailer Player View
│   │   ├── Navbar.jsx        # Floating Glassmorphism Sticky Header
│   │   ├── Profile.jsx       # User Stats & Target Wishlist Manager
│   │   └── Unauth.jsx        # Access Denied Fallback Screen
│   ├── App.jsx               # Router & Auth Route Protection
│   ├── index.css             # Tailwind v4 Directives & Font Imports
│   └── main.jsx              # React DOM Root
├── .env                      # API Keys & Secrets
├── package.json
└── README.md