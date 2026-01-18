import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BlogView.css";

function BlogView({ onAuthChange }) {
  let param = useParams();
  let postId = param.id;
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

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

  async function getBlog(id) {
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`${backendBase}/api/blog/published/${id}`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setPost(data.post);
    } catch (err) {
      console.log(err);
    }
  }

  // Get Comments
  async function getComments(id) {
    const token = localStorage.getItem("auth_token");
    try {
      // Fetch comments
      const res = await fetch(`${backendBase}/api/blog/comments/${id}`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setComments(data.allComments);
    } catch (err) {
      console.error(err);
    }
  }

  // Prevent fetches from looping
  useEffect(() => {
    if (!postId) return;
    getBlog(postId);
    getComments(postId);
  }, [postId]);

  return (
    <div>
      <h1>{post.name}</h1>
      <h3 class="blogTags">
        Tags:&nbsp;
        {post.tags ? post.tags.join(", ") : ""}
      </h3>
      <p>
        Published:{" "}
        {new Date(post.createdAt).toLocaleString("en-US", {
          timeZone: "America/New_York",
          timeStyle: "medium",
          dateStyle: "short",
        })}
      </p>
      <p>
        Updated:{" "}
        {new Date(post.updatedAt).toLocaleString("en-US", {
          timeZone: "America/New_York",
          timeStyle: "medium",
          dateStyle: "short",
        })}
      </p>
      {post.message}

      <h2>Comments</h2>
      <div id="commentsContainer">
        {comments.map((comment) => (
          <div key={comment.id} className="commentCard">
            <p>
              <b>{comment.owner.username}</b>:
            </p>
            <p> {comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogView;
