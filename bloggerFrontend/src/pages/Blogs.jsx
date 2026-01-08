import "./Blogs.css";
import { useEffect } from "react";

function Blogs({ onAuthChange }) {
  async function getBlogs() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    console.log("get Blogs");
    try {
      const token = localStorage.getItem("auth_token");
      // Check auth status
      const myStatus = await fetch(`${backendBase}/api/users/me`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log("myStatus", myStatus);
      onAuthChange(myStatus.ok);
      if (!myStatus.ok) {
        console.error("auth check failed", myStatus.status);
        return;
      }

      // Fetch blogs if authorized
      const res = await fetch(`${backendBase}/api/blog`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log("posts status", res.status);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("posts error", text);
        return;
      }
      const data = await res.json();
      console.log("posts data", data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div>
      <h1>Recent Blogs</h1>

      {/* <div className="card">
        <h2>Blog Title</h2>
        <p>Some wise words.</p>
        <button>Edit</button>
      </div> */}
    </div>
  );
}

export default Blogs;
