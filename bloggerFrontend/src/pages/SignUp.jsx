import "./SignUp.css";

function SignUp() {
  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const signUpAction = `${backendBase}/api/users/signUp`;
  return (
    <div id="LogInContainer">
      <form
        id="SignUpForm"
        method="post"
        action={signUpAction}
        acceptCharset="UTF-8"
      >
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="email" placeholder="Enter Email" name="email" required />

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
      </form>
    </div>
  );
}

export default SignUp;
