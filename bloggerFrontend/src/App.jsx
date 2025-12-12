import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogInPanel from "./components/LogInPanel.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

import LogIn from "./pages/LogIn.jsx";
import Blogs from "./pages/Blogs.jsx";
import CreateUser from "./pages/CreateUser.jsx";

import Footer from "./components/Footer.jsx";

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
    content = <LogIn />;
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

        {/* Routes for content swapping */}
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/createUser" element={<CreateUser />} />
        </Routes>
        {/* Show Blogs if authorized */}
        {content}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
