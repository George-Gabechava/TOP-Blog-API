import "./Blogs.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blogs({ onAuthChange }) {
  const [posts, setPosts] = useState([]);
  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Check auth status
  async function checkAuth() {
    const token = localStorage.getItem("auth_token");

    try {
      const myStatus = await fetch(`${backendBase}/api/users/me`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      onAuthChange(myStatus.ok);
      if (!myStatus.ok) {
        console.error("auth check failed", myStatus.status);
        return false;
      }
      return true;
    } catch (err) {
      console.error("auth check failed", err);
      onAuthChange(false);
      return false;
    }
  }

  async function getBlogs() {
    try {
      const token = localStorage.getItem("auth_token");
      // Check Authorization status
      let authReturn = checkAuth();
      if (authReturn === false) {
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

  async function createBlog() {
    try {
      const token = localStorage.getItem("auth_token");
      // Check Authorization status
      let authReturn = checkAuth();
      if (authReturn === false) {
        return;
      }

      const myStatus = await fetch(`${backendBase}/api/users/me`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      onAuthChange(myStatus.ok);
      if (!myStatus.ok) {
        console.error("auth check failed", myStatus.status);
        return;
      }

      // Create new blog
      const res = await fetch(`${backendBase}/api/blog`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  }

  // Delete Post
  async function deletePost(id) {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;

    const token = localStorage.getItem("auth_token");

    // Check Authorization status
    const authOk = await checkAuth();
    if (!authOk) return;

    // Delete post if authorized
    const res = await fetch(`${backendBase}/api/blog/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      console.error(await res.text());
      return;
    }
    await getBlogs();
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <button type="button" onClick={() => createBlog()}>
        Create New Blog
      </button>
      <h1>Recent Blogs</h1>

      <div id="postsContainer">
        {posts.map((post) => (
          <div key={post.id} id={post.id} className="postCard">
            <h2>{post.name}</h2>
            <h3>Tags: {post.tags ? post.tags.join(", ") : ""}</h3>
            <p>
              Publish status: <b>{String(post.published)}</b>
            </p>
            <p>
              Published:{" "}
              {new Date(post.createdAt).toLocaleString("en-US", {
                timeZone: "America/New_York",
                timeStyle: "short",
                dateStyle: "short",
              })}
            </p>
            <p>
              Updated:{" "}
              {new Date(post.updatedAt).toLocaleString("en-US", {
                timeZone: "America/New_York",
                timeStyle: "short",
                dateStyle: "short",
              })}
            </p>
            <Link to={`/blogDetail/${post.id}`}>
              <button>Edit Blog</button>
            </Link>
            <button type="button" onClick={() => deletePost(post.id)}>
              Delete Blog
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
