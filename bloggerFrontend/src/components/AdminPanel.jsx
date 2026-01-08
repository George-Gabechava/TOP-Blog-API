import "./AdminPanel.css";

function AdminPanel() {
  function handleLogout() {
    localStorage.removeItem("auth_token");
    window.location.assign("/login");
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
