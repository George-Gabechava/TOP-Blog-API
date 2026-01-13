import "./BlogDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Tiny MCE Install
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function BlogDetail({ onAuthChange }) {
  let params = useParams();
  let postId = params.id;

  const [post, setPost] = useState([]);

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Tiny MCE Install
  const editorRef = useRef(null);
  let tinyContent = "";
  const log = () => {
    if (editorRef.current) {
      tinyContent = editorRef.current.getContent();
    }
  };

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

  // Get Blog data
  async function getBlog(id) {
    const token = localStorage.getItem("auth_token");

    try {
      // Check Authorization status
      let authReturn = checkAuth();
      if (authReturn === false) {
        return;
      }

      // Fetch blogs if authorized
      const res = await fetch(`${backendBase}/api/blog/${id}`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setPost(data.post);

      // Fetch comments if they exist (to delete or edit them)
      // code
    } catch (err) {
      console.log(err);
    }
  }

  // Save current Blog Details to server
  // update all fields except publish/unpublish and published date.
  async function save(values) {
    const token = localStorage.getItem("auth_token");

    // Check Authorization status
    let authReturn = checkAuth();
    if (authReturn === false) {
      return;
    }

    // Get timestamp for updatedAt
    let currentTime = new Date().getTime();

    // Get blog post content
    log();

    let content = {
      name: values.blogName,
      tags: values.blogTags,
      updatedAt: currentTime,
      message: tinyContent,
    };

    await fetch(`${backendBase}/api/blog/${postId}`, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Get form values
    const formValues = new FormData(e.currentTarget);
    const blogName = (formValues.get("blogName") || "").toString();
    const blogTags = (formValues.get("blogTags") || "").toString();

    let publish = post.published;
    if (formValues.get("publish")) {
      publish = formValues.get("publish");
    }

    // Get latest editor content
    log();
    console.log("pub", publish, formValues.get("publish"));
    save({ blogName, blogTags, publish });
  }

  useEffect(() => {
    if (postId) getBlog(postId);
  }, [postId]);

  return (
    <div>
      <h1>Blog Details</h1>
      <p>Blog ID: {postId}</p>
      <form method="post" onSubmit={handleSubmit}>
        <h2>
          Blog Title:
          <input
            id="blogName"
            name="blogName"
            type="text"
            defaultValue={post.name}
          ></input>
        </h2>
        <h3>
          Tags:
          <input
            type="text"
            id="blogTags"
            name="blogTags"
            defaultValue={post.tags ? post.tags.join(", ") : ""}
          ></input>
        </h3>

        <p>
          Publish status: <b>{String(post.published)}</b>
        </p>
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
        <Editor
          apiKey={import.meta.env.VITE_TINY_API}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Jan 25, 2026:
              "checklist",
              "mediaembed",
              "casechange",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "advtemplate",
              "ai",
              "uploadcare",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
            uploadcare_public_key: "c2bdf442e46606790b07",
          }}
          initialValue={post.message ? post.message : "Hello World."}
        />

        <div>
          <button type="submit">Save</button>
          <button name="publish" value="false" type="submit">
            Unpublish
          </button>
          <button name="publish" value="true" type="submit">
            Publish
          </button>
        </div>
      </form>

      <h2>Comments</h2>
      {/* code */}
    </div>
  );
}

export default BlogDetail;
