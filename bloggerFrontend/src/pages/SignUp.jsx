import "./SignUp.css";
import { use } from "React";

function SignUp({ signUpResponse }) {
  const response = use(signUpResponse);
  console.log(response);
  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const signUpAction = `${backendBase}/api/users/signUp`;
  if (response.status == "500") {
    console.log("500");
  }
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
