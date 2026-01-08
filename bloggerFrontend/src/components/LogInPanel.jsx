import React from "react";
import { Link } from "react-router-dom";
import "./LogInPanel.css";

function LogInPanel() {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    window.location.assign("/login");
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
