import { useState } from "react";
import "./LogIn.css";

function LogIn({ onAuthChange }) {
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
      setErrorMessage("");
      const res = await fetch(`${backendBase}/api/users/logIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        if (data?.token) {
          localStorage.setItem("auth_token", data.token);
        }
        onAuthChange(Boolean(data?.admin));
        // Redirect to home after login
        // window.location.assign("/");
        return;
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || data.errors[0]);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err || "Network error. Please try again. ");
    }
  }

  return (
    <div id="LogInContainer">
      <h2>Log In</h2>
      <form id="LogInForm" onSubmit={handleSubmit}>
        <label for="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          autocomplete="username"
        />

        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          autocomplete="password"
        />

        <button type="submit">Submit</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default LogIn;
