import React from "react";
import { Link } from "react-router-dom";
import "./LogInPanel.css";

function LogInPanel() {
  return (
    <div id="LogInPanel">
      <div id="logInButtons">
        {/* Make Components?: */}
        <button>Home Page Icon</button>
        <button>Button/Mobile Drop</button>
      </div>
      <div id="logInButtons">
        <Link to="/signUp">
          <button>Sign Up</button>
        </Link>
        <Link to="/logIn">
          <button>Log In</button>
        </Link>
      </div>
    </div>
  );
}

export default LogInPanel;
