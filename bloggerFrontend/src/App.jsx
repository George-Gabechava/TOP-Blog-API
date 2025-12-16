// Set up
import { useState } from "react";
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
  // Update authorization
  const [isBlogger, setIsBlogger] = useState(false);

  // Update Navigation Bar
  if (isBlogger === true) {
    panel = <AdminPanel />;
    content = <Blogs />;
  } else {
    panel = <LogInPanel />;
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
          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        {/* Show Blogs if authorized */}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
