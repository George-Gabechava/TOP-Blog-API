import { Link } from "react-router-dom";
import "./VisitorPanel.css";

// Assets
import home from "../assets/home.svg";

function AdminPanel({ onAuthChange }) {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    onAuthChange(false);
    window.location.assign("/");
  }
  return (
    <div id="AdminPanel">
      <div id="logInButtons">
        <Link to="/">
          <img src={home} id="homeButton" alt="Home" className="logo" />
        </Link>
        <Link to="/">
          <button id="blogButton">Blogs</button>
        </Link>
      </div>

      <div id="logInButtons">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
