import "./Blogs.css";

function Blogs() {
  async function getBlogs() {
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    console.log("get Blogs");
    try {
      const token = localStorage.getItem("auth_token");
      const posts = await fetch(`${backendBase}/api/blog`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log("posts", posts);
    } catch (err) {
      console.log(err);
    }
  }
  getBlogs();
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
