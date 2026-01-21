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
