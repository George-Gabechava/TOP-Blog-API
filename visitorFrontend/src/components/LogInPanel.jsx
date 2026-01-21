import { Link } from "react-router-dom";
import "./LogInPanel.css";

// Assets
import home from "../assets/home.svg";

function LogInPanel({ onAuthChange }) {
  return (
    <div id="LogInPanel">
      <div id="navigationButtons">
        <Link to="/">
          <button id="homeButton">
            <img id="homeIcon" src={home} className="logo" alt="Home Icon" />
          </button>
        </Link>
        <Link to="/">
          <button id="blogButton">Blogs</button>
        </Link>
      </div>
      <div id="logInButtons">
        <Link to="/signUp">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button id="logInButton">Log In</button>
        </Link>
      </div>
    </div>
  );
}

export default LogInPanel;
