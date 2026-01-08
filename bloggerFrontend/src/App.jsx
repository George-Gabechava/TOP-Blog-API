// Set up
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LogInPanel from "./components/LogInPanel.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

import LogIn from "./pages/LogIn.jsx";
import Blogs from "./pages/Blogs.jsx";
import SignUp from "./pages/SignUp.jsx";

import Footer from "./components/Footer.jsx";

// Assets
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Navigation Bar based on user type
let panel;
let content;

function App() {
  // Authorization comes from Losgin.jsx via onAuthChange
  const [isBlogger, setIsBlogger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleAuthChange(isAdmin) {
    setIsBlogger(Boolean(isAdmin));
  }

  // Auth on app load so refresh preserves state
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    (async () => {
      try {
        const res = await fetch(`${backendBase}/api/users/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setIsBlogger(false);
          return;
        }
        const data = await res.json();
        setIsBlogger(Boolean(data.admin));
      } catch (err) {
        console.error("auth bootstrap failed", err);
      }
    })();
  }, []);

  // Update Navigation Bar
  if (isBlogger === true) {
    panel = <AdminPanel onAuthChange={handleAuthChange} />;
    content = <Blogs onAuthChange={handleAuthChange} />;
  } else {
    panel = <LogInPanel onAuthChange={handleAuthChange} />;
    content = <h3>Log in as a Blogger to edit blogs.</h3>;
  }

  return (
    <BrowserRouter>
      <div>
        {panel}
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        {content}

        {/* Routes for content swapping */}
        <Routes>
          <Route
            path="/login"
            element={<LogIn onAuthChange={handleAuthChange} />}
          />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        {/* Show Blogs if authorized */}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
