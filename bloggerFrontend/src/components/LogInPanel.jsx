import React from "react";
import { Link } from "react-router-dom";
import "./LogInPanel.css";

function LogInPanel() {
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
      </div>
    </div>
  );
}

export default LogInPanel;
