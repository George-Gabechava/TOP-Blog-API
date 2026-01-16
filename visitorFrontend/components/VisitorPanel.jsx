import "./VisitorPanel.css";
import { Link } from "react-router-dom";

function VisitorPanel({ onAuthChange }) {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    onAuthChange(false);
  }
  return (
    <div id="VisitorPanel">
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

export default VisitorPanel;
