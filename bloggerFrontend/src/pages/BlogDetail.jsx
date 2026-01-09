import "./BlogDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function BlogDetail({ onAuthChange }) {
  let params = useParams();
  let postId = params.id;

  const [post, setPost] = useState([]);

  async function getBlog(id) {
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
      const res = await fetch(`${backendBase}/api/blog/${id}`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setPost(data.post);
      console.log("post", post, "data", data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getBlog(postId);
  }, []);

  return (
    <div>
      <h1>Blog Details</h1>
      <p>Blog ID: {postId}</p>
      <h2>{post.name}</h2>
      <h3>{post.tags}</h3>
      <p>Publish status: {String(post.published)}</p>
      <p>Created: {post.createdAt}</p>
      <p>Updated: {post.updatedAt}</p>
      <p>{post.message}</p>
    </div>
  );
}

export default BlogDetail;
