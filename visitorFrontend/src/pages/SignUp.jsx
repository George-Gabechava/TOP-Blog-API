import { useState } from "react";
import "./SignUp.css";

function SignUp() {
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
      const res = await fetch(`${backendBase}/api/users/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      console.log(res);
      // If success, go to login.
      if (res.ok) {
        window.location.assign("/login");
        return;
      }

      // If fail, display error
      let message = `Sign up failed (${res.status})`;
      try {
        const data = await res.json();
        console.log("data", data);
        if (data.errors.errors) {
          if (data.errors.errors.length > 1) {
            const messages = data.errors.errors.map((e) => e.msg);
            message = messages;
          }
        } else {
          message = data.error || data.errors[0];
        }
      } catch (err) {
        console.log(err);
      }
      setErrorMessage(message);
    } catch (err2) {
      setErrorMessage("Network error. Please try again. ");
    }
  }

  return (
    <div id="LogInContainer">
      <h2>Create Account</h2>
      <form id="SignUpForm" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          autocomplete="username"
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          autocomplete="email"
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <label htmlFor="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="confirmPassword"
          required
        />

        <button type="submit">Submit</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;
