// Set Up
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LogInPanel from "./components/LogInPanel";
import VisitorPanel from "./components/VisitorPanel";
import Footer from "./components/Footer";

import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import BlogFeed from "./pages/BlogFeed.jsx";
import BlogView from "./pages/BlogView.jsx";

// Assets
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // Authorization from Login.jsx via onAuthChange
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  function handleAuthChange() {
    setIsLoggedIn(Boolean(localStorage.getItem("auth_token")));
  }

  // Authorization on app load so refresh preserves state
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
  }, []);

  // Log state changes with fresh values
  useEffect(() => {
    console.log("App state", { isLoggedIn });
  }, [isLoggedIn]);

  // Update Navigation Bar depending on user permissions.
  let panel;
  if (isLoggedIn === true) {
    panel = <VisitorPanel onAuthChange={handleAuthChange} />;
  } else {
    panel = <LogInPanel onAuthChange={handleAuthChange} />;
  }

  return (
    <BrowserRouter>
      <div>
        {panel}

        {/* Routes for content swapping */}
        <Routes>
          <Route
            path="/login"
            element={<LogIn onAuthChange={handleAuthChange} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/"
            element={<BlogFeed onAuthChange={handleAuthChange} />}
          />
          <Route
            path="/blogView/:id"
            element={
              <BlogView
                onAuthChange={handleAuthChange}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
