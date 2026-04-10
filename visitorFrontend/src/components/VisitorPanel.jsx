import { Link } from "react-router-dom";
import "./VisitorPanel.css";

// Assets
import gg2Logo from "../assets/GG2.png";

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
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
