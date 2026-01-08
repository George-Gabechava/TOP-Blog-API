import "./AdminPanel.css";

function AdminPanel({ onAuthChange }) {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    onAuthChange(false);
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
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminPanel;
