import "./BlogFeed.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogFeed({ onAuthChange }) {
  const [posts, setPosts] = useState([]);

  async function getBlogs() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    try {
      const token = localStorage.getItem("auth_token");

      // Fetch blogs
      const res = await fetch(`${backendBase}/api/blog/published`, {
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
    <div className="blogViewContainer">
      <h1>Recent Blogs</h1>

      <div id="postsContainer">
        {posts.map((post) => (
          <Link to={`/blogView/${post.id}`}>
            <div key={post.id} id={post.id} className="postCard">
              <h2>{post.name}</h2>
              <b>Tags: {post.tags ? post.tags.join(", ") : ""}</b>
              <p>
                Published:{" "}
                {new Date(post.createdAt).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                  timeStyle: "short",
                  dateStyle: "short",
                })}
              </p>
              {/* Commenting out Updated as it isn't informative at the moment */}
              {/* <p>
              Updated:{" "}
              {new Date(post.updatedAt).toLocaleString("en-US", {
                timeZone: "America/New_York",
                timeStyle: "short",
                dateStyle: "short",
              })}
            </p> */}
              <p className="summaryContainer">{post.summary}</p>
              <p>
                <b>Read More &#8594;</b>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogFeed;
