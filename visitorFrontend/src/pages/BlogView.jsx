import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BlogView.css";

function BlogView({ onAuthChange, isLoggedIn }) {
  // Setting up post and comment states
  let param = useParams();
  let postId = param.id;
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Setting up string for Tinymce html.
  const [markup, setMarkup] = useState({ __html: <></> });

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
      setMarkup({ __html: data.post.message });
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

  // Create Comment on submit
  async function handleSubmit(e) {
    e.preventDefault();
    const commentMessage = commentText.trim();
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`${backendBase}/api/blog/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: commentMessage }),
      });
      // Get and render updated set of comments
      getComments(postId);
      // Clear comment field after submit
      setCommentText("");
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

  // If logged in, show comment form. Otherwise, display a message to log in to comment.
  let content;
  if (isLoggedIn === true) {
    content = (
      <div id="commentSubmitContainer">
        <h3>Leave A Comment</h3>
        <form id="commentForm" className="commentForm" onSubmit={handleSubmit}>
          <textarea
            name="commentContent"
            id="commentContent"
            rows="2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    content = (
      <div id="commentSubmitContainer">
        <h3>Log in to comment.</h3>
        <textarea id="commentContent" rows="2" />
      </div>
    );
  }

  return (
    <div className="blogViewContainer">
      <h1>{post.name}</h1>
      <h3 className="blogTags">
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

      <div className="blogMessage" dangerouslySetInnerHTML={markup} />

      {content}
      <h2>Comments</h2>
      <div id="commentsContainer">
        {comments.map((comment) => (
          <div key={comment.id} className="commentCard">
            <p>
              <b>{comment.owner.username}</b> @{" "}
              {new Date(comment.uploadedAt).toLocaleString("en-US", {
                timeZone: "America/New_York",
                timeStyle: "short",
                dateStyle: "short",
              })}
              :
            </p>
            <p> {comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogView;
