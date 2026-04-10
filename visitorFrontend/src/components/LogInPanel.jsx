import { Link } from "react-router-dom";
import "./LogInPanel.css";

// Assets
import gg2Logo from "../assets/GG2.png";

const personalSiteUrl = import.meta.env.VITE_PERSONAL_SITE_URL;

function LogInPanel({ onAuthChange }) {
  return (
    <div id="LogInPanel">
      <div id="navigationButtons">
        {personalSiteUrl && (
          <a
            href={personalSiteUrl}
            id="personalSiteLink"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit personal site"
          >
            <img
              id="personalSiteLogo"
              src={gg2Logo}
              alt="Visit personal site"
            />
          </a>
        )}
        <Link to="/" className="blogLink">
          Blogs
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
