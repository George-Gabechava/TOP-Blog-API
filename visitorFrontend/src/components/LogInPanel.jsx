import { Link } from "react-router-dom";
import "./LogInPanel.css";

// Assets
import home from "../assets/home.svg";

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
            <img id="personalSiteLogo" src="/GG2.png" alt="Visit personal site" />
          </a>
        )}
        <Link to="/">
          <button id="homeButton">
            <img id="homeIcon" src={home} className="logo" alt="Home Icon" />
          </button>
        </Link>
        {/* Commenting out blogs button until new home page is added */}
        {/* <Link to="/">
          <button id="blogButton">Blogs</button>
        </Link> */}
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
