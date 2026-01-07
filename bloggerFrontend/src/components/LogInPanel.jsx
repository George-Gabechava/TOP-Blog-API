import React from "react";
import { Link } from "react-router-dom";
import "./LogInPanel.css";

function LogInPanel({ onLogout = () => {} }) {
  async function handleLogout() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${backendBase}/api/users/logOut`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        onLogout(false);
        // Redirect to login page after logout
        window.location.assign("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div id="LogInPanel">
      <div id="logInButtons">
        <button>Home Page Icon</button>
        <button>Button/Mobile Drop</button>
      </div>
      <div id="logInButtons">
        <Link to="/signUp">
          <button>Create Account</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default LogInPanel;
