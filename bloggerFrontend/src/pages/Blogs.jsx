import "./Blogs.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blogs({ onAuthChange }) {
  const [posts, setPosts] = useState([]);

  async function getBlogs() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    try {
      const token = localStorage.getItem("auth_token");
      // Check auth status
      const myStatus = await fetch(`${backendBase}/api/users/me`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
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
      const data = await res.json();
      setPosts(data.allPosts);
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

      <div id="postsContainer">
        {posts.map((post) => (
          <div key={post.id} id={post.id} className="postCard">
            <h2>{post.name}</h2>
            <h3>{post.tags}</h3>
            <p>Publish status: {String(post.published)}</p>
            <p>Created: {post.createdAt}</p>
            <p>Updated: {post.updatedAt}</p>
            <Link to={`/blogDetail/${post.id}`}>
              <button>Edit Blog</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
