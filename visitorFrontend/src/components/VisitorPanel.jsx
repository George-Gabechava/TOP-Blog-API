import { Link } from "react-router-dom";
import "./VisitorPanel.css";

// Assets
import home from "../assets/home.svg";

const personalSiteUrl = import.meta.env.VITE_PERSONAL_SITE_URL;

function AdminPanel({ onAuthChange }) {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    onAuthChange(false);
    window.location.assign("/");
  }
  return (
    <div id="AdminPanel">
      <div id="logInButtons">
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
            <img id="homeIcon" src={home} alt="Home Icon" />
          </button>
        </Link>
        {/* Commenting out blogs button until new home page is added */}
        {/* <Link to="/">
          <button id="blogButton">Blogs</button>
        </Link> */}
      </div>

      <div id="logInButtons">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
