import "./AdminPanel.css";
import { Link } from "react-router-dom";

function AdminPanel({ onAuthChange }) {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    onAuthChange(false);
    window.location.assign("/");
  }
  return (
    <div id="AdminPanel">
      <div id="logInButtons">
        {/* Make Components?: */}
        <Link to="/">
          <button>*Home Page Icon</button>
        </Link>
      </div>

      <div id="logInButtons">
        <Link to="/blogs">
          <button>Blogs</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
