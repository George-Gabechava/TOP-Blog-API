import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";

function AdminPanel({ onLogout = () => {} }) {
  const navigate = useNavigate();

  async function handleLogout() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${backendBase}/api/users/logOut`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        onLogout(false);
        navigate("/login");
      }
    } catch (e) {
      // ignore
    }
  }
  return (
    <div id="AdminPanel">
      <div id="logInButtons">
        {/* Make Components?: */}
        <button>Home Page Icon</button>
        <button>Button/Mobile Drop</button>
      </div>

      <div id="logInButtons">
        <button>Create Post</button>
        <button>Edit Post</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
